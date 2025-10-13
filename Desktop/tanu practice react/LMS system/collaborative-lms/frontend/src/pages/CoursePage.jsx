// src/pages/CoursePage.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import AuthContext from "../context/AuthContext";
import LessonList from "../components/LessonList";
import ActivityFeed from "../components/ActivityFeed";

export default function CoursePage() {
  const { id } = useParams();
  const { user, socket } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const LIMIT = 10;

  useEffect(() => {
    loadCourse();
    loadLessons();
    // realtime update listener
    socket?.on("lessonUpdate", (data) => {
      if (data.course && (data.course._id === id || data.course === id)) {
        loadLessons();
      }
    });
    return () => socket?.off("lessonUpdate");
  }, [id, page, q, socket]);

  async function loadCourse() {
    try {
      const r = await api.get(`/courses/${id}`);
      setCourse(r.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function loadLessons() {
    try {
      const r = await api.get(`/lessons/${id}?page=${page}&limit=${LIMIT}&q=${encodeURIComponent(q)}`);
      setLessons(r.data);
    } catch (err) {
      console.error(err);
    }
  }

  const enroll = async () => {
    try {
      await api.post(`/courses/${id}/enroll`);
      await api.post("/activities", { action: "enrolled", target: id });
      socket?.emit("lessonUpdate", { type: "enroll", course: { _id: id } });
      alert("Enrolled successfully");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2>{course?.title}</h2>
      <p>{course?.description}</p>

      {user?.role === "student" && <button onClick={enroll}>Enroll</button>}

      <div style={{ marginTop: 12 }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search lessons" />
        <button onClick={() => { setPage(1); loadLessons(); }}>Search</button>
      </div>

      <LessonList lessons={lessons} courseId={id} />

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>

      <ActivityFeed courseId={id} />
    </div>
  );
}

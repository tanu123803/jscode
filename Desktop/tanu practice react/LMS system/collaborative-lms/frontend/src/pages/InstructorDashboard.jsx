// src/pages/InstructorDashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import api from "../api/api";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import ActivityFeed from "../components/ActivityFeed";

export default function InstructorDashboard() {
  const { user, socket } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchCourses();
    // listen for course updates (optional)
    socket?.on("lessonUpdate", (payload) => {
      if (payload.type === "course_created") {
        fetchCourses();
      }
    });
    return () => socket?.off("lessonUpdate");
  }, [socket]);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses");
      const mine = res.data.filter((c) => c.instructor && (c.instructor._id === user._id || c.instructor === user._id));
      setCourses(mine);
    } catch (err) {
      console.error(err);
    }
  };

  const create = async () => {
    if (!title) return alert("Enter title");
    try {
      const res = await api.post("/courses", { title, description: "" });
      setCourses((p) => [res.data, ...p]);
      setTitle("");
      await api.post("/activities", { action: "created course", target: res.data._id });
      socket?.emit("lessonUpdate", { type: "course_created", course: res.data });
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2>Instructor Dashboard</h2>

      <div className="create-course">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New course title" />
        <button onClick={create}>Create Course</button>
      </div>

      <h3>Your Courses</h3>
      <div className="grid">
        {courses.map((c) => (
          <div key={c._id} className="card">
            <h4>{c.title}</h4>
            <p>{c.description}</p>
            <Link to={`/course/${c._id}`}>Open</Link>
          </div>
        ))}
      </div>

      <h3>Activity</h3>
      <ActivityFeed />
    </div>
  );
}

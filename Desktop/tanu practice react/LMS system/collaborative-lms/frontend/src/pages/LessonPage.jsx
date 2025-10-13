// src/pages/LessonPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import AuthContext from "../context/AuthContext";
import CommentThread from "../components/CommentThread";

export default function LessonPage() {
  const { id } = useParams();
  const { socket } = useContext(AuthContext);
  const [lesson, setLesson] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await api.get(`/lessons/item/${id}`);
      setLesson(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  const markComplete = async () => {
    try {
      await api.post(`/lessons/${id}/complete`);
      await api.post("/activities", { action: "completed lesson", target: id });
      socket?.emit("lessonUpdate", { type: "lesson_completed", lessonId: id });
      alert("Marked complete");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <h2>{lesson?.title}</h2>
      <p>{lesson?.description}</p>

      {!videoLoaded ? (
        <div className="video-placeholder">
          <button onClick={() => setVideoLoaded(true)}>Load Video</button>
        </div>
      ) : (
        <div className="video-wrapper">
          <iframe
            title={lesson?.title}
            src={lesson?.videoUrl}
            width="800"
            height="450"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}

      <button onClick={markComplete}>Mark as complete</button>

      <h3>Comments</h3>
      <CommentThread lessonId={id} />
    </div>
  );
}

// src/components/LessonList.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function LessonList({ lessons, courseId }) {
  if (!lessons?.length) return <p>No lessons.</p>;
  return (
    <ul>
      {lessons.map(l => (
        <li key={l._id} className="lesson-item">
          <Link to={`/lesson/${l._id}`}>{l.title}</Link>
          <span>{l.order ? `#${l.order}` : ""}</span>
        </li>
      ))}
    </ul>
  );
}

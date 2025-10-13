// src/components/CourseCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div className="card">
      <h4>{course.title}</h4>
      <p>{course.description}</p>
      <Link to={`/course/${course._id}`}>Open</Link>
    </div>
  );
}

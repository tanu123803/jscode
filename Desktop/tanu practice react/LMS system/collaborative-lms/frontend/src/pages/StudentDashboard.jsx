// src/pages/StudentDashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import api from "../api/api";
import AuthContext from "../context/AuthContext";
import ProgressBar from "../components/ProgressBar";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const { user } = useContext(AuthContext);
  const [enrolled, setEnrolled] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await api.get("/courses/my/enrolled");
      // backend should return course objects; if different adapt accordingly
      setEnrolled(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Student Dashboard</h2>
      <h3>Your Courses</h3>
      <div className="grid">
        {enrolled.map((c) => (
          <div key={c._id} className="card">
            <h4>{c.title}</h4>
            {/* assume backend supplies completed/totalLessons; else remove */}
            <ProgressBar progress={Math.round((c.completed || 0) / (c.totalLessons || 1) * 100)} />
            <Link to={`/course/${c._id}`}>Open</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

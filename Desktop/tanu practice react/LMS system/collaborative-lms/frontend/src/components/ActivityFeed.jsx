// src/components/ActivityFeed.jsx
import React, { useEffect, useState, useContext } from "react";
import api from "../api/api";
import AuthContext from "../context/AuthContext";

export default function ActivityFeed({ courseId }) {
  const { socket } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);

  useEffect(()=> {
    load();
    socket?.on("activity", (a)=> {
      setActivities(prev => [a, ...prev]);
    });
    return () => socket?.off("activity");
  }, [socket]);

  async function load() {
    const res = await api.get("/activities");
    setActivities(res.data);
  }

  return (
    <div className="activity-feed">
      <h4>Activity</h4>
      <ul>
        {activities.map(a => (
          <li key={a._id}>{a.user?.name} {a.action} — {new Date(a.createdAt).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
}

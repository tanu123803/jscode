// src/components/CommentThread.jsx
import React, { useContext, useEffect, useState } from "react";
import api from "../api/api";
import AuthContext from "../context/AuthContext";

export default function CommentThread({ lessonId }) {
  const { socket, user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(()=> {
    load();
    socket?.on("newComment", (c) => {
      if (c.lesson === lessonId) setComments((s)=>[...s, c]);
    });
    return () => socket?.off("newComment");
  }, [lessonId, socket]);

  async function load(){
    const res = await api.get(`/comments/${lessonId}`);
    setComments(res.data);
  }

  const submit = async () => {
    if (!text) return;
    const res = await api.post(`/comments/${lessonId}`, { content: text });
    setComments(prev => [...prev, res.data]);
    socket?.emit("newComment", { ...res.data, lesson: lessonId, user: { name: user.name } });
    setText("");
  };

  const del = async (id) => {
    await api.delete(`/comments/${id}`);
    setComments(c=>c.filter(x=>x._id !== id));
  };

  return (
    <div>
      <div className="comment-form">
        <textarea value={text} onChange={e=>setText(e.target.value)} />
        <button onClick={submit}>Comment</button>
      </div>

      <ul>
        {comments.map(c => (
          <li key={c._id}>
            <b>{c.user?.name || c.user}</b> <small>{new Date(c.createdAt).toLocaleString()}</small>
            <p>{c.content}</p>
            {c.user?._id === user?._id || user?.role === "instructor" ? (
              <button onClick={()=>del(c._id)}>Delete</button>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

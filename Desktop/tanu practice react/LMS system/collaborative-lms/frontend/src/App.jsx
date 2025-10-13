// src/App.jsx
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import InstructorDashboard from "./pages/InstructorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import CoursePage from "./pages/CoursePage";
import LessonPage from "./pages/LessonPage";
import Navbar from "./components/Navbar";

const Protected = ({ children, roles }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/student" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/instructor"
            element={
              <Protected roles={["instructor"]}>
                <InstructorDashboard />
              </Protected>
            }
          />

          <Route
            path="/student"
            element={
              <Protected roles={["student"]}>
                <StudentDashboard />
              </Protected>
            }
          />

          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
        </Routes>
      </div>
    </>
  );
}

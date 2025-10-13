// src/context/AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";
import api from "../api/api";
import { io } from "socket.io-client";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      // optional: fetch fresh user info
      (async () => {
        try {
          const res = await api.get("/auth/me");
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        } catch (err) {
          console.warn("Could not refresh user:", err.message);
        }
      })();

      // init socket
      const sock = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
        auth: { token },
      });
      setSocket(sock);

      return () => {
        sock.disconnect();
        setSocket(null);
      };
    } else {
      localStorage.removeItem("token");
      setSocket(null);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { token, user } = res.data;
    setToken(token);
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  };

  const signup = async (payload) => {
    return await api.post("/auth/signup", payload);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, socket, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

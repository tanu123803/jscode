// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";

// ✅ Load environment variables
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

// ✅ Create Express app
const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// ✅ Import Routes
import authRoutes from "./routes/authRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// ✅ Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ✅ Create HTTP server for socket.io
const server = http.createServer(app);

// ✅ Initialize Socket.IO for real-time updates
const io = new Server(server, {
  cors: {
    origin: "*", // Update this in production
    methods: ["GET", "POST"],
  },
});

// ✅ Handle socket connections
io.on("connection", (socket) => {
  console.log("🟢 A user connected:", socket.id);

  // Join a board room (for real-time updates)
  socket.on("joinBoard", (boardId) => {
    socket.join(boardId);
    console.log(`📌 User joined board room: ${boardId}`);
  });

  // Broadcast when a task is created, updated, deleted, or moved
  socket.on("taskUpdated", (data) => {
    io.to(data.boardId).emit("taskUpdated", data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 A user disconnected:", socket.id);
  });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

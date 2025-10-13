// backend/routes/lessons.js
import express from "express";
import Lesson from "../models/Lesson.js";
import auth from "../middleware/auth.js";
import { instructorOnly } from "../middleware/roles.js";

const router = express.Router();

// ✅ Create a new lesson (Instructor only)
router.post("/:courseId", auth, instructorOnly, async (req, res) => {
  try {
    const { title, content, videoUrl } = req.body;
    const lesson = new Lesson({
      course: req.params.courseId,
      title,
      content,
      videoUrl,
    });
    await lesson.save();
    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get all lessons of a course
router.get("/:courseId", async (req, res) => {
  const lessons = await Lesson.find({ course: req.params.courseId });
  res.json(lessons);
});

export default router;

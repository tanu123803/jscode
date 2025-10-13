// backend/routes/courses.js
import express from "express";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import auth from "../middleware/auth.js";
import { instructorOnly } from "../middleware/roles.js";

const router = express.Router();

// ✅ Create a course (Instructor only)
router.post("/", auth, instructorOnly, async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const newCourse = new Course({
      title,
      description,
      category,
      instructor: req.user.id,
    });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get all courses
router.get("/", async (req, res) => {
  const courses = await Course.find().populate("instructor", "name email");
  res.json(courses);
});

// ✅ Get single course
router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id).populate("instructor", "name email");
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json(course);
});

// ✅ Enroll in a course
router.post("/:id/enroll", auth, async (req, res) => {
  const existing = await Enrollment.findOne({ student: req.user.id, course: req.params.id });
  if (existing) return res.status(400).json({ message: "Already enrolled" });

  const enrollment = new Enrollment({ student: req.user.id, course: req.params.id });
  await enrollment.save();
  res.json({ message: "Enrolled successfully" });
});

export default router;

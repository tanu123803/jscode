// backend/routes/comments.js
import express from "express";
import Comment from "../models/Comment.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ✅ Add a comment
router.post("/:lessonId", auth, async (req, res) => {
  try {
    const comment = new Comment({
      lesson: req.params.lessonId,
      user: req.user.id,
      text: req.body.text,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get comments of a lesson
router.get("/:lessonId", async (req, res) => {
  const comments = await Comment.find({ lesson: req.params.lessonId })
    .populate("user", "name")
    .sort({ createdAt: -1 });
  res.json(comments);
});

export default router;

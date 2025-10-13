// backend/routes/activities.js
import express from "express";
import Activity from "../models/Activity.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ✅ Get all recent activities
router.get("/", auth, async (req, res) => {
  const activities = await Activity.find()
    .populate("user", "name")
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(activities);
});

export default router;

import express from "express";
import { createBoard, inviteMember, getMyBoards } from "../controllers/boardController.js";
import { protect, authorizeRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only Admins can create a board or invite members
router.post("/", protect, authorizeRole("Admin"), createBoard);
router.post("/invite", protect, authorizeRole("Admin"), inviteMember);

// Any authenticated user can view their boards
router.get("/", protect, getMyBoards);

export default router;

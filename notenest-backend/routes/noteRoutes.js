import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadBuffer.js"; // ✅ Using memoryStorage (Buffer)

import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  getNoteById,
} from "../controllers/noteController.js";

const router = express.Router();

// 📌 POST note with optional attachments
router.post("/", protect, upload.array("attachments", 3), createNote);

// 📌 Get all notes for user
router.get("/", protect, getNotes);

// 📌 Get a single note by ID
router.get("/:id", protect, getNoteById);

// 📌 Update a note
router.put("/:id", protect, updateNote);

// 📌 Delete a note
router.delete("/:id", protect, deleteNote);

export default router;

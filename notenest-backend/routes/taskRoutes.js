import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadBuffer.js"; // for memoryStorage (buffer)

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
} from "../controllers/taskController.js";

const router = express.Router();

// ✅ Create task (with optional file uploads)
router.post("/", protect, upload.array("attachments"), createTask);

// ✅ Get a task by ID
router.get("/:id", protect, getTaskById);

// ✅ Get all tasks
router.get("/", protect, getTasks);

// ✅ Update a task
router.put("/:id", protect, updateTask);

// ✅ Delete a task
router.delete("/:id", protect, deleteTask);

export default router;

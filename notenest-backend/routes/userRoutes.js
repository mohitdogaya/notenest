import express from "express";
import { protect } from "../middleware/authMiddleware.js"; // your protect middleware
import { getUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", protect, getUserProfile);

export default router;

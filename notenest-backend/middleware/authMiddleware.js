import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config(); // ⬅️ REQUIRED to load .env variables

const JWT_SECRET = process.env.JWT_SECRET;
export const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      // console.log("🔐 Token Received:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("🔓 Decoded User:", decoded);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    console.error("❌ JWT Error:", error.message);
    res.status(401).json({ message: "Not authorized" });
  }
};

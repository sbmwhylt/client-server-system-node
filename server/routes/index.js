import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { getUsers } from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/auth.js"; // ES module import

const router = express.Router();

// ----------------- Auth routes
router.post("/auth/register", registerUser); 
router.post("/auth/login", loginUser);

// ----------------- Users routes
router.get("/users",  authenticateToken, getUsers);

// ----------------- Projects routes

export default router;

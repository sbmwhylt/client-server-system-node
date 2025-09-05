import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";
// Routes
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ------------------------- Root route

app.get("/", (req, res) => {
  res.send("✅ Backend server is running!");
});

// ------------------------- Test DB route

app.get("/api/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ serverTime: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------  API Routes

app.use("/api/auth", authRoutes);


// ------------------------- Start server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


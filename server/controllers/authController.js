import bcrypt from "bcrypt";
import pool from "../config/db.js";

// -------------------------- Register Controller

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // 1. check if user exists
    const checkUser = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // 2. hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. insert into users
    const newUser = await pool.query(
      "INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING id, firstName, lastName, email, role, created_at",
      [firstName, lastName, email, hashedPassword]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

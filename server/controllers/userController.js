import pool from "../config/db.js";

// ----------------------- Get all users

export const getUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
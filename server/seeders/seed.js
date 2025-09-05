import pool from "../config/db.js";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runSeeders = async () => {
  try {
    const seedersDir = path.join(__dirname);
    const files = fs.readdirSync(seedersDir)
      .filter(file => file.endsWith(".sql"))
      .sort();

    console.log("🌱 Running seeders...");

    for (const file of files) {
      const filePath = path.join(seedersDir, file);
      const sql = fs.readFileSync(filePath).toString();
      console.log(`👉 Seeding ${file}...`);
      await pool.query(sql);
    }

    console.log("🔒 Hashing plain text passwords...");

    // ----------------------- find users with plain text passwords (not starting with bcrypt prefix $2)

    const users = await pool.query("SELECT id, password FROM users");
    for (const user of users.rows) {
      if (!user.password.startsWith("$2")) {
        const hashed = await bcrypt.hash(user.password, 10);
        await pool.query("UPDATE users SET password = $1 WHERE id = $2", [hashed, user.id]);
        console.log(`✅ Password hashed for user ID: ${user.id}`);
      }
    }
    console.log("✅ Seeding completed!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

runSeeders();

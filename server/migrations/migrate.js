import pool from "../config/db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runMigrations = async () => {
  try {
    const migrationsDir = path.join(__dirname);

    // get all .sql files sorted by filename
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith(".sql"))
      .sort();

    console.log("📦 Running migrations...");

    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath).toString();

      console.log(`👉 Running ${file}...`);
      await pool.query(sql);
    }

    console.log("All migrations completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err.message);
    process.exit(1);
  }
};

runMigrations();

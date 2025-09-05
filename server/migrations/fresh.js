import pool from "../config/db.js";
import { execSync } from "child_process";

const fresh = async () => {
  try {
    console.log("🗑️ Dropping existing tables...");

    //-------------------------------------- Drop tables in correct order (to avoid foreign key issues later)

    const tables = ["users"]; // add "projects", "tasks" later
    for (const table of tables) {
      await pool.query(`DROP TABLE IF EXISTS ${table} CASCADE;`);
      console.log(`❌ Dropped table: ${table}`);
    }
    console.log("📦 Running migrations...");
    execSync("npm run migrate", { stdio: "inherit" });
    console.log("🌱 Running seeders...");
    execSync("npm run seed", { stdio: "inherit" });
    console.log("✅ Fresh migration + seed completed!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Fresh migration failed:", err.message);
    process.exit(1);
  }
};

fresh();

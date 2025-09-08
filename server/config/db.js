import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD, 
  {
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
    port: process.env.DATABASE_PORT || 5432,
    logging: false,
  }
);

export default sequelize;

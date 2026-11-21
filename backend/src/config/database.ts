import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

export const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, {
      dialect: "postgres",
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME || "smart_inventory",
      process.env.DB_USER || "postgres",
      process.env.DB_PASSWORD || "abdou010203",
      {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5432,
        dialect: "postgres",
        logging: false,
      }
    );

export default sequelize;

import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import sequelize from "./config/database";
import "./models"; // Ensure models are loaded and registered

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully with Sequelize.");

    // Synchronize models with the database (creates tables if they do not exist)
    await sequelize.sync();
    console.log("Database models synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

startServer();

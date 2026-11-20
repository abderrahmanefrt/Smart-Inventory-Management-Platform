
import express, { Application } from "express";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Smart Inventory API is running!",
  });
});

export default app;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

dotenv.config({ path: "./backend/.env" });

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);

export default app;

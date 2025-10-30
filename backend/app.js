import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";


dotenv.config({ path: "./backend/.env" });

const app = express();
app.use(cors());
app.use(express.json());
// Default route
app.get("/", (req, res) => {
  res.send("BeqaaGo backend is running 🚀");
});
// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


export default app;

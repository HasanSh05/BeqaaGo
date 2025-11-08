import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Determine __dirname safely for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file correctly
dotenv.config({ path: path.join(__dirname, ".env") });

// --- verify loading ---
console.log("Loaded env variables:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "✅ present" : "❌ missing");
console.log("DB_NAME:", process.env.DB_NAME);

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import vendorRoutes from "./routes/vendor.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, "../frontend")));

// Pages
app.get("/", (req, res) => res.render("index"));
app.get("/login", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.render("register"));

// ✅ Dashboard
app.get("/dashboard", (req, res) => res.render("dashboard", { page: "dashboard" }));

// ✅ Search
app.get("/search", (req, res) => res.render("search", { page: "search" }));

// ✅ Orders
app.get("/orders", (req, res) => res.render("orders", { page: "orders" }));

// ✅ Account
app.get("/account", (req, res) => res.render("account", { page: "account" }));
app.get("/cart", (req, res) => res.render("cart", { page: "" }));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/vendors", vendorRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/orders", orderRoutes);

// 404 route (temporary fix)
app.use((req, res) => res.status(404).send("404 - Page Not Found"));

export default app;

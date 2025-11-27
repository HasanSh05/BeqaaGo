import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { getVendorById } from "./models/vendor.model.js";

// Proper __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load backend .env
dotenv.config({ path: path.join(__dirname, ".env") });

// Debug env
console.log("Loaded env variables:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "✅ present" : "❌ missing");
console.log("DB_NAME:", process.env.DB_NAME);

// ROUTES
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import vendorRoutes from "./routes/vendor.routes.js";
import orderRoutes from "./routes/order.routes.js";
import vendorMenuRoutes from "./routes/vendorMenu.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));


// ============================
// USER PAGES
// ============================
app.get("/", (req, res) => res.render("index"));
app.get("/login", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.render("register"));

app.get("/dashboard", (req, res) =>
  res.render("dashboard", { page: "dashboard" })
);

app.get("/search", (req, res) =>
  res.render("search", { page: "search" })
);

app.get("/orders", (req, res) =>
  res.render("orders", { page: "orders" })
);

app.get("/account", (req, res) =>
  res.render("account", { page: "account" })
);

app.get("/cart", (req, res) =>
  res.render("cart", { page: "" })
);


// ============================
// VENDOR PAGES
// ============================
app.get("/vendor/dashboard", (req, res) =>
  res.render("vendor/dashboard", { page: "vendor-dashboard" })
);

app.get("/vendor/menu", (req, res) =>
  res.render("vendor/menu", { page: "vendor-menu" })
);

app.get("/vendor/orders", (req, res) =>
  res.render("vendor/orders", { page: "vendor-orders" })
);

app.get("/vendor/settings", (req, res) =>
  res.render("vendor/settings", { page: "vendor-settings" })
);


// ============================
// STORE PAGE (When user opens a restaurant)
// ============================
app.get("/store/:id", async (req, res) => {
  const vendor = await getVendorById(req.params.id);
  if (!vendor) return res.status(404).send("Vendor not found");

  res.render("store", {
    page: "",
    vendorId: vendor.id,
    vendorName: vendor.name,
    vendorLocation: vendor.location || "Beqaa",
  });
});


// ============================
// API ROUTES
// ============================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// vendor info routes
app.use("/api/vendors", vendorRoutes);

// vendor menu routes — MUST BE SEPARATE
app.use("/api/vendors", vendorMenuRoutes);

app.use("/api/orders", orderRoutes);


// 404
app.use((req, res) => res.status(404).send("404 - Page Not Found"));

export default app;

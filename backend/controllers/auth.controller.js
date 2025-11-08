import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // Check if email exists
    const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length)
      return res.status(409).json({ message: "Email already registered" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Insert new user
    await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      hashed,
    ]);

    res.status(201).json({ message: "User registered successfully ✅" });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(500).json({ message: "Registration failed" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
  message: "Login successful ✅",
  token,
  user: { id: user.id, name: user.name, email: user.email },
});

  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

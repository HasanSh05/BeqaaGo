import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

// REGISTER
export const register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  // Hash password
  const hashed = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, hashed], (err) => {
    if (err) {
      console.error(err);
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "Email already registered" });
      }
      return res.status(500).json({ message: "Registration failed" });
    }

    res.status(201).json({ message: "User registered successfully ✅" });
  });
};

// LOGIN
export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);

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
  });
};

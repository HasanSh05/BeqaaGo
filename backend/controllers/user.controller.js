import db from "../config/db.js";

export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name, email FROM users");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Database error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, name, email FROM users WHERE id = ?", [req.params.id]);
    if (rows.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Database error" });
  }
};


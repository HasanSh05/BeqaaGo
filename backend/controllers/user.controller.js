import db from "../config/db.js";

// Get a user's info by ID
export const getUserById = (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT id, name, email FROM users WHERE id = ?";

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(results[0]);
  });
};

// Get all users
export const getAllUsers = (req, res) => {
  const sql = "SELECT id, name, email FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
};

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
// Update user info
export const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userId = req.params.id;

    if (!name && !email && !password)
      return res.status(400).json({ message: "No data provided for update" });

    let updateFields = [];
    let params = [];

    if (name) {
      updateFields.push("name = ?");
      params.push(name);
    }
    if (email) {
      updateFields.push("email = ?");
      params.push(email);
    }
    if (password) {
      // hash password
      const bcrypt = (await import("bcrypt")).default;
      const hashed = await bcrypt.hash(password, 10);
      updateFields.push("password = ?");
      params.push(hashed);
    }

    params.push(userId);

    const sql = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;
    const [result] = await db.query(sql, params);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "✅ Profile updated successfully!" });
  } catch (err) {
    console.error("❌ Update user error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};



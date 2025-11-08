import db from "../config/db.js";

// Fetch all orders for a specific user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId; // ✅ corrected param name
    const [rows] = await db.query(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    console.log("✅ Orders fetched:", rows);
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching orders:", err.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Add a new order
export const addOrder = async (req, res) => {
  try {
    const { user_id, restaurant, total, status } = req.body;

    if (!user_id || !restaurant || !total)
      return res.status(400).json({ message: "Missing required fields" });

    await db.query(
      "INSERT INTO orders (user_id, restaurant, total, status) VALUES (?, ?, ?, ?)",
      [user_id, restaurant, total, status || "Pending"]
    );

    res.status(201).json({ message: "Order added successfully ✅" });
  } catch (err) {
    console.error("❌ Error inserting order:", err.message);
    res.status(500).json({ message: "Database error" });
  }
};

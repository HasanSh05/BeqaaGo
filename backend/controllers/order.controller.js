import db from "../config/db.js";

// GET /api/orders/user/:userId  → for user "My Orders" page
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    const [rows] = await db.query(
      `SELECT 
         o.id,
         o.total,
         o.status,
         o.created_at,
         v.name AS restaurant
       FROM orders o
       JOIN vendors v ON o.vendor_id = v.id
       WHERE o.user_id = ?
       ORDER BY o.created_at DESC`,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching user orders:", err.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// POST /api/orders  → when user checks out
export const addOrder = async (req, res) => {
  try {
    const { user_id, vendor_id, total } = req.body;

    if (!user_id || !vendor_id || !total)
      return res.status(400).json({ message: "Missing required fields" });

    await db.query(
      "INSERT INTO orders (user_id, vendor_id, total) VALUES (?, ?, ?)",
      [user_id, vendor_id, total]
    );

    res.status(201).json({ message: "Order placed successfully ✅" });
  } catch (err) {
    console.error("❌ Error inserting order:", err.message);
    res.status(500).json({ message: "Database error" });
  }
};

// GET /api/orders/vendor/:vendorId  → vendor dashboard
export const getVendorOrders = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;

    const [orders] = await db.query(
      `SELECT 
         o.id,
         o.total,
         o.status,
         o.created_at,
         u.name AS customer
       FROM orders o
       JOIN users u ON o.user_id = u.id
       WHERE o.vendor_id = ?
       ORDER BY o.created_at DESC`,
      [vendorId]
    );

    const [todayRows] = await db.query(
      `SELECT COUNT(*) AS today
       FROM orders
       WHERE vendor_id = ?
       AND DATE(created_at) = CURDATE()`,
      [vendorId]
    );

    res.json({
      total: orders.length,
      today: todayRows[0]?.today || 0,
      orders,
    });
  } catch (err) {
    console.error("❌ Error fetching vendor orders:", err.message);
    res.status(500).json({ message: "Failed to fetch vendor orders" });
  }
};

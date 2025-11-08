import db from "../config/db.js";

// Get all orders
export const getAllOrders = async () => {
  const [rows] = await db.query(
    `SELECT o.id, u.name AS user, v.name AS vendor, o.total, o.status
     FROM orders o
     JOIN users u ON o.user_id = u.id
     JOIN vendors v ON o.vendor_id = v.id`
  );
  return rows;
};

// Add a new order
export const createOrder = async (userId, vendorId, total) => {
  await db.query(
    "INSERT INTO orders (user_id, vendor_id, total) VALUES (?, ?, ?)",
    [userId, vendorId, total]
  );
};

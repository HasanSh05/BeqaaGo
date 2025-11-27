import db from "../config/db.js";

// Get all menu items for a vendor
export const getMenuByVendor = async (vendorId) => {
  const [rows] = await db.query(
    "SELECT * FROM vendor_menu WHERE vendor_id = ?",
    [vendorId]
  );
  return rows;
};

// Add new item
export const addMenuItem = async (vendorId, name, price, image) => {
  await db.query(
    "INSERT INTO vendor_menu (vendor_id, item_name, price, image) VALUES (?, ?, ?, ?)",
    [vendorId, name, price, image]
  );
};

// Delete item
export const deleteMenuItem = async (id) => {
  await db.query("DELETE FROM vendor_menu WHERE id = ?", [id]);
};

// Edit item
export const updateMenuItem = async (id, name, price, image) => {
  await db.query(
    "UPDATE vendor_menu SET item_name = ?, price = ?, image = ? WHERE id = ?",
    [name, price, image, id]
  );
};
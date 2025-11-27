import db from "../config/db.js";

// Get all vendors (for home dashboard)
export const getAllVendors = async () => {
  const [rows] = await db.query("SELECT * FROM vendors");
  return rows;
};

// Get one vendor
export const getVendorById = async (id) => {
  const [rows] = await db.query("SELECT * FROM vendors WHERE id = ?", [id]);
  return rows[0];
};

// Create vendor (if you ever need it)
export const createVendor = async (name, email, phone, location, image) => {
  await db.query(
    "INSERT INTO vendors (name, email, phone, location, image) VALUES (?, ?, ?, ?, ?)",
    [name, email, phone, location, image]
  );
};

// Delete vendor
export const deleteVendor = async (id) => {
  await db.query("DELETE FROM vendors WHERE id = ?", [id]);
};

// ---------- MENU FUNCTIONS ----------

// Get menu items for a vendor
export const getVendorMenu = async (vendorId) => {
  const [rows] = await db.query(
    "SELECT * FROM vendor_menu WHERE vendor_id = ? ORDER BY id DESC",
    [vendorId]
  );
  return rows;
};

// Add menu item
export const addMenuItem = async (vendorId, item_name, price, image) => {
  await db.query(
    "INSERT INTO vendor_menu (vendor_id, item_name, price, image) VALUES (?, ?, ?, ?)",
    [vendorId, item_name, price, image]
  );
};

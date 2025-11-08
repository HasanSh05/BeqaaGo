import db from "../config/db.js";

// Get all vendors
export const getAllVendors = async () => {
  const [rows] = await db.query("SELECT * FROM vendors");
  return rows;
};

// Get vendor by ID
export const getVendorById = async (id) => {
  const [rows] = await db.query("SELECT * FROM vendors WHERE id = ?", [id]);
  return rows[0];
};

// Add new vendor
export const createVendor = async (name, email, phone, location) => {
  await db.query(
    "INSERT INTO vendors (name, email, phone, location) VALUES (?, ?, ?, ?)",
    [name, email, phone, location]
  );
};

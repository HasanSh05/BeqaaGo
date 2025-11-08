import db from "../config/db.js";

// Get all vendors
export const getAllVendors = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM vendors");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching vendors:", err.message);
    res.status(500).json({ message: "Database error" });
  }
};

// Get vendor by ID
export const getVendorById = async (req, res) => {
  try {
    const vendorId = req.params.id;
    const [rows] = await db.query("SELECT * FROM vendors WHERE id = ?", [vendorId]);
    if (rows.length === 0) return res.status(404).json({ message: "Vendor not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Error fetching vendor:", err.message);
    res.status(500).json({ message: "Database error" });
  }
};

// Add new vendor
export const addVendor = async (req, res) => {
  try {
    const { name, email, phone, location, image } = req.body;
    if (!name || !email)
      return res.status(400).json({ message: "Name and email are required" });

    await db.query(
      "INSERT INTO vendors (name, email, phone, location, image) VALUES (?, ?, ?, ?, ?)",
      [name, email, phone, location, image || "/images/vendor.jpg"]
    );

    res.status(201).json({ message: "✅ Vendor added successfully!" });
  } catch (err) {
    console.error("❌ Error adding vendor:", err.message);
    res.status(500).json({ message: "Database error" });
  }
};

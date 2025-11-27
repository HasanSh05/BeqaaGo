import {
  getAllVendors,
  getVendorById,
  createVendor,
  deleteVendor,
  getVendorMenu,
  addMenuItem,
} from "../models/vendor.model.js";

// GET /api/vendors
export const fetchVendors = async (req, res) => {
  try {
    const vendors = await getAllVendors();
    res.json(vendors);
  } catch (err) {
    console.error("❌ Error fetching vendors:", err.message);
    res.status(500).json({ message: "Database error" });
  }
};

// GET /api/vendors/:id
export const fetchVendor = async (req, res) => {
  try {
    const vendor = await getVendorById(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.json(vendor);
  } catch (err) {
    console.error("❌ Error fetching vendor:", err.message);
    res.status(500).json({ message: "Database error" });
  }
};

// POST /api/vendors
export const addVendor = async (req, res) => {
  try {
    const { name, email, phone, location, image } = req.body;
    if (!name || !email)
      return res.status(400).json({ message: "Name and email are required" });

    await createVendor(name, email, phone, location, image || "/images/vendor.jpg");
    res.status(201).json({ message: "Vendor added successfully" });
  } catch (err) {
    console.error("❌ Error adding vendor:", err.message);
    res.status(500).json({ message: "Database error" });
  }
};

// DELETE /api/vendors/:id
export const removeVendor = async (req, res) => {
  try {
    await deleteVendor(req.params.id);
    res.json({ message: "Vendor deleted" });
  } catch (err) {
    console.error("❌ Error deleting vendor:", err.message);
    res.status(500).json({ message: "Database error" });
  }
};

// ---------- MENU ENDPOINTS ----------

// GET /api/vendors/:vendorId/menu
export const getMenuForVendor = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;
    const items = await getVendorMenu(vendorId);
    res.json(items);
  } catch (err) {
    console.error("❌ Error fetching vendor menu:", err.message);
    res.status(500).json({ message: "Failed to fetch menu" });
  }
};

// POST /api/vendors/:vendorId/menu
export const addMenuItemForVendor = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;
    const { item_name, price, image } = req.body;

    if (!item_name || !price)
      return res.status(400).json({ message: "Item name and price are required" });

    await addMenuItem(vendorId, item_name, price, image || null);
    res.status(201).json({ message: "Menu item added ✅" });
  } catch (err) {
    console.error("❌ Error adding menu item:", err.message);
    res.status(500).json({ message: "Failed to add item" });
  }
};

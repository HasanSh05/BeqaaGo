import {
  getMenuByVendor,
  addMenuItem,
  deleteMenuItem
} from "../models/menu.model.js";

// Load vendor menu
export const fetchVendorMenu = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;
    const menu = await getMenuByVendor(vendorId);
    res.json(menu);
  } catch (err) {
    console.error("Menu error:", err);
    res.status(500).json({ message: "Failed to load menu" });
  }
};

// Add menu item
export const createItem = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;
    const { item_name, price, image } = req.body;

    if (!item_name || !price)
      return res.status(400).json({ message: "Missing fields" });

    await addMenuItem(
      vendorId,
      item_name,
      price,
      image || "/images/food.jpg"
    );

    res.json({ message: "Item added successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Insert error" });
  }
};

export const removeItem = async (req, res) => {
  try {
    await deleteMenuItem(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete item" });
  }
};

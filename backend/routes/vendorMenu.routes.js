import express from "express";
import {
  fetchVendorMenu,
  createItem,
  removeItem
} from "../controllers/menu.controller.js";

const router = express.Router();

// GET vendor menu
router.get("/:vendorId/menu", fetchVendorMenu);

// POST new menu item
router.post("/:vendorId/menu", createItem);

// DELETE menu item
router.delete("/menu/:id", removeItem);

export default router;

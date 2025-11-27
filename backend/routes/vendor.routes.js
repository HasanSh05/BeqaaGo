import express from "express";
import {
  fetchVendors,
  fetchVendor,
  addVendor,
  removeVendor,
  getMenuForVendor,
  addMenuItemForVendor,
} from "../controllers/vendor.controller.js";

const router = express.Router();

// Basic vendor CRUD
router.get("/", fetchVendors);
router.get("/:id", fetchVendor);
router.post("/", addVendor);
router.delete("/:id", removeVendor);

// Menu per vendor
router.get("/:vendorId/menu", getMenuForVendor);
router.post("/:vendorId/menu", addMenuItemForVendor);

export default router;

import express from "express";
import { getAllVendors, getVendorById, addVendor } from "../controllers/vendor.controller.js";

const router = express.Router();

router.get("/", getAllVendors);
router.get("/:id", getVendorById);
router.post("/", addVendor);

export default router;

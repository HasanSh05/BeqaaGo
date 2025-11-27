import express from "express";
import {
  getUserOrders,
  addOrder,
  getVendorOrders,
} from "../controllers/order.controller.js";

const router = express.Router();

// user side
router.get("/user/:userId", getUserOrders);
router.post("/", addOrder);

// vendor side
router.get("/vendor/:vendorId", getVendorOrders);

export default router;

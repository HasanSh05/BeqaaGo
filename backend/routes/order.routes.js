import express from "express";
import { getUserOrders, addOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/:userId", getUserOrders);
router.post("/", addOrder);

export default router;

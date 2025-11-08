import express from "express";
import { getAllUsers, getUserById, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser); // new

export default router;

import express from "express";
import { getAllUsers, getUserById } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers);      // GET /api/users
router.get("/:id", getUserById);   // GET /api/users/:id

export default router;


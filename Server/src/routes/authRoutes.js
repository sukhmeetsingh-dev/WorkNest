import express from "express";
import {
  registerUser,
  loginUser,
  createEmployee,
  getCurrentUser,
  getAllEmployees,
  deleteEmployee,
} from "../controllers/authController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/create-employee", protect, adminOnly, createEmployee);
router.get("/me", protect, getCurrentUser);

// NEW ROUTE: Get all employees (admin only)
router.get("/employees", protect, adminOnly, getAllEmployees);
router.delete("/employees/:id", protect, adminOnly, deleteEmployee);

export default router;

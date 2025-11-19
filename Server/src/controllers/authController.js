import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register user (Admin)
export const registerUser = async (req, res) => {
  try {
    console.log("Incoming data:", req.body); 
    const { firstName, email, password, role } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = new User({
      firstName,
      email,
      password,  // plain password; will be hashed by pre-save hook
      role: role || "employee",
    });
    await user.save();

    res.status(201).json({
      msg: "User registered successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Admin creates employee
export const createEmployee = async (req, res) => {
  try {
    const { firstName, email, password } = req.body;

    if (!firstName || !email || !password)
      return res.status(400).json({ msg: "Missing required fields" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const user = await User.create({
      firstName,
      email,
      password,
      role: "employee",
    });
    res.status(201).json({
      msg: "Employee created successfully",
      user: { id: user._id, firstName: user.firstName, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all employees (admin only)
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select(
      "firstName email _id"
    );
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  res.json({ user: req.user });
};

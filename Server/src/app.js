import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("WorkNest API is running..."));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;

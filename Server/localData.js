import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./src/models/user.js";

dotenv.config();

const localData = async () => {
  try {
    await mongoose.connect(process.env.ATLASDB_URL);

    console.log("🟢 Connected to local DB");

    await User.deleteMany({});

    await User.create([
      {
        firstName: "Admin",
        email: "admin@worknest.com",
        password: "123456",
        role: "admin",
      },
      {
        firstName: "Johnathan Winchester",
        email: "john@worknest.com",
        password: "123456",
        role: "employee",
      },
    ]);

    console.log("✅ Local users created successfully");

    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

localData();
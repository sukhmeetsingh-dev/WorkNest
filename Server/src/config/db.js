import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const url = process.env.ATLASDB_URL;
    console.log("🔌 Attempting DB connection to:", url);

    const conn = await mongoose.connect(url);

    console.log("🟢 MongoDB Connected Successfully");
    console.log("📌 Connected DB Name:", conn.connection.name);

    const collections = await conn.connection.db.listCollections().toArray();
    console.log(
      "📂 Collections Found:",
      collections.map((c) => c.name),
    );
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
  }
};
export default connectDB;

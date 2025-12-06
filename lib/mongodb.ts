import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";


if (!MONGODB_URI) throw new Error("❌ MONGODB_URI not found");

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) {
    console.log(" Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("⏳ Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "next_crud_app",
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }

  return cached.conn;
}

(global as any).mongoose = cached;

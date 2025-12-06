import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";


export async function POST(req: Request) {

  try {
    // Security check with secret key
    const SECRET = process.env.SEED_SECRET;

    const { secret } = await req.json();

    if (!secret || secret !== SECRET) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      return NextResponse.json(
        { success: false, message: "Admin already exists" },
        { status: 400 }
      );
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash("test123", 10);

    const admin = await User.create({
      name: "Super Admin",
      email: "test@.com",
      password: hashedPassword,
      role: "admin",
      verified: true,
      age: 25,
    });

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error: any) {
    console.error("SEED ADMIN ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Server error" },
      { status: 500 }
    );
  }
}

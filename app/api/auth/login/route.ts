import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

// 1. Find user
const user = await User.findOne({ email }).select("+password");

if (!user || !user.password) {
  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}

// 2. Compare password
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}

    // 3. Create JWT
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = await signToken(payload);

    // 4. Set secure cookie (App Router safe)
    (await
      // 4. Set secure cookie (App Router safe)
      cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { success: false, message: error.message ?? "Server error" },
      { status: 500 }
    );
  }
}

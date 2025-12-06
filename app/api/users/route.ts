import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { createUserSchema } from "@/validation/userSchema";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const search = searchParams.get("search") || "";
    const verified = searchParams.get("verified");

    const filter: any = {
      role: { $ne: "admin" }, // ⬅️ Only normal users
    };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (verified === "true") filter.verified = true;
    if (verified === "false") filter.verified = false;

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
      User.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      total,
      users,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    await connectDB();

    // 1️⃣ Read token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token" },
        { status: 401 }
      );
    }

    // 2️⃣ Validate token
    const decoded: any = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // 3️⃣ Admin check
    if (decoded.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden: Admin only" },
        { status: 403 }
      );
    }

    // 4️⃣ Validate incoming body
    const body = await req.json();
    const parsed = createUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 5️⃣ Check existing email
    const exists = await User.findOne({ email: data.email });
    if (exists) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 409 }
      );
    }

    // 6️⃣ Create user — no password
    const user = await User.create(data);

    return NextResponse.json(
      { success: true, user },
      { status: 201 }
    );

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Server error" },
      { status: 500 }
    );
  }
}

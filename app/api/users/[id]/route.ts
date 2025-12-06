import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { updateUserSchema } from "@/validation/userSchema";

// Define the type for the context parameter
type Props = {
  params: Promise<{ id: string }>;
};

// ---------------- GET (Single User) ----------------
export async function GET(req: Request, { params }: Props) {
  await connectDB();
  
  // FIX: Await params before using it
  const { id } = await params;
  
  const user = await User.findById(id);

  if (!user) {
    return NextResponse.json(
        { success: false, message: "User not found" }, 
        { status: 404 }
    );
  }

  return NextResponse.json({ success: true, user });
}

// ---------------- PUT (Update User) ----------------
export async function PUT(req: Request, { params }: Props) {
  try {
    await connectDB();
    const body = await req.json();

    // FIX: Await params here too
    const { id } = await params;

    const parsed = updateUserSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error },
        { status: 400 }
      );
    }

    const updated = await User.findByIdAndUpdate(id, parsed.data, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "User not found" }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user: updated });
  } catch (error: any) {
    return NextResponse.json(
        { success: false, error: error.message }, 
        { status: 500 }
    );
  }
}

// ---------------- DELETE (Remove User) ----------------
export async function DELETE(req: Request, { params }: Props) {
  try {
      await connectDB();
      
      // FIX: Await params here too
      const { id } = await params;

      const deleted = await User.findByIdAndDelete(id);

      if (!deleted) {
        return NextResponse.json(
            { success: false, message: "User not found" }, 
            { status: 404 }
        );
      }

      return NextResponse.json({ success: true, message: "User deleted" });
  } catch (error: any) {
      return NextResponse.json(
          { success: false, error: error.message }, 
          { status: 500 }
      );
  }
}
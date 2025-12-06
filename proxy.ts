import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  let user = token ? await verifyToken(token) : null;

  // API Routes: Block unauthenticated access (except login/register)
  const isApiRoute = pathname.startsWith("/api");
  const isPublicApi =
    pathname === "/api/auth/login" ||
    pathname === "/api/auth/register";

  if (isApiRoute && !isPublicApi && !user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  // Redirect authenticated users away from login
  if (pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is not logged in, block access to protected pages
  const protectedPages = ["/", "/dashboard"];

  if (protectedPages.includes(pathname) && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow request to continue
  return NextResponse.next();
}

export const config = {
  // Run on all pages except assets
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)"
  ],
};

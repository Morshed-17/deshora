import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./utils/verifyToken";
import { toast } from "sonner";

const adminRoutes = ["/dashboard"];
const userRoutes = ["/my-account"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // Redirect to homepage if no token for protected routes
  if (
    adminRoutes.some((prefix) => pathname.startsWith(prefix)) ||
    userRoutes.some((prefix) => pathname.startsWith(prefix))
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    let role = null;
    try {
      const decoded = verifyToken(token);
      role = decoded?.role || null;
    } catch (error) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Admin route protection
    if (adminRoutes.some((prefix) => pathname.startsWith(prefix))) {
      if (role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // User route protection (example: only logged-in users allowed)
    if (userRoutes.some((prefix) => pathname.startsWith(prefix))) {
      if (!role) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }

  // Allow request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/my-account/:path*"],
};

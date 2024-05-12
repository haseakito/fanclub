import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Extract the JWT token from the cookie
  const token = request.cookies.get("jwt");

  // If no JWT found in cookie, then redirect the user to login page
  if (!token) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/studio/:path*",
    "/profile",
    "/messages",
    "/likes",
    "/settings/:path*",
  ],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // Protected routes that require authentication
  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/tasks") ||
    pathname.startsWith("/users") ||
    pathname.startsWith("/profile");

  const isAuthRoute = pathname === "/auth/signin" || pathname === "/";

  // Redirect to signin if accessing protected route without token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // Redirect to dashboard if already authenticated and trying to access signin
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // "/dashboard",
    "/dashboard/:path*",
    "/tasks/:path*",

    "/users/:path*",

    "/auth/signin",
    "/auth/register",
    "/profile/:path*",
  ],
};

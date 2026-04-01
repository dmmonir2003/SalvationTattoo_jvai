import { proxy } from "./src/proxy";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return proxy(request);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tasks/:path*",
    "/users/:path*",
    "/profile/:path*",
    "/auth/signin",
    "/auth/register",
  ],
};

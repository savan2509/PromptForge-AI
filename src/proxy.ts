import { NextResponse } from "next/server";
import { auth } from "@/auth";

const PROTECTED_PATHS = ["/dashboard", "/prompts/new"];

export default auth((req) => {
  const isProtected = PROTECTED_PATHS.some((path) => req.nextUrl.pathname.startsWith(path));
  if (isProtected && !req.auth) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl.origin));
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/prompts/new"],
};

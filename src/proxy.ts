import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  console.log(
    "[proxy] running:",
    req.nextUrl.pathname,
    "token:",
    !!req.cookies.get("xeno_token")?.value,
  );
  const token = req.cookies.get("xeno_token")?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};

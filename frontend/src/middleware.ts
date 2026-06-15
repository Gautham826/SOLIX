import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("solix_token")?.value;
  const { pathname } = request.nextUrl;

  const publicPaths = ["/login", "/register"];
  const isPublic = publicPaths.some((p) => pathname.startsWith(p));

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/forecast/:path*", "/surplus/:path*",
    "/optimize/:path*", "/recommendations/:path*", "/ingestion/:path*",
    "/settings/:path*"],
};
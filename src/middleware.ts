import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const url = req.nextUrl;

  if (token && token._id) {
    if (url.pathname === "/login" || url.pathname === "/signup") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    if (url.pathname !== "/login" && url.pathname !== "/signup") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/login", "/signup", "/users/:path*", "/plans/:path*"],
};

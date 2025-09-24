import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside

export const config = {
  matcher: "/dashboard/:path*",
};
export function middleware(request: NextRequest) {
  const hasCookieEmail = request.cookies.has("email");
  const hasCookiePassword = request.cookies.has("password");

  //   const userHasToken = false;
  if (!hasCookieEmail && !hasCookiePassword) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  } else if (hasCookieEmail && hasCookiePassword) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
  return null;
}

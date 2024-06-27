import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;

  if (!currentUser) {
    return NextResponse.redirect(new URL("/auth/signup", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/dashboards"],
};

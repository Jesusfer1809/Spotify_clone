import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // TOKEN WILL EXIST IF USER IS LOGGED Inasd
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });

  const { pathname } = req.nextUrl;

  // ALLOW THE REQUEST IF THE FOLLOWING IS TRUE...
  // 1) IT'S A REQUEST FOR NEXT-AUTH SESSION & PROVIDER FETCHING
  // 2) THE TOKEN EXISTS

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  if (token && pathname === "/login") {
    return NextResponse.redirect("/");
  }
}

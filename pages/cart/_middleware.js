import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
  });
  const url = req.nextUrl.clone();
  url.pathname = "/auth/login";
  if (!token) return NextResponse.rewrite(url);
  return NextResponse.next();
}

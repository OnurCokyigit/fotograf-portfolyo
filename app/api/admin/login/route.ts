import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { sifre } = await request.json();
  const adminSifre = process.env.ADMIN_PASSWORD;

  if (sifre === adminSifre) {
    const cookieStore = await cookies();
    cookieStore.set("admin_token", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Hatalı şifre" }, { status: 401 });
}
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");

  if (!token || token.value !== "authenticated") {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const icerik = await request.json();
  const dosyaYolu = path.join(process.cwd(), "data", "icerik.json");

  await writeFile(dosyaYolu, JSON.stringify(icerik, null, 2), "utf-8");

  return NextResponse.json({ success: true });
}
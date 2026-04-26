import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  const dosyaYolu = path.join(process.cwd(), "data", "icerik.json");
  const icerik = await readFile(dosyaYolu, "utf-8");
  return NextResponse.json(JSON.parse(icerik));
}
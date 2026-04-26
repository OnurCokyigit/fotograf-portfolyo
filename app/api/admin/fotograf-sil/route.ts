import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");

  if (!token || token.value !== "authenticated") {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const { fotografId, publicId } = await request.json();

  await cloudinary.uploader.destroy(publicId);

  const githubToken = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH;
  const dosyaYolu = "data/icerik.json";

  const mevcutDosya = await fetch(
    `https://api.github.com/repos/${repo}/contents/${dosyaYolu}`,
    { headers: { Authorization: `Bearer ${githubToken}`, Accept: "application/vnd.github.v3+json" } }
  );
  const mevcutData = await mevcutDosya.json();
  const mevcutIcerik = JSON.parse(Buffer.from(mevcutData.content, "base64").toString("utf-8"));

  mevcutIcerik.fotograflar = mevcutIcerik.fotograflar.filter(
    (f: {id: string}) => f.id !== fotografId
  );

  const yeniIcerikStr = JSON.stringify(mevcutIcerik, null, 2);
  const yeniIcerikBase64 = Buffer.from(yeniIcerikStr).toString("base64");

  await fetch(
    `https://api.github.com/repos/${repo}/contents/${dosyaYolu}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `fotograf silindi: ${fotografId}`,
        content: yeniIcerikBase64,
        sha: mevcutData.sha,
        branch,
      }),
    }
  );

  return NextResponse.json({ success: true });
}
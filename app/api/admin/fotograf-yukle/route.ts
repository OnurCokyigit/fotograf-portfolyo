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

  const formData = await request.formData();
  const dosya = formData.get("file") as File;

  if (!dosya) {
    return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
  }

  const kategori = formData.get("kategori") as string || "Genel";
  const baslik = formData.get("baslik") as string || dosya.name;
  const aciklama = formData.get("aciklama") as string || "";

  const bytes = await dosya.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const yuklemeSonucu = await new Promise<{secure_url: string, public_id: string}>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "fotograf-portfolyo" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result as {secure_url: string, public_id: string});
      }
    ).end(buffer);
  });

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

  const yeniFotograf = {
    id: Date.now().toString(),
    url: yuklemeSonucu.secure_url,
    publicId: yuklemeSonucu.public_id,
    baslik,
    kategori,
    aciklama,
    tarih: new Date().toISOString(),
  };

  mevcutIcerik.fotograflar = [...(mevcutIcerik.fotograflar || []), yeniFotograf];

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
        message: `fotograf eklendi: ${baslik}`,
        content: yeniIcerikBase64,
        sha: mevcutData.sha,
        branch,
      }),
    }
  );

  return NextResponse.json({ success: true, fotograf: yeniFotograf });
}
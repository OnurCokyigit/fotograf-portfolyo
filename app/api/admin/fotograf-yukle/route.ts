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

  const sonuc = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "fotograf-portfolyo",
        tags: [kategori],
        context: `baslik=${baslik}|aciklama=${aciklama}|kategori=${kategori}`,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });

  return NextResponse.json({ success: true, sonuc });
}
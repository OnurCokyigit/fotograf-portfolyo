import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");

  if (!token || token.value !== "authenticated") {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const icerik = await request.json();

  const githubToken = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH;

  const dosyaYolu = "data/icerik.json";
  const icerikStr = JSON.stringify(icerik, null, 2);
  const icerikBase64 = Buffer.from(icerikStr).toString("base64");

  const mevcutDosya = await fetch(
    `https://api.github.com/repos/${repo}/contents/${dosyaYolu}`,
    {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  const mevcutData = await mevcutDosya.json();
  const sha = mevcutData.sha;

  const guncelle = await fetch(
    `https://api.github.com/repos/${repo}/contents/${dosyaYolu}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "icerik guncellendi",
        content: icerikBase64,
        sha: sha,
        branch: branch,
      }),
    }
  );

  if (guncelle.ok) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ error: "GitHub güncellemesi başarısız" }, { status: 500 });
  }
}
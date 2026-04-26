import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Göktuğ Görgülü | Spor Fotoğrafçısı",
  description: "Voleybol ve basketbol fotoğrafçılığı portfolyosu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" style={{ width: "100%" }}>
      <body style={{ width: "100%", margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
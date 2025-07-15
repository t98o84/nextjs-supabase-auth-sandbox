import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Google ログインデモ",
  description: "Next.js + Supabase でのGoogle認証デモ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

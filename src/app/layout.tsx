import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FutbolMatch Manager",
  description: "Gestiona els teus partits de futbol, assistències i tresoreria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
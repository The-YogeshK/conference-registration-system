import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conference Registration",
  description: "Register for the 2025 event",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">{children}</body>
    </html>
  );
}

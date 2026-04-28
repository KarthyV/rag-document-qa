import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RAG Document Q&A",
  description: "Upload PDFs and ask questions using AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}

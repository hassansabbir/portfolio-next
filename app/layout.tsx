import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frontend Developer Portfolio - Bangladesh",
  description:
    "Experienced frontend developer from Bangladesh with 2+ years experience and 30+ completed projects. Specialized in React, Next.js, TypeScript, and modern web technologies.",
  keywords:
    "frontend developer, web developer, React, Next.js, TypeScript, Bangladesh, portfolio",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}

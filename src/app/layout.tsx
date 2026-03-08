import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import CustomCursor from "@/components/motion/CustomCursor";
import GlassNav from "@/components/ui/GlassNav";
import PageTransition from "@/components/motion/PageTransition";
import DataDecompressionLoader from "@/components/motion/DataDecompressionLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * @component RootLayout
 * @description The global outer wrapper for the application. 
 * Orchestrates fonts, meta-tags, and global motion providers (SmoothScroll, CustomCursor).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-white selection:bg-[#6610f2] selection:text-white`}
      >
        <DataDecompressionLoader />
        <SmoothScroll>
          <CustomCursor />
          <GlassNav />
          <PageTransition>
            {children}
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}

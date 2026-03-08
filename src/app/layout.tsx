import type { Metadata } from "next";
import { Inter, Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";
import CustomCursor from "@/components/motion/CustomCursor";
import GlassNav from "@/components/ui/GlassNav";
import PageTransition from "@/components/motion/PageTransition";
import MolecularAssemblyLoader from "@/components/motion/MolecularAssemblyLoader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
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
        className={`${inter.variable} ${outfit.variable} ${geistMono.variable} antialiased bg-[#030303] text-white selection:bg-[#c084fc]/30 selection:text-white`}
      >
        <MolecularAssemblyLoader />
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

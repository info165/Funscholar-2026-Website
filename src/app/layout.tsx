import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FunScholar - Transforming Education with Technology",
  description:
    "India's pioneer in experiential and AI-powered learning. Transforming 10,000+ schools with Robotics, AI, STEM labs, and smart classrooms.",
  keywords: ["Funscholar", "Experiential Learning", "Robotics", "AI in Education", "ATL Labs", "STEM", "NEP 2020"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      {/* Header and Footer live here, not per-page, so they persist across
          navigation instead of unmounting and remounting on every route. */}
      <body className="bg-white text-[#0a0a0a]">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

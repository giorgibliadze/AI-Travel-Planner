import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "TripNova AI — AI-powered Travel Planning",
    template: "%s | TripNova AI",
  },
  description: "TripNova AI creates personalized itineraries, budgets, hotels and attractions in seconds.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('tripnova-theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark');var l=localStorage.getItem('tripnova-lang')||'ka';document.documentElement.setAttribute('lang',l)})()`,
          }}
        />
      </head>
      <body className={`${geist.variable} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

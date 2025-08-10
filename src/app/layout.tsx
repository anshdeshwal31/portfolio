import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ansh Deshwal - Full-stack web developer",
  description: "Crafting immersive digital experiences with modern web technologies and cutting-edge AI solutions.",
  keywords: ["Full Stack Developer", "React", "Next.js",  "Web Development", "AI"],
  authors: [{ name: "Ansh Deshwal" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {/* Visible message if JavaScript is disabled or client bundles fail to load */}
        <noscript>
          <div style={{
            position: 'fixed', inset: 0 as unknown as number, display: 'flex',
            alignItems: 'center', justifyContent: 'center', background: 'black', color: 'white',
            zIndex: 9999, padding: '1rem', textAlign: 'center'
          }}>
            This site is an interactive experience and requires JavaScript. If you’re seeing this screen after deployment,
            it may indicate a hosting/CDN issue loading client assets. Please refresh, try a different network or browser,
            or contact the site owner.
          </div>
        </noscript>
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

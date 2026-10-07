import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://istv-reels-tool-landingpage-beta.vercel.app"),
  title: "ISTV Editor Tools | Inside Success TV",
  description:
    "Editor tools for Premiere Pro: find reel moments, build vertical reels, or turn a documentary cut sheet into a multicam assembly with voice-over. Windows and macOS.",
  openGraph: {
    title: "ISTV Editor Tools",
    description: "Reels desktop, Reels for Premiere, and Documentary Cut Sheet for Premiere Pro.",
    images: ["/hero-ai-editor.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

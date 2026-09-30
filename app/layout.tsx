import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ISTV Reels Tool | Inside Success TV",
  description:
    "Find the best moments in your footage. Download the ISTV Reels Tool desktop app or Premiere Pro panel for Windows and macOS.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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

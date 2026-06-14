import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inside Success AI | AI Video Editing Software",
  description:
    "A cinematic landing page for Inside Success AI, an AI video editing suite for fast social, launch, and ad production.",
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

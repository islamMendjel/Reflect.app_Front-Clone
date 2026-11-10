import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reflect - Think better with Reflect",
  description:
    "An open-source note-taking app with daily notes, backlinks, and local Markdown files.",
  keywords: [
    "Reflect",
    "note-taking",
    "daily notes",
    "backlinks",
    "Markdown",
    "open source",
  ],
  icons: {
    icon: "/reflect/images/logo.png",
  },
  openGraph: {
    title: "Reflect - Think better with Reflect",
    description:
      "An open-source note-taking app with daily notes, backlinks, and local Markdown files.",
    siteName: "Reflect",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { PrivyAuthProvider } from "@/components/providers/privy-provider";

export const metadata: Metadata = {
  title: "HyperApp - Next.js 13 + Tailwind CSS v4",
  description:
    "A modern web application built with Next.js 13, React 19, and Tailwind CSS v4. Showcasing the latest features and best practices.",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "TypeScript",
    "Modern Web Development",
  ],
  authors: [{ name: "HyperApp Team" }],
  creator: "HyperApp",
  publisher: "HyperApp",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hyperapp-web.vercel.app",
    siteName: "HyperApp",
    title: "HyperApp - Next.js 13 + Tailwind CSS v4",
    description:
      "A modern web application built with Next.js 13, React 19, and Tailwind CSS v4",
  },
  twitter: {
    card: "summary_large_image",
    title: "HyperApp - Next.js 13 + Tailwind CSS v4",
    description:
      "A modern web application built with Next.js 13, React 19, and Tailwind CSS v4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased font-sans`}>
        <PrivyAuthProvider>{children}</PrivyAuthProvider>
      </body>
    </html>
  );
}

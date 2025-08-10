import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import "./globals.css";

const untitledSans = localFont({
  variable: "--font-untitled-sans",
  src: [
    {
      path: "./fonts/untitled-sans-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/untitled-sans-medium.woff2",
      weight: "500",
      style: "medium",
    },
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WorkOS Frontend Take Home",
  description: "WorkOS Frontend Take Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${untitledSans.variable} ${geistMono.variable} antialiased`}
      >
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}

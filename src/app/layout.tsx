import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "XenoTask — AI shopper engagement",
  description: "AI-native CRM for shopper engagement",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.className} min-h-full antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

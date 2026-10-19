import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";



export const metadata: Metadata = {
  title: "Vancouver Restaurant Squeeze",
  description: "A decade of data on Vancouver's restaurant crisis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-motion="off" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}

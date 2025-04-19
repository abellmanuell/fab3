import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"], // Add desired font weights
});

export const metadata: Metadata = {
  title: "Fab3 - Organize your Web3 Airdrops.",
  description: "Organize and manage your Web3 Airdrops.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable}`}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, M_PLUS_1_Code } from "next/font/google";
import "./globals.css";

const inter = M_PLUS_1_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next App",
  description: "Next Learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

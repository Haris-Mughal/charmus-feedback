import type { Metadata } from "next";
import { Inter, M_PLUS_1_Code } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";

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
      <AuthProvider>
        <body className={inter.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}

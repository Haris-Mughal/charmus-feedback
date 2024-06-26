import Navbar from "@/components/navbar/page";
import type { Metadata } from "next";
import { Inter, M_PLUS_1_Code } from "next/font/google";

const inter = M_PLUS_1_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Charmus Message",
  description: "Message App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

import Header from "@/components/Header/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className + " bg-no-repeat bg-violet-100 height"}>
        <Header />
        <div className="flex h-full">
          <Navigation />
          {children}
          </div>
      </body>
    </html>
  );
}

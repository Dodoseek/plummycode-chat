import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
const Inconsol = Inconsolata({ subsets: ["latin"] });
import "./globals.css";

export const metadata: Metadata = {
  title: "Plummy Chat",
  description: "Online chat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="ru">
      <body className={Inconsol.className + "bg-no-repeat bg-violet-100 flex justify-center flex-row"}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";

export const Inconsol = Inconsolata({
  subsets: ["latin"],
  variable: '--font-inconsolata',
});
export const metadata: Metadata = {
  title: "Plummy Sign In",
  description: "Sign In Plummy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="ru">
      <body className={`${Inconsol.variable} font-sans h-screen cross-pattern flex justify-center`}>
        <main className="w-screen sm:max-w-screen-sm flex flex-col h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

'use client'
import Header from "@/components/Header/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import Navigation from "@/components/Navigation/Navigation";
import { Provider } from "react-redux";
import { store } from "../store/store";
const Inconsol = Inconsolata({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plummy Chat",
  description: "Online chat for friends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="ru">
      <body className={Inconsol.className + "bg-no-repeat bg-violet-100 flex justify-center flex-row"}>
          <Provider store={store}>
        <div className="h-screen w-screen sm:max-w-screen-sm">
            <Header/>
            <div className="height">
              {children}
            </div>
            <Navigation/>
        </div>
          </Provider> 
      </body>
    </html>
  );
}

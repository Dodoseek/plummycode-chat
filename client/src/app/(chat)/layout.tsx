import Header from "@/components/Header";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ClientProvider from "@/components/ClientProvider";

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
    <ClientProvider>
      <div className=" w-screen h-screen sm:max-w-screen-sm">
        <Header />
        <div className="height">
          {children}
        </div>
        <Footer />
      </div>
    </ClientProvider>
  );
}

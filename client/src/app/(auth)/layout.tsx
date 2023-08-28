import type { Metadata } from "next";
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
    <>
      <ClientProvider>
        <main className="flex h-screen flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
          {children}
        </main>
      </ClientProvider>
    </>
  );
}

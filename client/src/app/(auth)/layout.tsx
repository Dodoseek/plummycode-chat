import type { Metadata } from "next";
import ClientProvider from "@/components/ClientProvider";
import { authConfug } from "@/configs/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Plummy Chat",
  description: "Online chat",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(authConfug)

  if (session) {
    redirect(process.env.NEXT_PUBLIC_LOGIN_URL!)
  }

  return (
    <>
      <ClientProvider>
        <main className="flex h-full flex-1 flex-col items-center justify-center py-12 lg:px-8">
          {children}
        </main>
      </ClientProvider>
    </>
  );
}

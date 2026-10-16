import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import Link from "next/link";
import { AuthProvider } from "@/components/AuthProvider";
import { Header } from "@/components/Header";
import "./globals.css";

const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"] });
const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chameleon: feel at home at school in the US & Canada",
  description:
    "Project Chameleon helps international students understand classroom expectations and social norms in the US and Canada.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}>
      <body className="blob-bg flex min-h-full flex-col">
        <AuthProvider>
          <Header />
          <main className="mx-auto w-full max-w-5xl flex-1 px-5 pb-16">{children}</main>
          <footer className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-2 px-5 py-6 text-sm text-muted">
            <span>🦎 Project Chameleon · made for international students</span>
            <Link href="/privacy" className="underline-offset-4 hover:underline">
              Privacy
            </Link>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}

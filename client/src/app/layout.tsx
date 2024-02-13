import { Inter } from "next/font/google";
import Link from "next/link";
import Modal from "@/components/ui/Modal";
import ApolloWrapper from "@/components/ApolloWrapper";

import "./globals.css";
import Profile from "@/components/ui/Profile";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-purple-700 dark"
    >
      <body className={cn(inter.className)}>
        <ApolloWrapper>
          <header className="fixed top-0 grid w-full grid-cols-3 rounded-b bg-opacity-50 bg-gradient-to-br from-blue-500 to-purple-500 px-4 py-2">
            <div></div>
            <nav className="prose flex justify-center gap-2">
              <Link href="/" className="text-slate-100 no-underline">
                Home
              </Link>
              <Link href="/blog" className="text-slate-100 no-underline">
                Blog
              </Link>
              <Link href="/dashboard" className="text-slate-100 no-underline">
                Dashboard
              </Link>
            </nav>
            <Profile className="ml-auto" />
          </header>
          <main className="h-screen bg-background px-4 pb-8 pt-16">
            {children}
          </main>
          <Modal />
        </ApolloWrapper>
      </body>
    </html>
  );
}

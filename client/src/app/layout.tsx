import { Inter } from "next/font/google";
import Link from "next/link";
import Modal from "@/components/ui/Modal";
import ApolloWrapper from "@/components/ApolloWrapper";

import "./globals.css";
import Profile from "@/components/ui/Profile";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-purple-700"
    >
      <body className={inter.className}>
        <ApolloWrapper>
          <header className="fixed top-0 grid grid-cols-3 w-full rounded-b bg-opacity-50 bg-gradient-to-br from-blue-500 to-purple-500 py-2 px-4">
            <div></div>
            <nav className="prose flex gap-2 justify-center">
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
          <main className="h-screen bg-slate-300 px-4 pt-16 pb-8">{children}</main>
          <Modal />
        </ApolloWrapper>
      </body>
    </html>
  );
}

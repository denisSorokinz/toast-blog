import { Inter } from "next/font/google";
import Link from "next/link";
import Modal from "@/components/ui/Modal";
import ApolloWrapper from "@/components/ApolloWrapper";

import "./globals.css";

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
          <header className="sticky top-0 flex w-full justify-center rounded-b bg-opacity-50 bg-gradient-to-br from-blue-500 to-purple-500 py-2">
            <nav className="prose flex gap-2">
              <Link href="/" className="text-white no-underline">
                Home
              </Link>
              <Link href="/blog" className="text-white no-underline">
                Blog
              </Link>
            </nav>
          </header>
          <main className="h-screen bg-slate-300 px-4 py-8">{children}</main>
          <Modal />
        </ApolloWrapper>
      </body>
    </html>
  );
}

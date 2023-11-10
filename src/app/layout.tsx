import type { Metadata } from "next";
import { Inter } from "next/font/google";
import getServerSession, { Session } from "next-auth";
import "./globals.css";

import Navbar from "@/ui/navbar";
import Provider from "@/ui/Provider";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Witchmaker",
  description: "GDR campaigns manager",
};

type Props = {
  children: React.ReactNode;
};
export default async function RootLayout({ children }: Props) {
  const { session } = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <Navbar />
          <div className="page">{children}</div>
        </Provider>
      </body>
    </html>
  );
}

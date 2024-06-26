import "./globals.css";
import type { Metadata } from "next";
import type { FC, PropsWithChildren } from "react";
import { Montserrat } from "next/font/google";
import { ClientRootLayout } from "./client-layout";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solitaire",
  description: "Generated by create next app",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body className={inter.className}>
      <ClientRootLayout>{children}</ClientRootLayout>
    </body>
  </html>
);

export default RootLayout;

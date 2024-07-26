// components/Layout.tsx
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationBar } from "@/components/layout/Navbar";
import React, { FC } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gobiloc - App de collocs",
  description: "Application de gestion de collocation entre amis.",
};

interface RootLayoutProps {
  children: React.ReactNode;
  Header?: FC;
}

const RootLayout: FC<RootLayoutProps> = ({ children, Header }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          {Header && <Header />}
          <main className="flex-grow">
            {children}
          </main>
          <footer className=" bg-gray-800 text-white p-2 md:p-4">
            <NavigationBar />
          </footer>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;

'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import React, { FC } from "react";
import { NavigationBar } from "./components/customsComponents/layout/Navbar";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {

  return (
    <html lang="fr">
      <AuthProvider>
        <body className={inter.className}>
          <div className="flex flex-col h-full  bg-slate-100">
            <main className="flex-grow pt-16 p-4 sm:pt-28">
              {children}
            </main>
            <footer>
              <NavigationBar />
            </footer>
          </div>
        </body>
      </AuthProvider>
    </html>
  );
};

export default RootLayout;

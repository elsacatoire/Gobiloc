'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import React, { FC } from "react";
import { NavigationBar } from "./components/customsComponents/layout/Navbar";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
  Header?: FC;
}

const RootLayout: FC<RootLayoutProps> = ({ children, Header }) => {

  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <div className="flex flex-col min-h-screen">
            {Header && <Header />}
            <main className="flex-grow">
              {children}
            </main>
            <footer>
              {/* isAuthenticated &&  */<NavigationBar />}
            </footer>
          </div>
        </body>
      </AuthProvider>
    </html>
  );
};

export default RootLayout;

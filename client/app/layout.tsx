// components/Layout.tsx
'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import React, { FC, useEffect } from "react";
import { NavigationBar } from "./components/customsComponents/layout/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "@/utils/useAuth";
import { usePathname, redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
  Header?: FC;
}

const RootLayout: FC<RootLayoutProps> = ({ children, Header }) => {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  /*   useEffect(() => {
      // Si l'utilisateur n'est pas authentifié et qu'il essaie d'accéder à une autre route que "/"
      if (!user && pathname !== "/" && pathname !== "/login" && pathname !== "/register") {
        redirect("/");
      }
    }, [isAuthenticated, pathname]); */

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

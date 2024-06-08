import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationBar } from "@/components/layout/Navbar"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gobiloc - App de collocs",
  description: "Application de gestion de collocation entre amis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">{children}</main>
          <footer className="bg-gray-800 text-white p-2 md:p-4">
            {/* <p>&copy; 2024 Gobiloc. All rights reserved.</p> */}
            <NavigationBar />
          </footer>
        </div>
      </body>
    </html>
  );
}

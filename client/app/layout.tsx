import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import { Providers } from "./Providers";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/shared/Footer/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Deshora",
  description: "An ecommerce web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}  antialiased`}>
        <Providers>
          <nav>
            <Header />
          </nav>
          <main>{children}</main>
          <footer>
            <Footer />
          </footer>
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}

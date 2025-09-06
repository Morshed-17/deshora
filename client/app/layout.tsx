import type { Metadata } from "next";
import { Jost, Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";
import { Toaster } from "sonner";

export const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // normal, medium, bold
  variable: "--font-jost",
});

export const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
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
      <body className={`${jost.variable} ${nunito.variable} `}>
        <Providers>
          {children}
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}

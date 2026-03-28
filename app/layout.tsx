import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});


export const metadata: Metadata = {
  title: "O'Pizza — Saint-Michel-sur-Orge",
  description:
    "Pizza artisanale dark luxury. Pâte fermentée 72h, ingrédients sélectionnés. Saint-Michel-sur-Orge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="bg-black text-white min-h-screen">
{children}
      </body>
    </html>
  );
}

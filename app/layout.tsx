import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
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
    <html lang="fr" className={`${anton.variable} ${inter.variable}`}>
      <body className="bg-black text-white min-h-screen">
        {/* SVG filter for grunge/distressed text effect on headings */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <filter id="grunge" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.055" numOctaves="4" seed="8" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" result="displaced" />
              <feComposite in="displaced" in2="SourceGraphic" operator="in" />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}

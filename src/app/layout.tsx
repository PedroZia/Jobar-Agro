import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jobar Agro — Paisagismo que Gera Valor",
  description:
    "Plantas frutíferas, ornamentais e acessórios para projetos de paisagismo de alto impacto. Consultoria especializada, logística completa e garantia de qualidade.",
  keywords: [
    "plantas frutíferas",
    "plantas ornamentais",
    "paisagismo",
    "jardim",
    "decoração",
    "acessórios de jardim",
    "Jobar Agro",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${dmSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}

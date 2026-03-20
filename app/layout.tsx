import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Usando Inter como alternativa à Gilroy
// É uma fonte geométrica moderna similar
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-gilroy',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Protocolos de Conversão | MedGM",
  description: "110+ scripts validados para médicos e secretárias. Sua vantagem injusta contra a concorrência.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

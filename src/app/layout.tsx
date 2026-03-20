import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lezebreapois.fr"),
  title: "Le Zèbre à pois | Bar-Brasserie à Rouen - Café, Plats & Desserts",
  description: "Découvrez Le Zèbre à pois, votre bar-brasserie préféré au cœur de Rouen. Cuisine française raffinée, excellent café, desserts gourmands et grande sélection de vins. Réservez votre table maintenant !",
  keywords: [
    "Le Zèbre à pois",
    "restaurant Rouen",
    "brasserie Rouen",
    "bar Rouen",
    "café Rouen",
    "restaurant centre-ville Rouen",
    "cuisine française",
    "terrasse Rouen",
    "réservation restaurant Rouen",
    "Rue aux Ours",
  ],
  authors: [{ name: "Le Zèbre à pois" }],
  icons: {
    icon: "/images/logo-zebre.png",
    apple: "/images/logo-zebre.png",
  },
  openGraph: {
    title: "Le Zèbre à pois | Bar-Brasserie à Rouen",
    description: "Votre bar-brasserie préféré au cœur de Rouen. Cuisine française, excellent café et ambiance chaleureuse.",
    url: "https://lezebreapois.fr",
    siteName: "Le Zèbre à pois",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/images/exterieur/exterieur-1.jpg",
        width: 1200,
        height: 630,
        alt: "Le Zèbre à pois - Bar Brasserie Rouen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Zèbre à pois | Bar-Brasserie à Rouen",
    description: "Cuisine française raffinée, excellent café et ambiance chaleureuse au cœur de Rouen.",
    images: ["/images/exterieur/exterieur-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://lezebreapois.fr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${lato.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

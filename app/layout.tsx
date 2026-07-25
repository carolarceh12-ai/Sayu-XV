import type { Metadata } from "next";
import { Great_Vibes, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "XV años de Sayumi",

  description:
    "Te invitamos a ser parte de una noche muy especial: los XV años de Sayumi.",

  openGraph: {
    title: "XV años de Sayumi",
    description:
      "Te invitamos a ser parte de una noche muy especial: los XV años de Sayumi.",
    url: "/",
    siteName: "XV años de Sayumi",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Invitación a los XV años de Sayumi",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "XV años de Sayumi",
    description:
      "Te invitamos a ser parte de una noche muy especial: los XV años de Sayumi.",
    images: ["/opengraph-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${greatVibes.variable}`}>
        {children}
      </body>
    </html>
  );
}
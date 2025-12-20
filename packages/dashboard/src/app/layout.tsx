import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import { GoogleTagManager } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Earn Carrots | Bunny Universe",
  description: "Keep track of your $CARROT score in the Bunny Universe!",
  applicationName: "Earn Carrots",
  authors: [
    { name: "alain.linea.eth", url: "https://x.com/Alain_Ncls" },
    { name: "0xSupertramp", url: "https://x.com/supertramplens" },
  ],
  generator: "Next.js",
  keywords: ["Bunny Universe", "Dashboard", "Carrots", "Linea", "NFT"],
  robots: { index: true, follow: true },
  icons: [
    { rel: "icon", url: "https://earncarrot.bunnyuniverse.xyz/logo.png" },
    {
      rel: "apple-touch-icon",
      url: "https://earncarrot.bunnyuniverse.xyz/logo.png",
    },
  ],
  openGraph: {
    type: "website",
    url: "https://earncarrot.bunnyuniverse.xyz",
    title: "Earn Carrots | Bunny Universe",
    description: "Keep track of your $CARROT score in the Bunny Universe!",
    siteName: "Earn Carrots | Bunny Universe",
    images: [{ url: "https://earncarrot.bunnyuniverse.xyz/logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@BunnyUniverse",
    creator: "@Alain_Ncls",
    images: "https://earncarrot.bunnyuniverse.xyz/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <GoogleTagManager gtmId="G-2WPL4KLRMT" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

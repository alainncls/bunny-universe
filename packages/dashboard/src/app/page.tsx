import type { Metadata } from "next";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Earn Carrots | Bunny Universe",
  description: "Keep track of your $CARROT score in the Bunny Universe!",
  applicationName: "Earn Carrots",
  authors: [
    { name: "alain.linea.eth", url: "https://x.com/Alain_Ncls" },
    {
      name: "0xSupertramp",
      url: "https://x.com/supertramplens",
    },
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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)] w-full pt-32">
      <Header />
      <Main className="flex-grow" />
      <Footer className="mt-auto mb-8" />
    </div>
  );
}

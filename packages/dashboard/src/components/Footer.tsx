import Image from "next/image";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={className}>
      <div className="row-span-full mt-8 mb-8 flex flex-row items-center justify-center">
        <Image
          src={"/logo.png"}
          alt={"Bunny Universe logo"}
          width={36}
          height={36}
          className={"mr-1"}
        />
        is the first stake-able NFT collection, proudly built on
        <a
          className="underline underline-offset-4"
          href="https://linea.build"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={"/linea.png"}
            alt={"Linea logo"}
            width={98}
            height={36}
            className={"ml-1"}
          />
        </a>
      </div>
      <div className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://x.com/BunnyOnLinea"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/icons/x.svg"
            alt="X icon"
            width={24}
            height={24}
            className={"svg-white"}
          />
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://t.co/0ccxMDk3QA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/icons/discord.svg"
            alt="Discord icon"
            width={30}
            height={24}
            className={"svg-white"}
          />
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://t.me/+eUNrbxjP0Xo3NDM0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/icons/telegram.svg"
            alt="Telegram icon"
            width={23}
            height={24}
            className={"svg-white"}
          />
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://element.market/collections/bunny-universe-onlinea"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/icons/element.svg"
            alt="Element icon"
            width={24}
            height={24}
            className={"svg-white"}
          />
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.bunnyuniverse.xyz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/icons/globe.svg"
            alt="Link icon"
            width={24}
            height={24}
            className={"svg-white"}
          />
        </a>
      </div>
    </footer>
  );
}

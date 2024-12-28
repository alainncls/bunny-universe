"use client";

import { Card } from "flowbite-react";
import Image from "next/image";

type NftCardProps = {
  tokenId: string;
  imageUrl: string;
  ownedSince: string;
};

export default function NftCard({
  tokenId,
  imageUrl,
  ownedSince,
}: NftCardProps) {
  return (
    <Card
      className="max-w-sm"
      renderImage={() => (
        <Image width={270} height={270} src={imageUrl} alt="NFT Image" />
      )}
    >
      <div className="flex justify-between items-center">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {tokenId}
        </h5>
        <a
          href={`https://element.market/assets/linea/0x2375f81ccd6665ab606239e6602dbb601d35ec77/${tokenId}`}
          target={"_blank"}
          rel={"noopener noreferrer"}
        >
          <Image
            src={"/icons/external-link.svg"}
            alt={"External link icon"}
            width={16}
            height={16}
            className={"svg-white"}
          />
        </a>
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        You got this bunny {ownedSince}.
      </p>
    </Card>
  );
}

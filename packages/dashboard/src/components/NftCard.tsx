"use client";

import { Card } from "flowbite-react";
import Image from "next/image";
import { TokenScore } from "@/types";
import {
  DAILY_POINTS,
  MONTHLY_BONUS,
  QUARTERLY_BONUS,
  SEMESTER_BONUS,
} from "@/utils/constants";

type NftCardProps = {
  tokenId: string;
  imageUrl: string;
  ownedSince: string;
  score: TokenScore;
};

export default function NftCard({
  tokenId,
  imageUrl,
  ownedSince,
  score,
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
      <h6 className="text-l font-bold text-gray-900 dark:text-white">
        {score.score} $CARROT points
      </h6>
      <ul className="font-normal text-gray-700 dark:text-gray-400">
        <li className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-400">
            Daily {DAILY_POINTS} points
          </span>
          {score.days > 0 ? "✅" : "❌"}
        </li>
        <li className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-400">
            Weekly multiplier
          </span>
          {score.weeks > 0 ? "✅" : "❌"}
        </li>
        <li className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-400">
            Early holder multiplier
          </span>
          {score.earlyHolder ? "🏆" : "❌"}
        </li>
        <li className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-400">
            Monthly bonus {MONTHLY_BONUS}
          </span>
          {score.months > 0 ? "✅" : "❌"}
        </li>
        <li className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-400">
            3 months bonus {QUARTERLY_BONUS}
          </span>
          {score.quarters > 0 ? "✅" : "❌"}
        </li>
        <li className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-400">
            6 months bonus {SEMESTER_BONUS}
          </span>
          {score.semesters > 0 ? "✅" : "❌"}
        </li>
      </ul>
    </Card>
  );
}

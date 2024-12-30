import { Score } from "@/types";
import { Card, Tooltip } from "flowbite-react";
import EnsResolution from "@/components/EnsResolution";
import { getAddress } from "viem";
import Image from "next/image";
import { formatDistance } from "date-fns";

type RankingProps = {
  score: Score;
};

export default function Ranking({ score }: RankingProps) {
  const displayRank = (rank: number) => {
    switch (rank) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return "🐇";
    }
  };

  const displayHolder = (holder: string) => {
    return (
      <a
        href={`https://lineascan.build/address/${holder}`}
        target={"_blank"}
        rel={"nofollow noopener"}
        className="inline-flex items-center space-x-1"
      >
        <EnsResolution address={getAddress(holder)} />
        <Image
          src={"/icons/external-link.svg"}
          alt={"External link icon"}
          width={12}
          height={12}
          className={"svg-grey ml-1"}
        />
      </a>
    );
  };

  const displayScore = (score: number) => {
    return score.toLocaleString("en-US");
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 flex items-center justify-center space-x-2">
        Ranking
        {score.lastUpdate && (
          <Tooltip
            content={`Last updated ${formatDistance(
              new Date(score.lastUpdate),
              new Date(),
              { addSuffix: true },
            )}`}
          >
            <Image
              src={"/icons/info.svg"}
              alt={"Information icon"}
              width={16}
              height={16}
              className={"svg-grey ml-1"}
            />
          </Tooltip>
        )}
      </h2>
      <p className="text-lg text-center text-gray-500 dark:text-gray-400 mb-4">
        🏅 How high can you hop?
      </p>
      <Card className="max-w-sm mx-auto text-center">
        <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
          {score.rank}
        </h3>
        <p className="text-lg text-gray-500 dark:text-gray-400">Your rank</p>
      </Card>
      <ul className="m-8 lg:m-0 lg:mt-4">
        {score.top10?.slice(0, 6).map((score, index) => (
          <li key={score.holder} className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-400">
              {displayRank(index)} {displayHolder(score.holder)}
            </span>
            {displayScore(score.total)}
          </li>
        ))}
      </ul>
    </>
  );
}

import { Score } from "@/types";
import {
  COLLECTOR_TIER_2_MULTIPLIER,
  COLLECTOR_TIER_3_MULTIPLIER,
  COLLECTOR_TIER_4_MULTIPLIER,
  COLLECTOR_TIER_5_MULTIPLIER,
  LXP_MULTIPLIER,
  LXP_THRESHOLD,
} from "@/utils/constants";
import { Card } from "flowbite-react";

type TotalScoreProps = {
  score: Score;
};

export default function TotalScore({ score }: TotalScoreProps) {
  const tokenNumber = score.tokens.length;
  return (
    <>
      {score ? (
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
            $CARROT Score
          </h2>
          <p className="text-lg text-center text-gray-500 dark:text-gray-400 mb-4">
            🥕 Your $CARROT points, freshly harvested.
          </p>
          <Card className="max-w-sm mx-auto text-center">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white">
              {score.total}
            </h3>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Total Points
            </p>
          </Card>
          <ul className="mt-2">
            <li className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-400">
                1 NFT: No multiplier (base points only)
              </span>
              {tokenNumber === 1 ? "✅" : "❌"}
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-400">
                2 NFTs: {COLLECTOR_TIER_2_MULTIPLIER}x points
              </span>
              {tokenNumber === 2 ? "✅" : "❌"}
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-400">
                3-4 NFTs: {COLLECTOR_TIER_3_MULTIPLIER}x points
              </span>
              {tokenNumber >= 3 && tokenNumber <= 4 ? "✅" : "❌"}
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-400">
                5-9 NFTs: {COLLECTOR_TIER_4_MULTIPLIER}x points
              </span>
              {tokenNumber >= 5 && tokenNumber <= 9 ? "✅" : "❌"}
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-400">
                10+ NFTs: {COLLECTOR_TIER_5_MULTIPLIER}x points
              </span>
              {tokenNumber >= 10 ? "✅" : "❌"}
            </li>
            <li className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-400">
                LXP {`>`} {LXP_THRESHOLD}: {LXP_MULTIPLIER}x points
              </span>
              {score.isLxpWhale ? "🐳" : "❌"}
            </li>
          </ul>
        </div>
      ) : (
        <span>Loading score...</span>
      )}
    </>
  );
}
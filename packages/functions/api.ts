import axios from "axios";
import {
  createPublicClient,
  erc721Abi,
  getAddress,
  http,
  isAddress,
} from "viem";
import { config } from "dotenv";
import { linea } from "viem/chains";
import { Score, Token, TokenScore } from "../dashboard/src/types";
import {
  BunnyUniverseContract,
  COLLECTOR_TIER_1_MULTIPLIER,
  COLLECTOR_TIER_2_MULTIPLIER,
  COLLECTOR_TIER_3_MULTIPLIER,
  COLLECTOR_TIER_4_MULTIPLIER,
  COLLECTOR_TIER_5_MULTIPLIER,
  DAILY_POINTS,
  EARLY_HOLDER_MULTIPLIER,
  MINTING_DAY,
  MONTHLY_BONUS,
  QUARTERLY_BONUS,
  SEMESTER_BONUS,
  WEEKLY_MULTIPLIER,
} from "../dashboard/src/utils/constants";

config({ path: ".env" });

const { NEXT_PUBLIC_INFURA_ID } = process.env;

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const checkConfig = () => {
  if (!NEXT_PUBLIC_INFURA_ID) {
    throw new Error("Configuration not set");
  }
};

const checkAddress = (address: string) => {
  if (!isAddress(address)) {
    throw new Error("Invalid address");
  }
};

const getTokenNumber = async (address: string) => {
  const publicClient = createPublicClient({
    chain: linea,
    transport: http(
      `https://linea-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    ),
  });

  const addr = getAddress(address);

  const balance = await publicClient.readContract({
    abi: erc721Abi,
    address: BunnyUniverseContract,
    functionName: "balanceOf",
    args: [addr],
  });
  return Number(balance);
};

const checkTokenNumber = (tokenNumber: number) => {
  if (tokenNumber < 1) {
    throw new Error("No tokens found for this address");
  }
};

const getTokensOwned = async (address: string) => {
  const response = await axios.post(
    "https://api.studio.thegraph.com/query/67521/bunny-universe/version/latest",
    {
      query: `
            query GetTokens($address: String!) {
                  tokens(where: { owner: $address }) {
                id
                owner
                ownedSince
              }
            }
          `,
      variables: {
        address,
      },
    },
  );
  return response.data.data.tokens;
};

const checkTokensOwned = (tokensOwned: Token[], tokenNumber: number) => {
  if (tokensOwned.length !== tokenNumber) {
    throw new Error("Token count mismatch");
  }
};

const computePeriods = (ownedSinceString: string) => {
  const ownedSince = parseInt(ownedSinceString);
  const currentTime = Date.now() / 1000;
  const holdingPeriod = currentTime - ownedSince;

  const days = Math.floor(holdingPeriod / (24 * 60 * 60));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const quarters = Math.floor(months / 3);
  const semesters = Math.floor(months / 6);

  return { days, weeks, months, quarters, semesters };
};

const computeCollectorTierMultiplier = (tokensCount: number): number => {
  if (tokensCount === 1) {
    return COLLECTOR_TIER_1_MULTIPLIER;
  } else if (tokensCount === 2) {
    return COLLECTOR_TIER_2_MULTIPLIER;
  } else if (tokensCount >= 3 && tokensCount <= 4) {
    return COLLECTOR_TIER_3_MULTIPLIER;
  } else if (tokensCount >= 5 && tokensCount <= 9) {
    return COLLECTOR_TIER_4_MULTIPLIER;
  } else if (tokensCount >= 10) {
    return COLLECTOR_TIER_5_MULTIPLIER;
  }
};

const computeEarlyHolder = (ownedSince: string): boolean => {
  const ownedSinceTimestamp = parseInt(ownedSince);
  return ownedSinceTimestamp < MINTING_DAY;
};

const computeScore = (token: Token): TokenScore => {
  let score = 0;
  const { days, weeks, months, quarters, semesters } = computePeriods(
    token.ownedSince,
  );

  // Daily Point Distribution
  score += DAILY_POINTS * days;

  // Weekly Snapshot Bonus
  if (weeks > 0) {
    score *= WEEKLY_MULTIPLIER * weeks;
  }

  // Early Holder Bonus
  const isEarlyHolder = computeEarlyHolder(token.ownedSince);
  if (isEarlyHolder) {
    score *= EARLY_HOLDER_MULTIPLIER;
  }

  // Monthly Bonus
  score += MONTHLY_BONUS * months;

  // Quarterly Bonus
  score += QUARTERLY_BONUS * quarters;

  // Semester Bonus
  score += SEMESTER_BONUS * semesters;

  return {
    tokenId: token.id,
    score: Math.floor(score),
    days,
    weeks,
    months,
    quarters,
    semesters,
    earlyHolder: isEarlyHolder,
  };
};

const computeTotalScore = (tokensOwned: Token[]): Score => {
  const scores: TokenScore[] = [];

  for (const token of tokensOwned) {
    scores.push(computeScore(token));
  }

  let totalScore = Math.floor(scores.reduce((a, b) => a + b.score, 0));

  // Collection Size Multiplier
  const collectorTierMultiplier = computeCollectorTierMultiplier(
    tokensOwned.length,
  );
  totalScore *= collectorTierMultiplier;

  return {
    total: Math.floor(totalScore),
    tokens: scores,
    collectorTierMultiplier,
  };
};

export async function handler(event: {
  queryStringParameters: { address: string };
  body: string;
  httpMethod: string;
}) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  checkConfig();

  try {
    const { address } = event.queryStringParameters;
    checkAddress(address);

    const tokenNumber = await getTokenNumber(address);
    checkTokenNumber(tokenNumber);

    const tokensOwned = await getTokensOwned(address);
    checkTokensOwned(tokensOwned, tokenNumber);

    const score = computeTotalScore(tokensOwned);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ score }),
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: errorMessage }),
    };
  }
}

import axios from "axios";
import {
  createPublicClient,
  erc20Abi,
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
  LXP_MULTIPLIER,
  LXP_THRESHOLD,
  LxpContract,
  MINTING_DAY,
  MONTHLY_BONUS,
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

const getTokenBalances = async (address: string) => {
  const publicClient = createPublicClient({
    chain: linea,
    transport: http(
      `https://linea-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    ),
    batch: {
      multicall: {
        wait: 10,
      },
    },
  });

  const addr = getAddress(address);

  const [rawBunniesBalance, rawLxpBalance] = await Promise.all([
    publicClient.readContract({
      abi: erc721Abi,
      address: BunnyUniverseContract,
      functionName: "balanceOf",
      args: [addr],
    }),
    publicClient.readContract({
      abi: erc20Abi,
      address: LxpContract,
      functionName: "balanceOf",
      args: [addr],
    }),
  ]);

  return {
    bunniesBalance: Number(rawBunniesBalance),
    lxpBalance: Number(rawLxpBalance),
  };
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

  return { days, weeks, months };
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
  const { days, weeks, months } = computePeriods(token.ownedSince);

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

  return {
    tokenId: token.id,
    score: Math.floor(score),
    days,
    weeks,
    months,
    earlyHolder: isEarlyHolder,
  };
};

const computeTotalScore = (tokensOwned: Token[], lxpOwned: number): Score => {
  const scores: TokenScore[] = [];
  let isLxpWhale = false;

  for (const token of tokensOwned) {
    scores.push(computeScore(token));
  }

  let totalScore = Math.floor(scores.reduce((a, b) => a + b.score, 0));

  // Collection Size Multiplier
  const collectorTierMultiplier = computeCollectorTierMultiplier(
    tokensOwned.length,
  );
  totalScore *= collectorTierMultiplier;

  // LXP Holder Multiplier
  if (lxpOwned > LXP_THRESHOLD) {
    totalScore *= LXP_MULTIPLIER;
    isLxpWhale = true;
  }

  return {
    total: Math.floor(totalScore),
    tokens: scores,
    collectorTierMultiplier,
    isLxpWhale,
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

    const { bunniesBalance, lxpBalance } = await getTokenBalances(address);
    checkTokenNumber(bunniesBalance);

    const tokensOwned = await getTokensOwned(address);
    checkTokensOwned(tokensOwned, bunniesBalance);

    const score = computeTotalScore(tokensOwned, lxpBalance);

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

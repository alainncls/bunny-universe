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
import { Score, Token, TokenScore } from "../dashboard/src/types";
import {
  Address,
  createPublicClient,
  erc20Abi,
  erc721Abi,
  getAddress,
  http,
  PublicClient,
} from "viem";
import { linea } from "viem/chains";

// Singleton viem client for better performance
let publicClientInstance: PublicClient | null = null;

function getPublicClient(): PublicClient {
  if (!publicClientInstance) {
    publicClientInstance = createPublicClient({
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
  }
  return publicClientInstance;
}

export const getTokenBalances = async (address: string) => {
  const publicClient = getPublicClient();

  const addr = getAddress(address.toLowerCase());

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

export const getMultipleTokensBalances = async (addresses: string[]) => {
  const publicClient = getPublicClient();

  const addrList: Address[] = addresses.map((address) =>
    getAddress(address.toLowerCase()),
  );

  const [rawBunniesBalances, rawLxpBalances] = await Promise.all([
    Promise.all(
      addrList.map((addr) =>
        publicClient.readContract({
          abi: erc721Abi,
          address: BunnyUniverseContract,
          functionName: "balanceOf",
          args: [addr],
        }),
      ),
    ),
    Promise.all(
      addrList.map((addr) =>
        publicClient.readContract({
          abi: erc20Abi,
          address: LxpContract,
          functionName: "balanceOf",
          args: [addr],
        }),
      ),
    ),
  ]);

  return addresses.reduce(
    (acc, address, index) => {
      acc[address] = {
        bunniesBalance: Number(rawBunniesBalances[index]),
        lxpBalance: Number(rawLxpBalances[index]),
      };
      return acc;
    },
    {} as Record<string, { bunniesBalance: number; lxpBalance: number }>,
  );
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
  if (tokensCount === 2) {
    return COLLECTOR_TIER_2_MULTIPLIER;
  } else if (tokensCount >= 3 && tokensCount <= 4) {
    return COLLECTOR_TIER_3_MULTIPLIER;
  } else if (tokensCount >= 5 && tokensCount <= 9) {
    return COLLECTOR_TIER_4_MULTIPLIER;
  } else if (tokensCount >= 10) {
    return COLLECTOR_TIER_5_MULTIPLIER;
  }
  return COLLECTOR_TIER_1_MULTIPLIER;
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

export const computeTotalScore = (
  tokensOwned: Token[],
  lxpOwned: number,
): Score => {
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

export type Token = {
  id: string;
  owner: string;
  ownedSince: string;
};

export type TokenScore = {
  tokenId: string;
  score: number;
  days: number;
  weeks: number;
  months: number;
  earlyHolder: boolean;
};

export type Score = {
  total: number;
  tokens: TokenScore[];
  collectorTierMultiplier: number;
  isLxpWhale: boolean;
};

export type ScoreEntity = Score & {
  holder: string;
  rank: number;
};

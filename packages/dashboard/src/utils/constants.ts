import { Address } from "viem";

// Contract addresses
export const BunnyUniverseContract: Address =
  "0x2375f81ccd6665ab606239e6602dbb601d35ec77";
export const LxpContract: Address =
  "0xd83af4fbD77f3AB65C3B1Dc4B38D7e67AEcf599A";

// Subgraph IDs
export const BUNNY_SUBGRAPH_ID = "E99RzE1iK71GUk1qndxGTwZgpqYaF3boA1faZ4pCjrSw";
export const LINEA_ENS_SUBGRAPH_ID =
  "G5YH6BWrybbfua5sngRQ7Ku1LRCVx4qf5zjkqWG9FSuV";

// Score calculation constants
export const DAILY_POINTS = 1250;
export const WEEKLY_MULTIPLIER = 1.5;
export const EARLY_HOLDER_MULTIPLIER = 1.1;
export const COLLECTOR_TIER_1_MULTIPLIER = 1;
export const COLLECTOR_TIER_2_MULTIPLIER = 1.2;
export const COLLECTOR_TIER_3_MULTIPLIER = 1.4;
export const COLLECTOR_TIER_4_MULTIPLIER = 1.6;
export const COLLECTOR_TIER_5_MULTIPLIER = 2;
export const MINTING_DAY = 1734825599;
export const MONTHLY_BONUS = 5000;
export const LXP_THRESHOLD = 2000;
export const LXP_MULTIPLIER = 1.02;

// GraphQL queries
export const TOKENS_QUERY = `
  query GetTokens($address: String!) {
    tokens(where: { owner: $address }) {
      id
      owner
      ownedSince
    }
  }
`;

export const ALL_TOKENS_QUERY = `
  query GetTokens($skip: Int!) {
    tokens(first: 1000, skip: $skip) {
      id
      owner
      ownedSince
    }
  }
`;

export const LINEA_ENS_QUERY = `
  query getNamesForAddress($address: String!) {
    domains(first: 1, where: {and: [{or: [{owner: $address}, {registrant: $address}, {wrappedOwner: $address}]}, {parent_not: "0x91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e2"}, {or: [{expiryDate_gt: "1721033912"}, {expiryDate: null}]}, {or: [{owner_not: "0x0000000000000000000000000000000000000000"}, {resolver_not: null}, {and: [{registrant_not: "0x0000000000000000000000000000000000000000"}, {registrant_not: null}]}]}]}) {
      name
    }
  }
`;

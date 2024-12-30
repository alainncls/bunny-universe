import axios from "axios";
import { isAddress } from "viem";
import { config } from "dotenv";
import { Token } from "../dashboard/src/types";
import { computeTotalScore, getTokenBalances } from "./score";

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

export async function handler(event: {
  queryStringParameters: { address: string };
  body: string;
  httpMethod: string;
}) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  } else if (event.httpMethod === "GET") {
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

  return {
    statusCode: 500,
    headers,
    body: JSON.stringify({ error: "Method not supported" }),
  };
}

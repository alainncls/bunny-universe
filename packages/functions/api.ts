import axios from "axios";
import { isAddress } from "viem";
import { config } from "dotenv";
import { ScoreEntity, Token } from "../dashboard/src/types";
import { computeTotalScore, getTokenBalances } from "./score";
import { MongoClient, ServerApiVersion } from "mongodb";

config({ path: ".env" });

const {
  NEXT_PUBLIC_INFURA_ID,
  DB_USER,
  DB_PASSWORD,
  DB_URL,
  DB_NAME,
  DB_COLLECTION,
} = process.env;

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const checkConfig = () => {
  if (
    !NEXT_PUBLIC_INFURA_ID ||
    !DB_USER ||
    !DB_PASSWORD ||
    !DB_URL ||
    !DB_NAME ||
    !DB_COLLECTION
  ) {
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

const getRanks = async (address: string) => {
  const dbUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}`;
  const client = new MongoClient(dbUri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  let rankResult: ScoreEntity | null = null;
  let top10Results: ScoreEntity[] = [];

  try {
    await client.connect();
    rankResult = await client
      .db(DB_NAME)
      .collection(DB_COLLECTION!)
      .findOne<ScoreEntity>({ holder: address.toLowerCase() });
    top10Results = await client
      .db(DB_NAME)
      .collection(DB_COLLECTION!)
      .find<ScoreEntity>({}, { sort: { total: -1 }, limit: 10 })
      .toArray();
  } catch (error) {
    console.error("Error fetching ranks", error);
  } finally {
    await client.close();
  }

  return { rank: rankResult?.rank, top10: top10Results };
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

      const { rank, top10 } = await getRanks(address);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ score: { ...score, rank, top10 } }),
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

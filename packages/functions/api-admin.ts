import { config } from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import axios from "axios";
import { Score, ScoreEntity, Token } from "../dashboard/src/types";
import { computeTotalScore, getTokenBalances } from "./score";

config({ path: ".env" });

const { DB_USER, DB_PASSWORD, DB_URL, DB_NAME, DB_COLLECTION, BUNNY_API_KEY } =
  process.env;

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const checkConfig = () => {
  if (
    !DB_USER ||
    !DB_PASSWORD ||
    !DB_URL ||
    !DB_NAME ||
    !DB_COLLECTION ||
    !BUNNY_API_KEY
  ) {
    throw new Error("Configuration not set");
  }
};

const fetchTokens = async (skip: number) => {
  const response = await axios.post(
    "https://api.studio.thegraph.com/query/67521/bunny-universe/version/latest",
    {
      query: `
            query GetTokens($skip: Int!) {
              tokens(first: 1000, skip: $skip) {
                id
                owner
                ownedSince
              }
            }
          `,
      variables: {
        skip,
      },
    },
  );

  return response.data.data.tokens;
};

const getAllTokens = async () => {
  const limit = 1000;
  const calls = [0, 1, 2].map((i) => fetchTokens(i * limit));
  const results = await Promise.all(calls);
  return results.flat();
};

const processHolders = async (
  holders: Record<string, Token[]>,
  logWithTime: (message: string) => void,
) => {
  const scores: Record<string, Score> = {};
  const holderEntries = Object.entries(holders);

  for (let i = 0; i < holderEntries.length; i += 100) {
    const batch = holderEntries.slice(i, i + 100);
    await Promise.all(
      batch.map(async ([holder, tokens]) => {
        const { bunniesBalance, lxpBalance } = await getTokenBalances(holder);

        if (bunniesBalance !== tokens.length) {
          console.error(`Token count mismatch for ${holder}`);
          return;
        }

        scores[holder] = computeTotalScore(tokens, lxpBalance);
      }),
    );
  }

  logWithTime(`Computed scores for ${Object.keys(scores).length} holders`);
  return scores;
};

export async function handler(event: {
  queryStringParameters: { bunnyApiKey: string };
  httpMethod: string;
}) {
  const startTime = Date.now();

  const logWithTime = (message: string) => {
    const elapsedTime = Date.now() - startTime;
    console.log(`[${elapsedTime}ms] ${message}`);
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  } else if (event.httpMethod === "POST") {
    if (event.queryStringParameters?.bunnyApiKey !== BUNNY_API_KEY) {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ error: "Invalid API key" }),
      };
    }

    checkConfig();

    const dbUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}`;

    const client = new MongoClient(dbUri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    try {
      // Fetch all tokens
      const allTokens = await getAllTokens();
      logWithTime(`Fetched ${allTokens.length} tokens`);

      // Extract all tokens owned for each unique holder
      const holders: Record<string, Token[]> = {};
      for (const token of allTokens) {
        if (!holders[token.owner]) {
          holders[token.owner] = [];
        }
        holders[token.owner].push(token);
      }

      logWithTime(`Found ${Object.keys(holders).length} unique holders`);

      // Compute all scores
      const scores = await processHolders(holders, logWithTime);

      // Convert scores to array and compute ranking for each holder
      const scoresArray: ScoreEntity[] = Object.entries(scores)
        .map(([holder, score]) => ({
          holder,
          ...score,
        }))
        .sort((a, b) => b.total - a.total)
        .map((score, index) => ({
          ...score,
          rank: index + 1,
        }));

      logWithTime(`Ranked ${scoresArray.length} scores`);

      // Connect to MongoDB
      await client.connect();
      logWithTime("Connected to MongoDB");

      // Drop old scores
      await client.db(DB_NAME).collection(DB_COLLECTION!).drop();
      logWithTime("Dropped old scores");

      // Save new scores
      await client
        .db(DB_NAME)
        .collection(DB_COLLECTION!)
        .insertMany(scoresArray);
      logWithTime("Saved new scores");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: errorMessage }),
      };
    } finally {
      await client.close();
    }
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ ok: true }),
  };
}

import { Address } from "viem";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistance } from "date-fns";
import { Score, Token } from "@/types";
import NftCard from "@/components/NftCard";

type DisplayTokensProps = {
  address: Address;
  score: Score;
};

export default function DisplayTokens({ address, score }: DisplayTokensProps) {
  const [tokensHeld, setTokensHeld] = useState<Token[]>();

  useEffect(() => {
    async function fetchTokens() {
      try {
        const response = await axios.post(
          `https://gateway.thegraph.com/api/${process.env.NEXT_PUBLIC_THE_GRAPH_API_KEY}/subgraphs/id/E99RzE1iK71GUk1qndxGTwZgpqYaF3boA1faZ4pCjrSw`,
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
        const tokens = response.data.data.tokens;
        setTokensHeld(tokens);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    }

    fetchTokens();
  }, [address]);

  const gridClasses =
    tokensHeld && tokensHeld.length < 3
      ? "flex flex-wrap justify-center items-center gap-4"
      : "grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4";

  return (
    <div className={gridClasses}>
      {tokensHeld?.map((token) => {
        const tokenScore = score.tokens.find((t) => t.tokenId === token.id);
        return tokenScore ? (
          <NftCard
            key={token.id}
            tokenId={token.id}
            imageUrl={`https://nftstorage.link/ipfs/QmPt2vS2bsz5JoRHNh6P8VK93Jzfi9XPpP7JjBzPd8Hnod/${token.id}.png`}
            ownedSince={formatDistance(
              new Date(parseInt(token.ownedSince) * 1000),
              new Date(),
              { addSuffix: true },
            )}
            score={tokenScore}
          />
        ) : null;
      })}
    </div>
  );
}

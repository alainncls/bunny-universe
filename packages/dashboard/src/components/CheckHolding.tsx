import { Address } from "viem";
import { useEffect, useState } from "react";
import axios from "axios";
import { Token } from "@/types";

type CheckHoldingProps = {
  address: Address;
};

export default function CheckHolding({ address }: CheckHoldingProps) {
  const [tokensHeld, setTokensHeld] = useState<Token[]>();

  useEffect(() => {
    async function fetchTokens() {
      try {
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
        const tokens = response.data.data.tokens;
        setTokensHeld(tokens);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    }

    fetchTokens();
  }, [address]);

  return (
    <ul key={"ul"}>
      {tokensHeld?.map((token) => (
        <li key={token.id}>
          #
          <a
            href={`https://element.market/assets/linea/0x2375f81ccd6665ab606239e6602dbb601d35ec77/${token.id}`}
            target={"_blank"}
            rel={"noopener noreferrer"}
            className={"underline"}
          >
            {token.id}
          </a>{" "}
          since {new Date(parseInt(token.ownedSince) * 1000).toUTCString()}
        </li>
      ))}
    </ul>
  );
}

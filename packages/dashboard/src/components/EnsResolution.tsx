"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Address } from "viem";
import { useEnsName } from "wagmi";
import { mainnet } from "wagmi/chains";
import { LINEA_ENS_SUBGRAPH_ID, LINEA_ENS_QUERY } from "@/utils/constants";

type EnsResolutionProps = {
  address: Address;
};

export default function EnsResolution({ address }: EnsResolutionProps) {
  const [lineaEnsName, setLineaEnsName] = useState<string | null>(null);

  useEffect(() => {
    const fetchLineaEnsName = async () => {
      try {
        const res = await axios.post(
          `https://gateway-arbitrum.network.thegraph.com/api/${process.env.NEXT_PUBLIC_THE_GRAPH_API_KEY}/subgraphs/id/${LINEA_ENS_SUBGRAPH_ID}`,
          {
            query: LINEA_ENS_QUERY,
            variables: {
              address: address.toLowerCase(),
            },
          },
        );
        const domains = res.data?.data?.domains;
        setLineaEnsName(domains?.[0]?.name || null);
      } catch (error) {
        console.error("Error fetching Linea ENS name:", error);
      }
    };

    fetchLineaEnsName();
  }, [address]);

  const mainnetResult = useEnsName({
    address,
    chainId: mainnet.id,
  });

  return lineaEnsName
    ? lineaEnsName
    : mainnetResult?.data
      ? mainnetResult.data
      : address.slice(0, 6) + "..." + address.slice(-4);
}

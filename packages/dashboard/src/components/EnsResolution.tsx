import { useEffect, useState } from "react";
import axios from "axios";
import { Address } from "viem";
import { useEnsName } from "wagmi";
import { mainnet } from "wagmi/chains";

type EnsResolutionProps = {
  address: Address;
};

export default function EnsResolution({ address }: EnsResolutionProps) {
  const [lineaEnsName, setLineaEnsName] = useState<string | null>(null);

  useEffect(() => {
    const fetchLineaEnsName = async () => {
      try {
        const res = await axios.post(
          `https://gateway-arbitrum.network.thegraph.com/api/649414afdd14301c7a2f6d141f717ed1/subgraphs/id/G5YH6BWrybbfua5sngRQ7Ku1LRCVx4qf5zjkqWG9FSuV`,
          {
            query: `query getNamesForAddress {domains(first: 1, where: {and: [{or: [{owner: \"${address.toLowerCase()}\"}, {registrant: \"${address.toLowerCase()}\"}, {wrappedOwner: \"${address.toLowerCase()}\"}]}, {parent_not: \"0x91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e2\"}, {or: [{expiryDate_gt: \"1721033912\"}, {expiryDate: null}]}, {or: [{owner_not: \"0x0000000000000000000000000000000000000000\"}, {resolver_not: null}, {and: [{registrant_not: \"0x0000000000000000000000000000000000000000\"}, {registrant_not: null}]}]}]}) {...DomainDetailsWithoutParent}} fragment DomainDetailsWithoutParent on Domain {name}`,
          },
        );
        setLineaEnsName(res.data.data.domains[0]?.name || null);
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

import { useReadContract } from "wagmi";
import { Address, erc721Abi } from "viem";
import { BunnyUniverseContract } from "@/utils/constants";

type CheckOwnershipProps = {
  address: Address;
};

export default function CheckOwnership({ address }: CheckOwnershipProps) {
  const { data: balance, isLoading } = useReadContract({
    abi: erc721Abi,
    address: BunnyUniverseContract,
    functionName: "balanceOf",
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {balance && balance > 0 ? (
        <p>You own {balance.toString()} NFTs</p>
      ) : (
        <p>No NFTs owned</p>
      )}
    </div>
  );
}

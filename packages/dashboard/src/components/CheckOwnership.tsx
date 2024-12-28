import { useReadContract } from "wagmi";
import { Address, erc721Abi } from "viem";
import { BunnyUniverseContract } from "@/utils/constants";
import { Card } from "flowbite-react";

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
      <Card className="max-w-sm mx-auto text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          <p>🐇</p>
          {balance && balance > 0
            ? `You own ${balance.toString()} ${balance === BigInt(1) ? "bunny" : "bunnies"}!`
            : "You don't have any bunny..."}
        </h3>
      </Card>
    </div>
  );
}

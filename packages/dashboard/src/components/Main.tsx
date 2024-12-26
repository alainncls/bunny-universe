"use client";
import CheckOwnership from "@/components/CheckOwnership";
import { useAccount } from "wagmi";
import CheckHolding from "@/components/CheckHolding";

export default function Main() {
  const { isConnected, address } = useAccount();
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      {isConnected && address ? (
        <>
          <CheckOwnership address={address} />
          <CheckHolding address={address} />
        </>
      ) : (
        <span>Connect your wallet to get started</span>
      )}
    </main>
  );
}

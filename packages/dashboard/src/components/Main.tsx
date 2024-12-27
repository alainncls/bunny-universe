"use client";
import { useAccount } from "wagmi";
import CheckOwnership from "@/components/CheckOwnership";
import CheckHolding from "@/components/CheckHolding";
import CheckScore from "./CheckScore";
import Faq from "@/components/Faq";
import { WalletButton } from "@/components/WalletButton";

interface MainProps {
  className?: string;
}

export default function Main({ className }: MainProps) {
  const { isConnected, address } = useAccount();
  return (
    <main
      className={`flex flex-col gap-8 row-start-2 items-center sm:items-start ${className}`}
    >
      {isConnected && address ? (
        <div className="min-h-screen flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <WalletButton />
          <CheckOwnership address={address} />
          <CheckScore address={address} />
          <CheckHolding address={address} />
        </div>
      ) : (
        <WalletButton />
      )}
      <div className="w-full max-w-2xl mx-auto sm:w-1/2">
        <Faq />
      </div>
    </main>
  );
}

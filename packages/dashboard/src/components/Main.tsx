"use client";
import { useAccount } from "wagmi";
import CheckOwnership from "@/components/CheckOwnership";
import DisplayTokens from "@/components/DisplayTokens";
import Faq from "@/components/Faq";
import WalletButton from "@/components/WalletButton";
import { useEffect, useState } from "react";
import axios from "axios";
import TotalScore from "@/components/TotalScore";
import { Score } from "@/types";
import { Spinner } from "flowbite-react";

interface MainProps {
  className?: string;
}

export default function Main({ className }: MainProps) {
  const { isConnected, address } = useAccount();
  const [score, setScore] = useState<Score>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchScore() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}${address}`,
        );
        const score = response.data.score;
        setScore(score);
      } catch (error) {
        console.error("Error fetching score:", error);
      } finally {
        setIsLoading(false);
      }
    }

    setIsLoading(true);
    fetchScore();
  }, [address]);

  return (
    <main
      className={`flex flex-col gap-8 items-center sm:items-start ${className}`}
    >
      {isLoading ? (
        <>
          <WalletButton />
          <Spinner aria-label="Loader spinner" size="xl" />
          <div className="w-full max-w-2xl mx-auto sm:w-1/2">
            <Faq />
          </div>
        </>
      ) : (
        <>
          {isConnected && address && score ? (
            <div className="min-h-screen flex flex-col gap-8 items-center sm:items-start">
              <WalletButton />
              <CheckOwnership address={address} />
              <TotalScore score={score} />
              <DisplayTokens address={address} score={score} />
            </div>
          ) : (
            <WalletButton />
          )}
          <div className="w-full max-w-2xl mx-auto sm:w-1/2">
            <Faq />
          </div>
        </>
      )}
    </main>
  );
}

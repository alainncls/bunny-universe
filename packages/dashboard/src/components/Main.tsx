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
import { Alert, Spinner } from "flowbite-react";

interface MainProps {
  className?: string;
}

export default function Main({ className }: MainProps) {
  const { isConnected, address } = useAccount();
  const [score, setScore] = useState<Score>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchScore() {
      setError(null);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}${address}`,
        );
        const score = response.data.score;
        setScore(score);
      } catch (error) {
        const errorMessage =
          axios.isAxiosError(error) && error.response?.data?.error
            ? error.response.data.error
            : "Failed to fetch your score. Please try again later.";
        setError(errorMessage);
        console.error("Error fetching score:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (address) {
      setIsLoading(true);
      setScore(undefined);
      fetchScore();
    } else {
      setScore(undefined);
      setError(null);
    }
  }, [address]);

  return (
    <main className={`flex flex-col gap-8 items-center w-full ${className}`}>
      {isLoading ? (
        <>
          <WalletButton />
          <Spinner aria-label="Loader spinner" size="xl" />
          <div className="w-full max-w-2xl mx-auto">
            <Faq />
          </div>
        </>
      ) : (
        <>
          {error && (
            <div className="w-full max-w-md mx-auto">
              <Alert color="failure">
                <span className="font-medium">Error:</span> {error}
              </Alert>
            </div>
          )}
          {isConnected && address && score ? (
            <div className="min-h-screen flex flex-col gap-8 items-center">
              <WalletButton />
              <CheckOwnership address={address} />
              <TotalScore score={score} />
              <DisplayTokens address={address} score={score} />
            </div>
          ) : (
            <WalletButton />
          )}
          <div className="w-full max-w-2xl mx-auto">
            <Faq />
          </div>
        </>
      )}
    </main>
  );
}

import { Address } from "viem";
import { useEffect, useState } from "react";
import axios from "axios";

type CheckHoldingProps = {
  address: Address;
};

export default function CheckHolding({ address }: CheckHoldingProps) {
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    async function fetchScore() {
      try {
        const response = await axios.post(
          `https://bunny.alainnicolas.fr/.netlify/functions/api?address=${address}`,
        );
        const score = response.data.score;
        setScore(score);
      } catch (error) {
        console.error("Error fetching score:", error);
      }
    }

    fetchScore();
  }, [address]);

  return score > 0 ? <span>🥕 Your $CARROT points: {score}</span> : null;
}

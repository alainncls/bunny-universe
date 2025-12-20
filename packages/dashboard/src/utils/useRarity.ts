import { useState, useEffect } from "react";
import { Rarity } from "@/types";

let rarityCache: Map<number, Rarity> | null = null;
let loadingPromise: Promise<Map<number, Rarity>> | null = null;

async function loadRarityData(): Promise<Map<number, Rarity>> {
  if (rarityCache) return rarityCache;

  if (loadingPromise) return loadingPromise;

  loadingPromise = fetch("/rarity.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to load rarity data: ${res.status}`);
      }
      return res.json();
    })
    .then((data: Rarity[]) => {
      rarityCache = new Map(data.map((item) => [item.token_id, item]));
      return rarityCache;
    })
    .catch((error) => {
      console.error("Error loading rarity data:", error);
      loadingPromise = null; // Allow retry on error
      return new Map<number, Rarity>();
    });

  return loadingPromise;
}

export function useRarity(tokenId: string): Rarity | undefined {
  const [rarity, setRarity] = useState<Rarity | undefined>(undefined);

  useEffect(() => {
    loadRarityData().then((cache) => {
      setRarity(cache.get(parseInt(tokenId)));
    });
  }, [tokenId]);

  return rarity;
}

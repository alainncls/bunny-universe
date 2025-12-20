"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";

// Dynamic import with ssr: false to prevent indexedDB error on server
const Web3Provider = dynamic(
  () => import("@/app/Web3Provider").then((mod) => mod.Web3Provider),
  {
    ssr: false,
  },
);

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <Web3Provider>{children}</Web3Provider>;
}

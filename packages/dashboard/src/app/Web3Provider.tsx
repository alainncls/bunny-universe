import { ReactNode } from "react";
import { http, WagmiProvider } from "wagmi";
import { linea, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

interface Web3ProviderProps {
  children: ReactNode;
}

const config = getDefaultConfig({
  chains: [linea, mainnet],
  transports: {
    [linea.id]: http(
      `https://linea-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    ),
    [mainnet.id]: http(
      `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    ),
  },

  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",

  appName: "Bunny Universe",
  appDescription: "Bunny Universe Dashboard",
  appUrl: "https://earncarrot.bunnyuniverse.xyz",
  appIcon: "https://earncarrot.bunnyuniverse.xyz/logo.png",
});
const queryClient = new QueryClient();

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()} initialChain={linea}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

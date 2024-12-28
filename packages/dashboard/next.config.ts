import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nftstorage.link", //https://nftstorage.link/ipfs/
        port: "",
        pathname: "/ipfs/QmPt2vS2bsz5JoRHNh6P8VK93Jzfi9XPpP7JjBzPd8Hnod/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;

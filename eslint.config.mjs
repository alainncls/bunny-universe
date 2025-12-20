import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [
      "packages/subgraph/generated/",
      "packages/dashboard/.next/",
      "packages/functions/.netlify/",
    ],
  },
  {
    settings: {
      next: {
        rootDir: "packages/dashboard/",
      },
    },
  },
];

export default eslintConfig;

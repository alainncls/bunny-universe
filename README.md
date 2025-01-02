<h1 align="center" style="margin-top: 0; margin-bottom: 0">
  <a href="https://earncarrot.bunnyuniverse.xyz/"><img src="https://raw.githubusercontent.com/alainncls/bunny-universe/refs/heads/main/packages/dashboard/public/logo.png" alt="Bunny Universe Logo" height="150px" width="150px"></a>
  <br>
  Bunny Universe 🐇  
  <br>
  Earn $CARROT 🥕
</h1>

<div align="center">

[![Netlify Status](https://api.netlify.com/api/v1/badges/1ceebfe2-dcd2-4a82-8de7-ee4ee6fd8bb7/deploy-status)](https://app.netlify.com/sites/bunny-universe/deploys)

</div>

This monorepo groups the components of the Bunny Universe points system.  
The system is designed to reward users with $CARROT&nbsp;🥕 for holding Bunny Universe NFTs and contributing to the Bunny
Universe ecosystem.

## Components

### Subgraph&nbsp;🔎

In the `packages/subgraph` directory, you can find the subgraph that indexes Bunny Universe smart contract events.  
It keeps track of all the events relevant to the points system, specifically the `Transfer` events.

The subgraph is hosted
on [The Graph Studio](https://thegraph.com/explorer/subgraphs/E99RzE1iK71GUk1qndxGTwZgpqYaF3boA1faZ4pCjrSw?view=Query&chain=arbitrum-one).  
You can query it using
the [GraphQL Playground](https://api.studio.thegraph.com/query/67521/bunny-universe/version/latest).

### Backend&nbsp;⚙️

The backend for the points system API is in the `packages/functions` directory.  
It is hosted on [Netlify](https://app.netlify.com/).

It includes two main endpoints:

- `GET /api?address=0x...`: Computes and returns the points of a given address.
- `POST /api-admin`: Computes and updates the scores of all addresses holding Bunny Universe NFTs.

### Dashboard&nbsp;🖥️

The dashboard, located in `packages/dashboard`, displays the points of Bunny Universe users.  
It is hosted on [Netlify](https://app.netlify.com/) and accessible
at [earncarrot.bunnyuniverse.xyz](https://earncarrot.bunnyuniverse.xyz/).

Once users connect their wallet, they can view their points, and the leaderboard.  
The dashboard also provides a detailed breakdown of points per NFT.

## Development

### Prerequisites

- **Node.js** (>= 18.18)
- **MongoDB instance** (can be a free tier on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation

Install dependencies using `pnpm`:

```bash
pnpm i
```

### Running the project

1. Add backend secrets:
   Copy packages/functions/.env.example to packages/functions/.env and fill in the secrets.
2. Start the backend
   ```bash
   cd packages/functions && pnpm run functions:serve
   ```
3. Add frontend secrets:
   Copy packages/dashboard/.env.example to packages/dashboard/.env and fill in the secrets.
4. Start the dashboard:
   ```bash
   cd packages/dashboard && pnpm run dev
   ```
5. Open the dashboard in your browser: [localhost:3000](http://localhost:3000)

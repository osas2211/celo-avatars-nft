## CELO AVATAR NFTS
This is an NFT DApp that allows you to create Avatar NFTs, and uploads them to IPFS, and also allows you to share the cool celo avatar nfts you create with your friends.

This DApp utilises CSS for the creation of the avatar and it's a  It also uses react-redux for the sharing of state for each file. 

The contract abi and address can be found in the ./utils/contract folder.
All components are in the ./components folder.
The main page is in the pages folder.

## 1. Tech Stack
This boilerplate uses the following tech stack:
- [React](https://reactjs.org/) and [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) - JavaScript libraries for building user interfaces.
- [Redux](https://react-redux.js.org/introduction/getting-started) - for state sharing
- [use-Contractkit](contractkit
) - A frontend library for interacting with the Celo blockchain.
- [Hardhat](https://hardhat.org/) - A tool for writing and deploying smart contracts.


## 2. Getting Started



## 2. Quick Start

To get this project up running locally, follow these simple steps:

### 2.1 Clone the repository:

```bash
git clone https://github.com/osas2211/celo-avatars-nft.git
```

### 2.2 Navigate to the directory:

```bash
cd celo-avatars-nft
```

### 2.3 Install the dependencies:

```bash
npm install
```

### 2.4 Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

#### Note:
To properly test the dapp you will need to have a Celo wallet with testnet tokens.
This learning module [NFT Contract Development with Hardhat](https://hackmd.io/exuZTH2hTqKytn2vxgDmcg) will walk you through the process of creating a Metamask wallet and claiming Alfajores testnet tokens.

## 3. Smart-Contract Deployment

### 3.1 Compile the smart contract

```bash
npx hardhat compile
```

### 3.2 Run tests on smart contract

```bash
npx hardhat test
```

### 3.3 Update env file

- Create a file in the root directory called ".env"
- Create a key called ACCOUNTKEY and paste in your private key. e.g

```js
ACCONTKEY = "...";
```
You can find more details about the whole process in the Dacade [NFT Contract Development with Hardhat](https://hackmd.io/exuZTH2hTqKytn2vxgDmcg) learning module. It will also show you how to get testnet tokens for your account so you can deploy your smart contract in the next step.

### 3.5 Deploy the smart contract to the Celo testnet Aljafores

```bash
npx hardhat run --network alfajores scripts/deploy.js
```
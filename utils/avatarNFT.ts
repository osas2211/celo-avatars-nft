import { create as ipfsHttpClient } from "ipfs-http-client";
import axios from "axios";
import { Contract } from "web3-eth-contract"
import celoAvatarContractAddress from "./contracts/CeloAvatars-address.json";
import { BigNumber } from "ethers";
import { nonWhiteSpace } from "html2canvas/dist/types/css/syntax/parser";

export interface meta {
    index: number,
    ipfsImage: string,
    attributes: attr[],
}

interface attr {
    key: string,
    value: string
}
// initialize IPFS
const client = ipfsHttpClient({ url: "https://ipfs.infura.io:5001/api/v0" });

// function to upload a file to IPFS
export const uploadToIpfs = async (file: string) => {
    if (!file) return;
    try {
        const added = await client.add(file, {
            progress: (prog) => console.log(`received: ${prog}`),
        });
        return `https://ipfs.infura.io/ipfs/${added.path}`;
    } catch (error) {
        console.log("Error uploading file: ", error);
    }
};

export const createNft = async (
    celoAvatarContract: Contract,
    performActions: Function,
    params: { metadata: object }
) => {
    //@ts-ignore
    await performActions(async (kit) => {
        const { metadata } = params;
        const { defaultAccount } = kit;

        // convert NFT metadata to JSON format
        const data = JSON.stringify(metadata);

        try {
            // save NFT metadata to IPFS
            const added = await client.add(data);

            // IPFS url for uploaded metadata
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;

            // mint the NFT and save the IPFS url to the blockchain
            let transaction = await celoAvatarContract.methods
                .safeMint(defaultAccount, url)
                .send({ from: defaultAccount });

            return transaction;
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    });
};

export const approve = async (
    IECR20Contract: Contract,
    performActions: Function,
    params: { mintFee: string }
) => {
    try {
        const { mintFee } = params;
        const mintingFee = BigNumber.from(mintFee);
        //@ts-ignore
        await performActions(async (kit) => {
            const { defaultAccount } = kit;
            await IECR20Contract.methods
                .approve(celoAvatarContractAddress.cAVT, mintingFee)
                .send({ from: defaultAccount });
            return true;
        });
    } catch (e) {
        console.log({ e });
    }
};

export const getMintingFee = async (celoAvatarContract: Contract) => {
    try {
        if (!celoAvatarContract.methods) {
            return null;
        }
        const mintFee = await celoAvatarContract.methods.getMintingFee().call();
        return mintFee
    } catch (e) {
        console.log({ e });
    }
};

// get the no of minted nfts
export const getTotalMintedNFTs = async (celoAvatarContract: Contract) => {
    try {
        if (!celoAvatarContract.methods) {
            return null;
        }
        const totalSupply = await celoAvatarContract.methods.totalSupply().call();
        return totalSupply;
    } catch (e) {
        console.log({ e });
    }
};

// get the metedata for an NFT from IPFS
export const fetchNftMeta = async (ipfsUrl: string) => {
    try {
        if (!ipfsUrl) return null;
        const meta = await axios.get(ipfsUrl);
        return meta;
    } catch (e) {
        console.log({ e });
    }
};

// fetch all user owned NFTs on the smart contract
export const getUserNfts = async (celoAvatarContract: Contract, params: { address: string }) => {
    try {
        const nfts = [];
        const { address } = params;
        const userNfts = await celoAvatarContract.methods.getTokenIdsByOwner(address).call();
        for (let i = 0; i < userNfts.length; i++) {
            const nft = new Promise(async (resolve) => {
                const tokenID = userNfts[i];
                const res = await celoAvatarContract.methods.tokenURI(tokenID).call();
                const meta = await fetchNftMeta(res);
                resolve({
                    index: i,
                    attributes: sortAttributes(meta?.data.attributes),
                    ipfsImage: meta?.data.ipfsImage,
                });
            });
            nfts.push(nft);
        }
        return Promise.all(nfts);
    } catch (e) {
        console.log({ e });
    }
};

const sortAttributes = (attributes: any) => {
    const formattedAttributes: attr[] = [];
    for (let _key in attributes) {
        const newObject = { "key": _key, "value": attributes[_key] }
        formattedAttributes.push(newObject);
    }
    return formattedAttributes
}
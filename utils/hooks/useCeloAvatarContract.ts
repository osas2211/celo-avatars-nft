import { useContract } from './useContract';
import celoAvatarAbi from '../contracts/CeloAvatars.json';
import celoAvatarContractAddress from '../contracts/CeloAvatars-address.json';
import { AbiItem } from 'web3-utils';


// export interface for NFT contract
export const useCeloAvatarContract = () => useContract(celoAvatarAbi.abi as AbiItem[], celoAvatarContractAddress.cAVT);
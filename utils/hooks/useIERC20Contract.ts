import { useContract } from "./useContract";
import IERC20Token from "../contracts/IERC20.json";
import IERC20TokenAddress from "../contracts/IERC20TokenAddress.json";
import { AbiItem } from 'web3-utils';


// export interface for smart contract
export const useIERC20Contract = () =>
  useContract(IERC20Token.abi as AbiItem[], IERC20TokenAddress.cUSDToken);

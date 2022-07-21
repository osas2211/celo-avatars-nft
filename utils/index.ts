import BigNumber from "bignumber.js";
import { ERC20_DECIMALS } from "./constants";

// format a wallet address
export const truncateAddress = (address: string) => {
    if (!address) return
    return address.slice(0, 5) + "..." + address.slice(address.length - 4, address.length);
}

// convert from big number
export const formatBigNumber = (num: BigNumber | undefined) => {
    if (!num) return
    const bN = new BigNumber(num);
    return bN.shiftedBy(-ERC20_DECIMALS).toFixed(2);
}
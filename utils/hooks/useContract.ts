import { useState, useEffect, useCallback } from 'react';
import { useContractKit } from '@celo-tools/use-contractkit';
import { AbiItem } from 'web3-utils';
import { Contract } from "web3-eth-contract"

export const useContract = (abi: AbiItem[], contractAddress: string) => {
  const { getConnectedKit, address } = useContractKit();
  const [contract, setContract] = useState({});

  const getContract = useCallback(async () => {
    const kit = await getConnectedKit();

    const contract = new kit.web3.eth.Contract(abi, contractAddress);

    // get a contract interface to interact with
    setContract(contract);
  }, [getConnectedKit, abi, contractAddress]);

  useEffect(() => {
    if (address) getContract();
  }, [address, getContract]);

  return contract as Contract;
};

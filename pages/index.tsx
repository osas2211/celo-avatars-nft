import type { NextPage } from 'next';
import { useState, useEffect, useCallback } from 'react';
import Cover from "../components/UI/Cover";
import {Notification} from "../components/UI/Notifications";
import Wallet from "../components/Wallet";
import {useBalance, useCeloAvatarContract} from "../utils/hooks";
import {useContractKit} from "@celo-tools/use-contractkit";
import coverImg from "../components/assets/img/celo-logo.png";
import {Nav} from "react-bootstrap";
import { AvatarNFT } from '../components/AvatarNFT';

const Home: NextPage = () => {
     /*
    address : fetch the connected wallet address
    destroy: terminate connection to user wallet
    connect : connect to the celo blockchain
     */
    const {address, destroy, connect} = useContractKit();

	const [addr, setAddr] = useState("");
	
    //  fetch user's celo balance using hook
	const { balance } = useBalance();
	
    // initialize the NFT mint contract
    const celoAvatarContract = useCeloAvatarContract();

  // Tweaking of State is via css values

  	useEffect(() => {
		if(address && celoAvatarContract){
			setAddr(address);
			
		}else{
			setAddr("")
		}
  	}, [address]);

	return (
		<>
			<Notification/>
		{addr ? (
			<>  
			<Nav>
				<header>
					<h2>
						Celo <span style={{ color: "#FCDC4D" }}>Avatar</span> NFTs
					</h2>
				</header>
			<Nav.Item className="justify-content-end pt-3 pb-5">
				{/*display user wallet*/}
				<Wallet
					address={address}
					amount={balance}
					symbol="cUSD"
					destroy={destroy}
				/>
			</Nav.Item>
			</Nav>	
				<AvatarNFT celoAvatarContract={celoAvatarContract}/>
			</>
		
		  ) : (
			  //  if user wallet is not connected display cover page
			<Cover name="Celo NFT Avatars" coverImg={coverImg.src} connect={connect}/>
		  )}
		
		</>
	)
}

export default Home

import React, { useRef, MutableRefObject, useState, useEffect } from "react"
import { toast } from "react-toastify";
import styles from "../../styles/btn.module.css"
import domtoimage from "dom-to-image"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import {useContractKit} from "@celo-tools/use-contractkit"
import { valuesParser } from "../../redux/avatarValueParser"
import { configI } from "../../redux/avatarValueParser"
import { Contract } from "web3-eth-contract"
import { createNft, uploadToIpfs, approve, getMintingFee, getUserNfts } from "../../utils/avatarNFT"
import { NotificationSuccess, NotificationError } from "../../components/UI/Notifications"
import { useIERC20Contract } from "../../utils/hooks/useIERC20Contract";

interface Props {
	celoAvatarContract: Contract;
}


export const GenerateNFT:React.FC<Props> = ({ celoAvatarContract }) => {

	const { performActions} = useContractKit();
	const IERC20Contract = useIERC20Contract();
	const [ipfsImage, setIpfs] = useState("");
	const [attributes, setAttributes] = useState({});

	const createNFT = async (metadata : object) => {

		let approved = false;
		// approve contract first
		try {
			// create an nft functionality
			const mintFee = await getMintingFee(celoAvatarContract);
			await approve(IERC20Contract, performActions, {mintFee}); 
			approved = true;
			toast(<NotificationSuccess text="Approval successful...."/>);
		  } catch (error) {
			approved = false;
			console.log({ error });
			toast(<NotificationError text="Please approve contract." />);
		}

		if(approved){
			try {
				// create an nft functionality
				await createNft(celoAvatarContract, performActions, {metadata}); 
				toast(<NotificationSuccess text="NFT created successfully...."/>);
			  } catch (error) {
				console.log({ error });
				toast(<NotificationError text="Failed to create an NFT." />);
			  } 
		}
	}

	const { body, head, clothes } = useSelector((state: RootState) => state)
	let configData: configI
	const downloadBtn: MutableRefObject<HTMLButtonElement | any> = useRef()	  

	const onGenerate = async () => {
		let node: any = document.querySelector("#canvas")
		domtoimage
			.toPng(node)
			.then(async function (dataUrl) {
				const ipfs = await uploadToIpfs(dataUrl)
				//@ts-ignore
				setIpfs(ipfs)
			})
			.catch(function (error) {
				console.error("oops, something went wrong!", error)
			})

		// generated data from avatar
		configData = { ...body, ...head, ...clothes } // MAKES MORE SENSE
		const parsedValues = valuesParser(configData)
		setAttributes(parsedValues);
	}

	useEffect(() => {
		if(ipfsImage){
			const meta = {
				"ipfsImage" : ipfsImage,
				attributes
			};
			createNFT(meta);
			setIpfs("");
			setAttributes({});
		}
  	}, [ipfsImage]);

	return (
		<div className={styles.download_share}>
			<h3>Generate</h3>
			<div>
				<button
					className={styles.button}
					ref={downloadBtn}
					onClick={onGenerate}
				>
					Generate Avatar
				</button>
			</div>
		</div>
	)
}

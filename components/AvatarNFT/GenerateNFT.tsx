import React, { useRef, MutableRefObject, useState, useEffect, useCallback } from "react"
import { toast } from "react-toastify"
import styles from "../../styles/btn.module.css"
import domtoimage from "dom-to-image"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useContractKit } from "@celo-tools/use-contractkit"
import { valuesParser } from "../../redux/avatarValueParser"
import { configI } from "../../redux/avatarValueParser"
import { Contract } from "web3-eth-contract"
import {
	createNft,
	uploadToIpfs,
	approve,
	getMintingFee,
} from "../../utils/avatarNFT"
import {
	NotificationSuccess,
	NotificationError,
} from "../../components/UI/Notifications"
import { useIERC20Contract } from "../../utils/hooks/useIERC20Contract"
import Link from "next/link"
import {  Spinner } from 'react-bootstrap';

interface Props {
	celoAvatarContract: Contract
	totalMinted: number | string
	mintingFee: number | string
}

export const GenerateNFT: React.FC<Props> = ({
	celoAvatarContract,
	totalMinted,
	mintingFee,
}) => {
	const { performActions } = useContractKit()
	const IERC20Contract = useIERC20Contract()
	const [ipfsImage, setIpfs] = useState("")
	const [attributes, setAttributes] = useState({})
	const [load, setLoad] = useState(false)
	const [updatedMint, setUpdatedMint] = useState(totalMinted);

	const createNFT = useCallback(async (metadata : object) => {
		//get mint fee
		const mintFee = await getMintingFee(celoAvatarContract);
		// approve contract first
		const approved = await approve(IERC20Contract, performActions, {mintFee}); 
		if(approved){
			toast(<NotificationSuccess text="Approval successful...."/>);
			//Mint NFT
			const success = await createNft(celoAvatarContract, performActions, {metadata}); 
			if(success){
				setUpdatedMint(Number(updatedMint) + 1);
				toast(<NotificationSuccess text="NFT created successfully...."/>);
			}else {
				toast(<NotificationError text="Failed to create an NFT." />);
			}
		}else{
			toast(<NotificationError text="Please approve contract." />);
		}
	}, [celoAvatarContract, IERC20Contract, performActions]);


	const { body, head, clothes } = useSelector((state: RootState) => state)
	let configData: configI
	const downloadBtn: MutableRefObject<HTMLButtonElement | any> = useRef()

	const onGenerate = async () => {
		let node: any = document.querySelector("#canvas")
		setLoad(true)
		domtoimage
			.toPng(node)
			.then(async function (dataUrl) {
				const ipfs = await uploadToIpfs(dataUrl)
				setLoad(false)
				//@ts-ignore
				setIpfs(ipfs)
			})
			.catch(function (error) {
				console.error("oops, something went wrong!", error)
			})

		// generated data from avatar
		configData = { ...body, ...head, ...clothes } // MAKES MORE SENSE
		const parsedValues = valuesParser(configData)

		setAttributes(parsedValues)
	}

	useEffect(() => {
		if (ipfsImage) {
			const meta = {
				ipfsImage: ipfsImage,
				attributes,
			}
			createNFT(meta)
			setIpfs("")
			setAttributes({})
		}
	}, [ipfsImage, createNFT, attributes])

	return (
		<div className={styles.download_share}>
			<div className={"fw-bold h6"}>
				<p>
					cAVT Total Mint Supply:{" "}
					<span style={{ fontSize: "1.3rem" }}>{updatedMint > Number(totalMinted)? updatedMint : totalMinted}</span>
				</p>
				<p>
					Minting FEE:{" "}
					<span style={{ fontSize: "1.3rem" }}>
						{(mintingFee as number) / 10 ** 18} cUSD
					</span>
				</p>
			</div>
			<h3>Generate</h3>
			<div>
				<button
					className={styles.button + " disabled"}
					ref={downloadBtn}
					onClick={onGenerate}
				>
					{load ? <> <span> Generating </span><Spinner animation="border" as="span" size="sm" role="status" aria-hidden="true" className="opacity-25"/> </> : "Generate Avatar"}
				</button>
			</div>
			<div className="link-btn ms-4 my-3 justify-content-center fw-bold">
				<Link href={"/nfts"}>View Your NFTs</Link>
			</div>
		</div>
	)
}

import Head from "next/head"
import styles from "../../styles/canvas.module.css"
import Options from "../Options/Options"
import { AvatarBody as Avatar } from "../FullBody"
import { GenerateNFT } from "./GenerateNFT"
import { motion } from "framer-motion"
import { Contract } from "web3-eth-contract"
import { useCallback, useEffect, useState } from "react"
import { useContractKit } from "@celo-tools/use-contractkit"
import Loader from "../UI/Loader"
import {
	getMintingFee,
	getTotalMintedNFTs,
} from "../../utils/avatarNFT"

interface Props {
	celoAvatarContract: Contract
}

export const AvatarNFT: React.FC<Props> = ({ celoAvatarContract }) => {
	const [loading, setLoading] = useState(false)
	const { address } = useContractKit()
	const [mintingFee, setMintingFee] = useState(null)
	const [totalMint, setTotalMint] = useState(null)
	
	const getMintFee = useCallback(async () => {
		// get the minting fee
		const MintingFee = await getMintingFee(celoAvatarContract)
		if(!MintingFee) return;
		console.log(MintingFee);
		//@ts-ignore
		setMintingFee(MintingFee)
	}, [])

	const getTotalMint = useCallback(async () => {
		// get the number of minted cAVT tokens
		const totalMinted = await getTotalMintedNFTs(celoAvatarContract)
		if(!totalMinted) return;
		console.log(totalMinted);
		//@ts-ignore
		setTotalMint(totalMinted)
	}, [])

	useEffect(() => {
		try {
			if (address && celoAvatarContract) {
				setLoading(true);
				getMintFee()
				getTotalMint()
				setLoading(false);
			}
		} catch (error) {
			console.log({ error })
		}
	}, [celoAvatarContract, address, getMintFee, getTotalMint])

	return (
		<>
			{!loading ? (
				<>
					<div className="playground">
						<motion.div
							className={styles.canvas}
							id={"canvas"}
							initial={{
								scale: 0,
							}}
							animate={{
								scale: 1,
							}}
							transition={{
								type: "spring",
								stiffness: 1000,
								duration: 1,
							}}
						>
							<Avatar />
						</motion.div>
						<Options />
						<GenerateNFT celoAvatarContract={celoAvatarContract} />
					</div>
				</>
			) : (
				<Loader />
			)}
		</>
	)
}

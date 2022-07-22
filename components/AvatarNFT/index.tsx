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
import { BigNumber } from "ethers"
import {
	getMintingFee,
	getTotalMintedNFTs,
	getUserNfts,
} from "../../utils/avatarNFT"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { fetchNfts } from "../../redux/slices/nftsSlice"

interface Props {
	celoAvatarContract: Contract
}

export const AvatarNFT: React.FC<Props> = ({ celoAvatarContract }) => {
	const [loading, setLoading] = useState(false)
	const { address } = useContractKit()
	const [userNfts, setUserNfts] = useState({})
	const [mintingFee, setMintingFee] = useState(null)
	const [totalMint, setTotalMint] = useState(null)
	const dispatch = useDispatch()

	const getUserAssets = useCallback(async () => {
		try {
			setLoading(true)
			// fetch all nfts from the smart contract
			//@ts-ignore
			const allNfts = await getUserNfts(celoAvatarContract, { address })
			if (!allNfts) return
			setUserNfts(allNfts)
			dispatch({ type: fetchNfts, payload: allNfts })
		} catch (error) {
			console.log({ error })
		} finally {
			setLoading(false)
		}
	}, [celoAvatarContract])

	const getMintFee = useCallback(async () => {
		// get the minting fee
		const MintingFee = await getMintingFee(celoAvatarContract)
		//@ts-ignore
		setMintingFee(MintingFee)
	}, [])

	const getTotalMint = useCallback(async () => {
		// get the number of minted cAVT tokens
		const totalMinted = await getTotalMintedNFTs(celoAvatarContract)
		//@ts-ignore
		setTotalMint(totalMinted)
	}, [])

	useEffect(() => {
		try {
			if (address && celoAvatarContract) {
				getUserAssets()
				getMintFee()
				getTotalMint()
			}
		} catch (error) {
			console.log({ error })
		}
	}, [celoAvatarContract, address, getUserAssets, getMintFee, getTotalMint])

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

import React from "react"
import Link from "next/link"
import { useCallback, useState, useEffect } from "react"
import { useContractKit } from "@celo-tools/use-contractkit"
import { RootState } from "../redux/store"
import { useSelector } from "react-redux"
import { useCeloAvatarContract } from "../utils/hooks"
import { getUserNfts } from "../utils/avatarNFT"
import UserNftCard from "../components/AvatarNFT/UserNftCard"

const Nfts = () => {
	const [loading, setLoading] = useState(false)
	const { address } = useContractKit()
	const [userNfts, setUserNfts] = useState<[]>([])
	const celoAvatarContract = useCeloAvatarContract()
	const nfts = useSelector((state: RootState) => state.nfts)
	const getUserAssets = useCallback(async () => {
		try {
			setLoading(true)
			// fetch all nfts from the smart contract
			//@ts-ignore
			const allNfts: [] = await getUserNfts(celoAvatarContract, { address })
			if (!allNfts) return
			setUserNfts(allNfts)
		} catch (error) {
			console.log({ error })
		}
	}, [celoAvatarContract, address])
	useEffect(() => {
		getUserAssets()
	}, [getUserAssets])
	console.log(userNfts)

	return (
		<div>
			<div>
				<div className="link-btn ms-3 mt-3 text-center">
					<Link href={"/"}>Home</Link>
				</div>
				<header className="nft-header">Your NFTs</header>
				<div className="container">
					<div className="row justify-content-center align-items-center gap-2">
						{userNfts.length !== 0 ? (
							userNfts.map((nft, key) => {
								return (
									<div className="col-md-4 col-8" key={key}>
										<UserNftCard nft={nft} />
									</div>
								)
							})
						) : (
							<>
								<p className="text-center display-5 text-muted">
									No Nft Available
								</p>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Nfts

import React from "react"
import { Card, Col, Badge, Stack, Row } from "react-bootstrap"
import { meta } from "../../utils/avatarNFT"
import Image from "next/image"
import { useEffect, useState } from "react"
import axios from "axios"
import loadImg from "../assets/img/load.png"
import { motion } from "framer-motion"

interface props {
	nft: meta
}

const UserNftCard: React.FC<props> = ({ nft }) => {
	const [imgUrl, setImgUrl] = useState(() => "")
	const getImg = async () => {
		try {
			const res = await axios.get(nft.ipfsImage)
			const base64Url = await res.data
			setImgUrl(() => base64Url)
			console.log(base64Url)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getImg()
	})
	return (
		<Col key={nft.index}>
			<Card className=" h-100 nft">
				<Card.Header>
					<Stack direction="horizontal" gap={2}>
						<Badge bg="secondary" className="ms-auto">
							{nft.index} ID
						</Badge>
					</Stack>
				</Card.Header>

				<div className=" ratio ratio-4x3 ">
					<Image
						src={imgUrl ? imgUrl : loadImg}
						alt={"CeloAvatar"}
						layout={"fill"}
						style={{ objectFit: "cover" }}
					/>
				</div>
				<div>
					<motion.a
						download={"celo-avatar-avatar.png"}
						href={imgUrl}
						className="nft-btn"
					>
						Download
					</motion.a>
				</div>

				<Card.Body className="d-flex  flex-column text-center">
					<Card.Text className="flex-grow-1">
						{"CeloAvatar "} {nft.index}
					</Card.Text>
					<div>
						<Row className="mt-2 gy-2 justify-content-between">
							{nft.attributes.map((attribute, key) => (
								<div className="col-6" key={key}>
									<div className="border rounded bg-light">
										<div className="text-secondary fw-lighter small text-capitalize">
											{attribute.key}
										</div>
										<div className="text-secondary text-capitalize font-monospace">
											{attribute.value}
										</div>
									</div>
								</div>
							))}
						</Row>
					</div>
				</Card.Body>
			</Card>
		</Col>
	)
}

export default UserNftCard

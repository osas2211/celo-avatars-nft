import React, { ReactNode } from "react"
import Head from "next/head"
import { Nav } from "react-bootstrap"

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<>
			<Head>
				<title>Celo Avatar NFTs</title>
			</Head>

			<div>{children}</div>
		</>
	)
}

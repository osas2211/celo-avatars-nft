import React, { useEffect, useState } from "react"
import styles from "../../styles/options.module.css"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "@reduxjs/toolkit"
import { toggleHeadShape, toggleHeadSize } from "../../redux/slices/headSlice"
import { RootState } from "../../redux/store"
import { action } from "./Options"

export const HeadOptions = () => {
	const headState = useSelector((state: RootState) => state.head)
	const [size, setSize] = useState("18% 30%")
	const [shape, setShape] = useState<string>(headState.headShape)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch({
			type: toggleHeadSize.type as any | string,
			payload: { height: size.slice(0, 3), width: size.slice(4, 7) },
		})
		dispatch({ type: toggleHeadShape.type as any | string, payload: shape })
	}, [size, shape, dispatch])
	return (
		<div className={styles.group}>
			<div>
				<p style={{ marginBottom: "0.3rem" }}>Head Shape:</p>
				<div className={styles.select}>
					<select
						className={styles.select_}
						value={shape}
						onChange={(e) => {
							setShape(e.target.value)
						}}
					>
						<option value="100% / 50% 50% 120% 120%">Normal</option>
						<option value="100%">Oval</option>
						<option value="100% / 10% 10% 10% 10%">Semi Rectangle</option>
						<option value="0%">Rectangle</option>
					</select>
				</div>
			</div>
			<div>
				<p style={{ marginBottom: "0.3rem" }}>Head Size:</p>
				<div className={styles.select}>
					<select
						className={styles.select_}
						value={`${size}`}
						onChange={(e) => setSize(e.target.value)}
					>
						<option value={"18% 30%"}>Small</option>
						<option value="20% 32%">Mid</option>
						<option value="23% 35%">Big</option>
					</select>
				</div>
			</div>
		</div>
	)
}

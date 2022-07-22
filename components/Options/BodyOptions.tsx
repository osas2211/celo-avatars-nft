import React, { useState, useEffect } from "react"
import styles from "../../styles/options.module.css"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "@reduxjs/toolkit"
import {
	toggleBodyShape,
	toggleBodySize,
	toggleSkinColor,
} from "../../redux/slices/bodySlice"
import { RootState } from "../../redux/store"
import { action } from "./Options"
import { SmileOptions } from "./SmileOptions"

export const BodyOptions = () => {
	const bodyState = useSelector((state: RootState) => state.body)
	const [size, setSize] = useState(bodyState.bodySize)
	const [shape, setShape] = useState("normal")
	const [color, setColor] = useState<string>(bodyState.skinColor)
	const dispatch: Dispatch<action> = useDispatch()

	useEffect(() => {
		dispatch({ type: toggleSkinColor.type as any | string, payload: color })
		dispatch({ type: toggleBodySize.type as any | string, payload: size })
		dispatch({ type: toggleBodyShape.type as any | string, payload: shape })
	}, [size, color, shape, dispatch])
	return (
		<>
			<div className={styles.group}>
				<div>
					<p style={{ marginBottom: "0.3rem" }}>Skin Color:</p>
					<div className={styles.select}>
						<select
							className={styles.select_}
							value={color}
							onChange={(e) => {
								setColor(e.target.value)
							}}
						>
							<option value="#fca">White</option>
							<option value="#884c24">Dark</option>
						</select>
					</div>
				</div>
				<div>
					<p style={{ marginBottom: "0.3rem" }}>Body Size:</p>
					<div className={styles.select}>
						<select
							className={styles.select_}
							value={size}
							onChange={(e) => setSize(e.target.value)}
						>
							<option value={"40%"}>Normal</option>
							<option value="32%">Small</option>
							<option value="50%">Big</option>
						</select>
					</div>
				</div>
			</div>
			<div className={styles.group}>
				<div>
					<p style={{ marginBottom: "0.3rem" }}>Body Shape:</p>
					<div className={styles.select}>
						<select
							className={styles.select_}
							value={shape}
							onChange={(e) => setShape(e.target.value)}
						>
							<option value={"normal"}>Normal</option>
							<option value="rectangle">Rectangle</option>
						</select>
					</div>
				</div>
				<SmileOptions />
			</div>
		</>
	)
}

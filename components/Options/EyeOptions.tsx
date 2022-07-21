import React, { useEffect, useState } from "react"
import styles from "../../styles/options.module.css"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "@reduxjs/toolkit"
import { toggleEyeColor, toggleEyeShape } from "../../redux/slices/headSlice"
import { RootState } from "../../redux/store"
import { action } from "./Options"

export const EyeOptions = () => {
	const headState = useSelector((state: RootState) => state.head)
	const [color, setColor] = useState<string>(headState.eyeColor)
	const [shape, setShape] = useState<string>(headState.eyeShape)
	const dispatch: Dispatch<action> = useDispatch()

	useEffect(() => {
		dispatch({ type: toggleEyeColor.type as any | string, payload: color })
		dispatch({ type: toggleEyeShape.type as any | string, payload: shape })
	}, [color, shape])
	return (
		<div className={styles.group}>
			<div>
				<p style={{ marginBottom: "0.3rem" }}>Eye Color:</p>
				<div className={styles.select}>
					<select
						className={styles.select_}
						value={color}
						onChange={(e) => {
							setColor(e.target.value)
						}}
					>
						<option value="#00916E">Green</option>
						<option value="#FCBA04">Yellow</option>
						<option value="#A50104">Red</option>
						<option value="#4A7B9D">Blue</option>
					</select>
				</div>
			</div>
			<div>
				<p style={{ marginBottom: "0.3rem" }}>Eye Shape:</p>
				<div className={styles.select}>
					<select
						className={styles.select_}
						value={shape}
						onChange={(e) => setShape(e.target.value)}
					>
						<option value="100% / 80% 80% 120% 120%">Oval</option>
						<option value="0%">Rectangle</option>
					</select>
				</div>
			</div>
		</div>
	)
}

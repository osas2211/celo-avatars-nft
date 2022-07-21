import React, { useState, useEffect } from "react"
import styles from "../../styles/options.module.css"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "@reduxjs/toolkit"
import { RootState } from "../../redux/store"
import { action } from "./Options"
import {
	toggleHat,
	toggleHatColor,
	toggleShirtColor,
	toggleShirtSleeve,
	toggleTrouserColor,
	toggleTrouserLength,
} from "../../redux/slices/clothesSlice"

export const ClothesOptions = () => {
	const clotheState = useSelector((state: RootState) => state.clothes)
	const [shirtColor, setShirtColor] = useState(clotheState.shirtColor)
	const [shirtSleeve, setShirtSleeve] = useState(clotheState.shirtSleeve)
	const [hatColor, setHatColor] = useState<string>(clotheState.hatColor)
	const [hat, setHat] = useState<string>(clotheState.hat)
	const [trouserColor, setTrouserColor] = useState<string>(
		clotheState.trouserColor
	)
	const [trouserLength, setTrouserLength] = useState<string>(
		clotheState.trouserLength
	)
	const dispatch: Dispatch<action> = useDispatch()

	useEffect(() => {
		dispatch({
			type: toggleTrouserLength.type as any | string,
			payload: trouserLength,
		})
		dispatch({
			type: toggleTrouserColor.type as any | string,
			payload: trouserColor,
		})
		dispatch({
			type: toggleShirtColor.type as any | string,
			payload: shirtColor,
		})
		dispatch({
			type: toggleShirtSleeve.type as any | string,
			payload: shirtSleeve,
		})
		dispatch({ type: toggleHatColor.type as any | string, payload: hatColor })
		dispatch({ type: toggleHat.type as any | string, payload: hat })
	}, [trouserLength, trouserColor, shirtColor, shirtSleeve, hatColor, hat])

	return (
		<>
			<div className={styles.group}>
				<div>
					<p style={{ marginBottom: "0.3rem" }}>Hat Color:</p>
					<div className={styles.select}>
						<select
							className={styles.select_}
							value={hatColor}
							onChange={(e) => {
								setHatColor(e.target.value)
							}}
						>
							<option value={"#000"}>Dark</option>
							<option value="#fff">White</option>
							<option value="#e9c629">Yellow</option>
							<option value="rgba(82, 30, 31, 1)">Red</option>
							<option value="#4A7B9D">Blue</option>
						</select>
					</div>
				</div>
				<div>
					<p style={{ marginBottom: "0.3rem" }}>Toggle Hat:</p>
					<div className={styles.select}>
						<select
							className={styles.select_}
							value={hat}
							onChange={(e) => setHat(e.target.value)}
						>
							<option value={"use"}>Use Hat</option>
							<option value={""}>Remove Hat</option>
						</select>
					</div>
				</div>
			</div>

			<div className={styles.group}>
				<div>
					<p style={{ marginBottom: "0.3rem" }}>Shirt Sleeve:</p>
					<div className={styles.select}>
						<select
							className={styles.select_}
							value={shirtSleeve}
							onChange={(e) => setShirtSleeve(e.target.value)}
						>
							<option value={"short"}>Short</option>
							<option value="long">Long</option>
						</select>
					</div>
				</div>

				<div>
					<p style={{ marginBottom: "0.3rem" }}>Shirt Color:</p>
					<div className={styles.select}>
						<select
							className={styles.select_}
							value={shirtColor}
							onChange={(e) => setShirtColor(e.target.value)}
						>
							<option value="#e9c629">Yellow</option>
							<option value={"rgba(32, 30, 31, 1)"}>Dark</option>
							<option value="#fff">White</option>
							<option value="rgba(82, 30, 31, 1)">Red</option>
							<option value="#4A7B9D">Blue</option>
						</select>
					</div>
				</div>
			</div>

			<div className={styles.group}>
				<div>
					<p style={{ marginBottom: "0.3rem" }}>Trouser Color:</p>
					<div className={styles.select}>
						<select
							className={styles.select_}
							value={trouserColor}
							onChange={(e) => setTrouserColor(e.target.value)}
						>
							<option value={"rgba(32, 30, 31, 1)"}>Dark</option>
							<option value="#fff">White</option>
							<option value="rgba(82, 30, 31, 1)">Red</option>
							<option value="#e9c629">Yellow</option>
							<option value="#4A7B9D">Blue</option>
						</select>
					</div>
				</div>

				<div>
					<p style={{ marginBottom: "0.3rem" }}>Trouser Length:</p>
					<div className={styles.select}>
						<select
							className={styles.select_}
							value={trouserLength}
							onChange={(e) => setTrouserLength(e.target.value)}
						>
							<option value={"35%"}>Long</option>
							<option value="15%">Short</option>
						</select>
					</div>
				</div>
			</div>
		</>
	)
}

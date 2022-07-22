import React, { useEffect, useState } from "react"
import styles from "../../styles/options.module.css"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "@reduxjs/toolkit"
import { toggleSmile } from "../../redux/slices/headSlice"
import { RootState } from "../../redux/store"
import { action } from "./Options"

// THIS COMPONENT IS ADDED TO BODY OPTIONS
export const SmileOptions = () => {
	const headState = useSelector((state: RootState) => state.head)
	const [smile, setSmile] = useState<string>(headState.smile)
	const dispatch: Dispatch<action> = useDispatch()

	useEffect(() => {
		dispatch({ type: toggleSmile.type as any | string, payload: smile })
	}, [smile, dispatch])
	return (
		<div>
			<div>
				<p style={{ marginBottom: "0.3rem" }}>Smile:</p>
				<div className={styles.select}>
					<select
						className={styles.select_}
						value={smile}
						onChange={(e) => {
							setSmile(e.target.value)
						}}
					>
						<option value="100% / 40% 40% 130% 130%">Smile</option>
						<option value="100% / 0% 0% 120% 0%">Smirk</option>
						<option value="sad">Sad</option>
						<option value="0%">Neutral</option>
					</select>
				</div>
			</div>
		</div>
	)
}

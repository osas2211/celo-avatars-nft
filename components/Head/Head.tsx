import React from "react"
import styles from "../../styles/head_styles/head.module.css"
import { Ear } from "./Ear"
import { Eye } from "./Eye"
import { Mouth } from "./Mouth"
import { Nose } from "./Nose"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

export const Head = () => {
	const headState = useSelector((state: RootState) => state.head)
	const bodyState = useSelector((state: RootState) => state.body)
	return (
		<div
			className={`${styles.head} ${styles.hair}`}
			style={{
				borderRadius: headState.headShape,
				height: headState.headSize.height,
				width: headState.headSize.width,
				backgroundColor: bodyState.skinColor,
			}}
		>
			<Ear />
			<Ear />
			<Eye
				color={headState.eyeColor}
				shape={headState.eyeShape}
				shadowColor={bodyState.skinColor}
			/>
			<Eye
				color={headState.eyeColor}
				shape={headState.eyeShape}
				shadowColor={bodyState.skinColor}
			/>
			<Nose />
			<Mouth smile={headState.smile} />
		</div>
	)
}

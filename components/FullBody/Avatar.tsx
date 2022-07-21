import React, { ReactNode } from "react"
import styles from "../../styles/avatar.module.css"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

export const Avatar: React.FC<{ children: ReactNode }> = ({ children }) => {
	const bodyState = useSelector((state: RootState) => state.body)
	return (
		<div
			className={styles.avatar + " avatar"}
			style={{ width: bodyState.bodySize }}
		>
			{children}
		</div>
	)
}

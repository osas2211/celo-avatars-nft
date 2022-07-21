import React from 'react'
import styles from "../../styles/head_styles/mouth.module.css"

export const Mouth: React.FC<{smile: string}> = ({ smile }) => {
  return (
    <div className={`${styles.mouth}`}
      style={{
        borderRadius: smile !== "sad" ? smile : "100%",
        borderBottom: smile !== "sad" ? ".1vmin solid #000" : "",
        borderTop: smile === "sad" ? ".1vmin solid #000" : "",
        top: smile !== "sad" ? "70%" : "75%"
      }}
    ></div>
  )
}

import React from 'react'
import styles from "../../styles/head_styles/eye.module.css"

interface Props{
  color: string,
  shape: string,
  shadowColor: string,
}

export const Eye:React.FC<Props> = ({ color, shape, shadowColor}) => {
  return (
    <div className={styles.eye}
    style = {{
      borderRadius: shape,
      boxShadow: `0 -0vmin,
      0 -.9vmin 0 .5vmin ${shadowColor},
      0 -1.8vmin #0000009d`
    }}
    >
      <div className={styles.pupil}></div>
      <div className={styles.iris}
        style = {{
          backgroundColor: color,
        }}
      ></div>
    </div>
  )
}
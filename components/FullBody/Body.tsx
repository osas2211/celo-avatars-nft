import React from 'react'
import styles from "../../styles/body.module.css"
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

export const Body = () => {
  const bodyState = useSelector((state: RootState) => state.body);
  const clotheState = useSelector((state: RootState) => state.clothes);
  return (
    <>
        <div className={styles.body} 
        style={{borderRadius: bodyState.bodyShape === "rectangle" ? "0%" : "120% / 10% 10% 0% 0%",
          backgroundColor: clotheState.shirtColor
        }}>

            <div className={styles.shoulder} 
              style={{borderTopLeftRadius: bodyState.bodyShape === "rectangle" ? "0%" : "120%",
              backgroundColor: clotheState.shirtColor}}>
            </div>

            <div className={styles.shoulder} 
              style={{borderTopRightRadius: bodyState.bodyShape === "rectangle" ? "0%" : "120%",
              backgroundColor: clotheState.shirtColor}}>
            </div>
            <div className={styles.muscle} 
              style={{ backgroundColor: clotheState.shirtSleeve === "short" ? bodyState.skinColor : clotheState.shirtColor }}
            ></div>
            <div className={styles.muscle} 
              style={{ backgroundColor: clotheState.shirtSleeve === "short" ? bodyState.skinColor : clotheState.shirtColor }}
            ></div>
            <div className={styles.arm} 
              style={{ backgroundColor: clotheState.shirtSleeve === "short" ? bodyState.skinColor : clotheState.shirtColor }}
            ></div>
            <div className={styles.arm} 
              style={{ backgroundColor: clotheState.shirtSleeve === "short" ? bodyState.skinColor : clotheState.shirtColor }}
            ></div>
            <div className={styles.fingers} 
              style={{ backgroundColor: bodyState.skinColor }}
            ></div>
            <div className={styles.fingers} 
              style={{ backgroundColor: bodyState.skinColor}}
            ></div>
        </div>
    </>
  )
}

import React from 'react'
import styles from "../../styles/leg.module.css"
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

export const Legs = () => {
  const bodyState = useSelector((state: RootState) => state.body)
  const clothesState = useSelector((state: RootState) => state.clothes)
  return (
    <>
      <div className={styles.belt} style={{ backgroundColor: clothesState.trouserColor }}></div>
      <div className={styles.trouser} 
        style={{ backgroundColor: clothesState.trouserColor, height: clothesState.trouserLength }}>
            <div className={styles.fold} style={{ backgroundColor: clothesState.trouserFoldsColor }}></div>
      </div>
      <div className={styles.trouser} 
        style={{ backgroundColor: clothesState.trouserColor, height: clothesState.trouserLength}}>
            <div className={styles.fold} style={{ backgroundColor: clothesState.trouserFoldsColor }}></div>               
      </div>
      <div className={styles.leg}
        style={{ backgroundColor: bodyState.skinColor }}
      >
        <div className={styles.shoe}></div>
      </div>
      <div className={styles.leg}
        style={{ backgroundColor: bodyState.skinColor }}
      >
        <div className={styles.shoe}></div>
      </div>
    </>
  )
}

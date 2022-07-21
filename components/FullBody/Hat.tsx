import React from 'react'
import styles from "../../styles/hat.module.css"
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

export const Hat = () => {
    const clothesState = useSelector((state:RootState) => state.clothes)
  return (
    <>
        {
            clothesState.hat && <>
                <div className={styles.top} style={{backgroundColor: clothesState.hatColor}}></div>
                <div className={styles.bottom} style={{backgroundColor: clothesState.hatColor}}></div>
            </>
        }
    </>
  )
}

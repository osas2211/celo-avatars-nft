import React from 'react'
import styles from "../../styles/neck.module.css"
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

export const Neck = () => {
  const bodyState = useSelector((state: RootState) => state.body)
  return (
    <div className={styles.neck}
    style={{ backgroundColor: bodyState.skinColor }}
    ></div>
  )
}

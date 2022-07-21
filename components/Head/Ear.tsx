import React from 'react'
import styles from "../../styles/head_styles/ear.module.css"
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

export const Ear = () => {
  const bodyState = useSelector((state: RootState) => state.body)
  return (
    <div className={styles.ear}
    style={{ backgroundColor: bodyState.skinColor }}
    ></div>
  )
}

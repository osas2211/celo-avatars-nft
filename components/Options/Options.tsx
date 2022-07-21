import React from 'react'
import styles from "../../styles/options.module.css"
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { EyeOptions } from './EyeOptions'
import { HeadOptions } from './HeadOptions'
import { SmileOptions } from './SmileOptions'
import { BodyOptions } from './BodyOptions'
import { ClothesOptions } from './ClothesOptions'

export interface action{
    type: ActionCreatorWithPayload<any>
    payload: string | boolean
}

export default function Options() {
  return (
    <div className={styles.options}>
        <h3 style={{fontWeight: "400"}}>Customization Options 🛠</h3>
        <div>
            <EyeOptions />
            <HeadOptions />
            <BodyOptions />
            <ClothesOptions />
        </div>
    </div>
  )
}

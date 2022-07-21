import { configureStore } from "@reduxjs/toolkit"
import { headReducer } from "./slices/headSlice"
import { bodyReducer } from "./slices/bodySlice"
import { clothesReducer } from "./slices/clothesSlice"

export const store = configureStore({
	reducer: {
		head: headReducer,
		body: bodyReducer,
		clothes: clothesReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>

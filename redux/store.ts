import { configureStore } from "@reduxjs/toolkit"
import { headReducer } from "./slices/headSlice"
import { bodyReducer } from "./slices/bodySlice"
import { clothesReducer } from "./slices/clothesSlice"
import { nftReducer } from "./slices/nftsSlice"

export const store = configureStore({
	reducer: {
		head: headReducer,
		body: bodyReducer,
		clothes: clothesReducer,
		nfts: nftReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>

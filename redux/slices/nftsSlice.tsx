import { createSlice } from "@reduxjs/toolkit"

export const nftSlice = createSlice({
	name: "nfts",
	initialState: [],
	reducers: {
		fetchNfts: (state, action) => {
			state = action.payload
		},
	},
})

export const nftReducer = nftSlice.reducer
export const { fetchNfts } = nftSlice.actions

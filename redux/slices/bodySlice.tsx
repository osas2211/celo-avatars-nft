import { createSlice } from "@reduxjs/toolkit"

export const bodySlice = createSlice({
	name: "body",
	initialState: {
		bodySize: "40%",
		bodyShape: "normal",
		skinColor: "#fca",
	},
	reducers: {
		toggleBodySize: (state, action) => {
			state.bodySize = action.payload
			//return {...state, bodySize: action.payload}
		},
		toggleBodyShape: (state, action) => {
			state.bodyShape = action.payload
			//return {...state, bodyShape: action.payload}
		},
		toggleSkinColor: (state, action) => {
			state.skinColor = action.payload
			//return { ...state, skinColor: action.payload }
		},
	},
})

export const bodyReducer = bodySlice.reducer
export const { toggleBodySize, toggleBodyShape, toggleSkinColor } =
	bodySlice.actions

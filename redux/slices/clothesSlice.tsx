import { createSlice } from "@reduxjs/toolkit"

export const clothesSlice = createSlice({
	name: "clothes",
	initialState: {
		shirtColor: "#e9c629",
		shirtSleeve: "short",
		trouserLength: "35%",
		trouserColor: "rgba(32, 30, 31, 1)",
		trouserFoldsColor: "rgb(95, 95, 95)",
		hatColor: "#000",
		hat: "",
	},
	reducers: {
		toggleShirtColor: (state, action) => {
			state.shirtColor = action.payload
			// return { ...state, shirtColor: actions.payload}
		},
		toggleShirtSleeve: (state, action) => {
			state.shirtSleeve = action.payload
			// return { ...state, shirtSleeve: actions.payload}
		},
		toggleTrouserLength: (state, action) => {
			state.trouserLength = action.payload
			// return { ...state, trouserLength: actions.payload}
		},
		toggleTrouserColor: (state, action) => {
			state.trouserColor = action.payload
			// return { ...state, trouserColor: actions.payload}
		},
		toggleHatColor: (state, action) => {
			state.hatColor = action.payload
			// return { ...state, hatColor: actions.payload}
		},
		toggleHat: (state, action) => {
			state.hat = action.payload
			// return { ...state, hat: actions.payload }
		},
	},
})

export const clothesReducer = clothesSlice.reducer
export const {
	toggleHat,
	toggleHatColor,
	toggleShirtColor,
	toggleShirtSleeve,
	toggleTrouserColor,
	toggleTrouserLength,
} = clothesSlice.actions

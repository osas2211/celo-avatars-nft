export interface configI {
	bodySize: string
	bodyShape: string
	eyeColor: string
	eyeShape: string
	hat: string
	hatColor: string
	headShape: string
	headSize: { width: string; height: string }
	shirtColor: string
	shirtSleeve: string
	skinColor: string
	smile: string
	trouserColor: string
	trouserFoldsColor: string
	trouserLength: string
}

export const valuesParser = (configData: configI) => {
	const values: string[] | { width: string; height: string }[] =
		Object.values(configData)
	const parsedValue: configI | any = {}
	parsedValue["bodyShape"] = configData["bodyShape"]
	parsedValue["bodySize"] =
		configData["bodySize"] === "40%"
			? "normal"
			: configData["bodySize"] === "32%"
			? "small"
			: "big"
	parsedValue["skinColor"] =
		configData["skinColor"] === "#fca" ? "white" : "dark"
	parsedValue["eyeColor"] =
		configData["eyeColor"] === "#00916E"
			? "green"
			: configData["eyeColor"] === "#FCBA04"
			? "yellow"
			: configData["eyeColor"] === "#A50104"
			? "red"
			: "blue"
	parsedValue["eyeShape"] =
		configData["eyeShape"] === "100% / 80% 80% 120% 120%" ? "oval" : "Rectangle"
	parsedValue["hat"] = configData["hat"] === "use" ? "with hat" : "without Hat"
	parsedValue["hatColor"] =
		configData["hatColor"] === "#000"
			? "dark"
			: configData["hatColor"] === "#fff"
			? "white"
			: configData["hatColor"] === "#e9c629"
			? "yellow"
			: configData["hatColor"] === "rgba(82, 30, 31, 1)"
			? "red"
			: "blue"
	parsedValue["shirtColor"] =
		configData["shirtColor"] === "#000"
			? "dark"
			: configData["shirtColor"] === "#fff"
			? "white"
			: configData["shirtColor"] === "#e9c629"
			? "yellow"
			: configData["shirtColor"] === "rgba(82, 30, 31, 1)"
			? "red"
			: "blue"
	parsedValue["shirtSleeve"] = configData["shirtSleeve"]
	parsedValue["trouserColor"] =
		configData["trouserColor"] === "rgba(32, 30, 31, 1)"
			? "dark"
			: configData["trouserColor"] === "#fff"
			? "white"
			: configData["trouserColor"] === "#e9c629"
			? "yellow"
			: configData["trouserColor"] === "rgba(82, 30, 31, 1)"
			? "red"
			: "blue"
	parsedValue["trouserLength"] =
		configData["trouserLength"] === "35%" ? "long" : "small"
	parsedValue["headShape"] =
		configData["headShape"] === "100% / 50% 50% 120% 120%"
			? "normal"
			: configData["headShape"] === "100%"
			? "oval"
			: configData["headShape"] === "100% / 10% 10% 10% 10%"
			? "semi rectangle"
			: "rectangle"
	parsedValue["headSize"] =
		configData["headSize"].width === "30%"
			? "small"
			: configData["headSize"].width === "32%"
			? "mid"
			: "big"
	parsedValue["smile"] =
		configData["smile"] === "100% / 40% 40% 130% 130%"
			? "smile"
			: configData["smile"] === "sad"
			? "sad"
			: configData["smile"] === "100% / 0% 0% 120% 0%"
			? "smirk"
			: "neutral"

	return parsedValue
}

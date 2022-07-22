import React from "react"
import { motion } from "framer-motion"

const Loader = () => {
	return (
		<motion.div
			className="myLoader"
			initial={{}}
			animate={{
				width: "15vmin",
				height: "15vmin",
				origin: 0,
			}}
			transition={{
				duration: 0.3,
				yoyo: Infinity,
			}}
		></motion.div>
	)
}

export default Loader

import { Avatar } from "./Avatar"
import { Body } from "./Body"
import { Legs } from "./Leg"
import { Hat } from "./Hat"
import { Head as AvatarHead } from "../Head/Head"
import { Neck } from "./neck"

export const AvatarBody = () => {
    return (
        <Avatar>
			<Hat />
			<AvatarHead />
			<Neck />
			<Body />
			<Legs />
		</Avatar> 
    )   
  }


import { IconContext } from "react-icons";
import { BsWifi } from "react-icons/bs";
import { MdAir } from "react-icons/md";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { MdOutlineTv } from "react-icons/md";
import { MdOutlineOutdoorGrill } from "react-icons/md";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { GiFireplace } from "react-icons/gi";
import { FaMountain } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { TbPaw } from "react-icons/tb";
import { AiOutlineClockCircle } from "react-icons/ai";

const features = [
	{ id: "Wifi", icon: <BsWifi /> },

	{ id: "Air Conditioner", icon: <MdAir /> },

	{ id: "TV", icon: <MdOutlineTv /> },

	{ id: "Breakfast", icon: <MdOutlineFreeBreakfast /> },

	{ id: "BBQ & Grill", icon: <MdOutlineOutdoorGrill /> },

	{ id: "Kitchen", icon: <GiForkKnifeSpoon /> },

	{ id: "Car Parking", icon: <FaCar /> },

	{ id: "Pets", icon: <TbPaw /> },

	{ id: "Long Term Stay", icon: <AiOutlineClockCircle /> },

	{ id: "Fireplace", icon: <GiFireplace /> },
];

export default function Features({ feature }) {
	const included = features.filter((f) => feature.includes(f.id));
	const notIncluded = features.filter((f) => !feature.includes(f.id));
	return (
		<IconContext.Provider
			value={{ color: "black", className: "", size: "24px" }}
		>
			<div className="text-xl my-7 font-semibold">
				What this place offers
			</div>

			<div className="grid grid-cols-2">
				{included.map((f) => (
					<div key={f.id} className="flex mb-5 gap-2 text-base">
						{f.icon}
						{f.id}
					</div>
				))}
				{notIncluded.splice(0, 2).map((f) => (
					<div
						key={f.id}
						className="flex mb-5 gap-2 text-base line-through"
					>
						{f.icon}
						{f.id}
					</div>
				))}
			</div>
			<hr className="border-[#ffd6d1] my-20 border-0 w-2/3 border-b-[2px]" />
		</IconContext.Provider>
	);
}

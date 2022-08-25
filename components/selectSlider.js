import Slider from "./slidercomponent.js";
import { primaryColor } from "../lib/constants.js";
import { Select, MenuItem } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import MdSort from "react-icons/md";
export default function SelectSlider({
	roomsData,
	sortBy,
	setSortby,
	label,
	options,
}) {
	const selectData = {
		inputType: "select",
		inputId: sortBy,
		changeHandler: (e) => setSortby(e.target.value),
		label: label,
		options: options,
	};
	return (
		<div className="">
			<h1 className="mt-[100px] text-2xl font-semibold">Rooms {label}</h1>
			<div className="text-right ml-auto">
				<Select
					IconComponent={SortIcon}
					id={selectData.inputId}
					value={selectData.inputId}
					onChange={selectData.changeHandler}
					label={selectData.label}
					className="border-black border-[1px] px-3"
				>
					{selectData.options.map((opt) => (
						<MenuItem key={opt} value={opt}>
							{opt}
						</MenuItem>
					))}
				</Select>
			</div>
			{roomsData === [] ? (
				<h3
					className={`text-[${primaryColor}] text-center text-xl font-semibold my-[50px]`}
				>
					No Rooms Found
				</h3>
			) : (
				""
			)}
			{roomsData && <Slider divs={roomsData} />}
		</div>
	);
}

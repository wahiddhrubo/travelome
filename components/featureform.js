import Checkbox from "@mui/material/Checkbox";
import React, { useState } from "react";
import { alpha, styled } from "@mui/material/styles";

import {
	Select,
	Chip,
	FormControl,
	MenuItem,
	Box,
	OutlinedInput,
	InputLabel,
	FormHelperText,
} from "@mui/material";

export default function FeatureForm({
	features,
	setFeatures,
	styles,
	CustomSelect,
	errors,
	selections,
	title,
}) {
	const allFeatures = [
		"Wifi",
		"Air Conditioner",
		"TV",
		"Breakfast",
		"BBQ & Grill",
		"Kitchen",
		"Car Parking",
		"Pets",
		"Long Term Stay",
		"Fireplace",
	];

	const choicesHandler = (event) => {
		setFeatures(event.target.value);
	};

	const CustomMenu = styled(MenuItem)({
		"& label.Mui-selected": {
			color: "green",
		},
		"& label": {
			color: "black",
			textTransform: "capitalize",
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "green",
		},

		"& .MuiMenuItem-root": {
			"& fieldset": {
				borderColor: "black",
				borderRadius: "6px",
				borderWidth: "0px",
				borderBottomWidth: "2px",
				color: "black",
			},
			"&:hover fieldset": {
				borderColor: "#f12711",
			},
			"&.Mui-focused fieldset": {
				borderColor: "green",
			},
		},
	});
	const HelperText = errors.includes("features")
		? "Please Fill This Field"
		: "Required";

	return (
		<div className={styles.inputDivFull}>
			<FormControl variant="standard" className={styles.input}>
				<InputLabel
					id="demo-multiple-chip-label"
					sx={{
						color: "black",
						textTransform: "capitalize",
					}}
				>
					{title}
				</InputLabel>
				<CustomSelect
					labelId="demo-multiple-chip-label"
					sx={{ border: "0px" }}
					id="demo-multiple-chip"
					multiple
					value={features}
					onChange={choicesHandler}
					error={errors.includes("features") ? true : false}
					renderValue={(selected) =>
						selected.map((value) => (
							<Chip
								key={value}
								label={value}
								style={{
									backgroundColor: "black",
									color: "white",
								}}
							/>
						))
					}
				>
					{selections.map((fea) => (
						<option
							key={fea}
							value={fea}
							style={{
								".MuiMenuItem-root": {
									backgroundColor: "black",
								},
							}}
							className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
						>
							{fea}
						</option>
					))}
				</CustomSelect>
				<FormHelperText
					error={errors.includes("features") ? true : false}
				>
					{HelperText}
				</FormHelperText>
			</FormControl>
		</div>
	);
}

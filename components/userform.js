import { alpha, styled } from "@mui/material/styles";
import {
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	FormHelperText,
} from "@mui/material";
import FeatureForm from "./featureform.js";
import ImageUpload from "./profileimage.js";

export default function UserForm({
	nickname,
	setNickname,
	bio,
	setBio,
	location,
	setLocation,
	img,
	setImg,
	phoneNumber,
	setPhoneNumber,
	email,
	setEmail,
	languages,
	setLanguages,
	errors,
}) {
	const styles = {
		wrapper: `flex flex-wrap  `,
		inputDiv: `w-1/3 p-10`,
		inputDivFull: `w-full p-10`,
		input: `w-full text-black`,
		error: " border-b-2 !border-[#d32f2f]",
		input: ` border-black w-full text-black px-3 py-3 placeholder-opacity-100 placeholder:capitalize placeholder:text-black  rounded-[8px]  border-b-2`,
	};

	const CustomSelect = styled(Select)({
		"&:after": {
			borderBottomColor: "green",
		},
		"&:before": {
			borderBottomColor: "black",
			borderWidth: "0px",
			borderBottomWidth: "2px",
			borderRadius: "6px",
		},
	});

	const fields = [
		{
			inputType: "text",
			inputId: nickname,
			id: "nickname",
			changeHandler: (e) => setNickname(e.target.value),
			label: "nickname",
			multiline: false,
			fullwidth: true,
		},

		{
			inputType: "email",
			inputId: email,
			id: "email",
			changeHandler: (e) => setEmail(e.target.value),
			label: "email",
			multiline: false,
		},

		{
			inputType: "text",
			inputId: phoneNumber,
			id: "phoneNumber",
			changeHandler: (e) => setPhoneNumber(e.target.value),
			label: "phoneNumber",
			multiline: false,
		},

		{
			inputType: "select",
			inputId: location,
			id: "location",
			changeHandler: (e) => setLocation(e.target.value),
			label: "location",
			multiline: false,
			options: [
				"New York",
				"Los Angeles",
				"Berk",
				"Toronto",
				"Vancouver",
				"Montreal",
				"Quebec City",
			],
		},

		{
			inputType: "text",
			inputId: bio,
			id: "bio",
			changeHandler: (e) => setBio(e.target.value),
			label: "bio",
			multiline: true,
			fullwidth: true,
		},
	];

	const languagesList = [
		"English",
		"French",
		"Chinese",
		"Japanese",
		"Hindi",
		"Bengali",
	];

	const helpertext = (f) => {
		errors.includes(f.id) ? "Please Fill This Field" : "Required";
	};

	return (
		<div className={styles.wrapper}>
			{fields.map((f) =>
				f.inputType == "text" ||
				f.inputType == "number" ||
				f.inputType == "email" ? (
					<div
						key={f.id}
						className={
							f.fullwidth ? styles.inputDivFull : styles.inputDiv
						}
					>
						<textarea
							key={f.id}
							className={
								errors.includes(f.id)
									? styles.error + styles.input
									: styles.input
							}
							type={f.inputType}
							required
							placeholder={f.label}
							rows={f.multiline ? 4 : 1}
							value={f.inputId}
							onChange={f.changeHandler}
							helperText={
								errors.includes(f.id)
									? "Please Fill This Field"
									: "Required"
							}
						/>
						<FormHelperText
							error={errors.includes(f.id) ? true : false}
						>
							{errors.includes(f.id) && "Please Fill This Field"}
							{!errors.includes(f.id) && "Required"}
						</FormHelperText>
					</div>
				) : (
					<div key={f.id} className={styles.inputDiv}>
						<FormControl
							variant="standard"
							className={styles.input}
						>
							<InputLabel
								id={f.inputId}
								sx={{
									color: "black",
									textTransform: "capitalize",
								}}
							>
								{f.label}
							</InputLabel>
							<CustomSelect
								id={f.inputId}
								value={f.inputId}
								onChange={f.changeHandler}
								label={f.label}
								error={errors.includes(f.id) ? true : false}
								helpertext={
									errors.includes(f.id)
										? "Please Fill This Field"
										: "Required"
								}
							>
								{f.options.map((opt) => (
									<MenuItem value={opt}>{opt}</MenuItem>
								))}
							</CustomSelect>
							<FormHelperText
								error={errors.includes(f.id) ? true : false}
							>
								{errors.includes(f.id) &&
									"Please Fill This Field"}
								{!errors.includes(f.id) && "Required"}
							</FormHelperText>
						</FormControl>
					</div>
				)
			)}

			<FeatureForm
				setFeatures={setLanguages}
				features={languages}
				styles={styles}
				CustomSelect={CustomSelect}
				errors={errors}
				selections={languagesList}
				title="Languages You Can Speak "
			/>
			<ImageUpload img={img} setImg={setImg} errors={errors} />
		</div>
	);
}

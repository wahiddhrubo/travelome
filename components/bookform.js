import { alpha, styled } from "@mui/material/styles";

import { TextField } from "@mui/material";
import { useState } from "react";
import { DateRangePicker } from "react-dates";
import moment from "moment";
import { AiOutlineCalendar } from "react-icons/ai";

export default function BookingForm({
	isDayBlocked,
	maxNumOfPeople,
	dates,
	setDates,
	className,
	numOfGuest,
	setNumOfGuest,
}) {
	const style = className ? className : "";
	const defaultFocusedInput = "startDate";
	const [focusedInput, setFocusedInput] = useState(defaultFocusedInput);

	const handleDatesChange = (dates) => {
		setDates(dates);
	};
	const CustomTextField = styled(TextField)({
		"& label.Mui-focused": {
			color: "green",
		},
		"& label": {
			color: "black",
			textTransform: "capitalize",
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "green",
		},

		"& .MuiOutlinedInput-root": {
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

	const styles = {
		wrapper: `text-lg text-semibold mb-[400px] w-full ${styles}`,
		input: `my-5 border-0 border-b-2 rounded-md border-black w-full`,
	};

	const onFocusChange = (focusedInput) => {
		setFocusedInput(focusedInput);
	};
	return (
		<div className={styles.wrapper}>
			<div>
				<CustomTextField
					className={styles.input}
					value={numOfGuest}
					onChange={(e) => {
						setNumOfGuest(e.target.value);
						console.log(numOfGuest);
					}}
					type="number"
					InputProps={{
						inputProps: {
							max: maxNumOfPeople,
							min: 1,
						},
					}}
					label="Numbers Of Guests"
				/>
			</div>
			<div>
				<DateRangePicker
					startDate={dates.startDate}
					startDateId="your_unique_start_date_id"
					endDate={dates.endDate}
					endDateId="your_unique_end_date_id"
					onDatesChange={handleDatesChange}
					focusedInput={focusedInput || defaultFocusedInput}
					onFocusChange={onFocusChange}
					isDayBlocked={isDayBlocked}
					numberOfMonths={1}
					minimumNights={3}
					enableOutsideDays={false}
					displayFormat="MMM D"
					customInputIcon=<AiOutlineCalendar />
					isOutsideRange={(day) =>
						day.isBefore(moment().add(0, "days"))
					}
					//initialVisibleMonth={() => null} // PropTypes.func or null,
				/>
			</div>
		</div>
	);
}

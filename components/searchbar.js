import { useState, useEffect } from "react";
import Link from "next/link";
import DatePicker from "react-datepicker";
import moment from "moment";
import Button from "./button.js";
import { AiOutlineSearch } from "react-icons/ai";
import { checkEmptyField } from "./formvalidation.js";

export default function SearchBar({}) {
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [dates, setDates] = useState();
	const [numOfGuests, setNumOfGuests] = useState(1);
	const [disabled, setDisabled] = useState(true);

	const getDates = (startDate, stopDate) => {
		var dateArray = [];
		var currentDate = moment(startDate);
		var stopDate = moment(stopDate);
		while (currentDate <= stopDate) {
			dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
			currentDate = moment(currentDate).add(1, "days");
		}
		return dateArray;
	};

	const formDta = [
		{ startDate: startDate },
		{ endDate: endDate },
		{ numOfGuests: numOfGuests },
	];

	const SearchButton = () => {
		if (disabled) {
			return (
				<Button
					type="DisabledSearchButton"
					text={<AiOutlineSearch size={25} />}
					className="ml-[-30px] "
				/>
			);
		} else {
			return (
				<Link
					href={{
						pathname: "/rooms/search",
						query: { dates: dates, numOfGuests: numOfGuests },
					}}
				>
					<Button
						type="SearchButton"
						text={<AiOutlineSearch size={25} />}
						className="ml-[-30px] "
					/>
				</Link>
			);
		}
	};

	const styles = {
		input: ` w-full h-[45px] border-black text-black pt-auto placeholder-opacity-100 placeholder:capitalize placeholder:my-auto placeholder:text-black   border-b-2 focus:outline-none`,
	};

	useEffect(() => {
		const checkForm = () => {
			console.log(disabled);
			if (!checkEmptyField(formDta)) {
				setDisabled(false);
				const dat = getDates(startDate, endDate);
				setDates(getDates(startDate, endDate));
			}
		};
		checkForm();
	}, [startDate, endDate, numOfGuests]);

	return (
		<div className="flex w-[700px] gap-5">
			<div>
				<label>
					Number Of Guests
					<input
						type="number"
						className={styles.input}
						value={numOfGuests}
						onChange={(e) => setNumOfGuests(e.target.value)}
					/>
				</label>
			</div>
			<label>
				Arrival Date
				<DatePicker
					selected={startDate}
					onChange={(date) => {
						setStartDate(date);
					}}
					selectsStart
					startDate={startDate}
					placeholderText="MM/DD/YY"
					endDate={endDate}
					minDate={new Date()}
				/>
			</label>
			<label>
				Departure Date
				<DatePicker
					selected={endDate}
					onChange={(date) => setEndDate(date)}
					selectsEnd
					startDate={startDate}
					placeholderText="MM/DD/YY"
					endDate={endDate}
					minDate={startDate}
				/>
			</label>

			<SearchButton />
		</div>
	);
}

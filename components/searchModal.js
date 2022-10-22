import Modal from "react-modal";
import { useState, useEffect } from "react";
import Link from "next/link";
import DatePicker from "react-datepicker";
import moment from "moment";
import Button from "./button.js";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { checkEmptyField } from "./formvalidation.js";

export default function SearchPopUp({ openModal, setOpenModal }) {
	const closeModal = () => {
		setOpenModal(false);
	};

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
						type="DefaultButton"
						text={
							<div>
								<AiOutlineSearch
									size={25}
									className={"inline"}
								/>{" "}
								Search
							</div>
						}
						className="ml-[-30px] "
					/>
				</Link>
			);
		}
	};

	const styles = {
		input: ` text-center w-full h-[45px]    text-white pt-auto placeholder-opacity-100 placeholder:capitalize placeholder:my-auto placeholder:text-white bg-transparent    focus:outline-none`,
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

	const style = {
		title: "text-xl leading-7 font-semibold",
		close: "relative left-full bottom-[20%] w-[30px] cursor-pointer",
		closeIcon: "w-[25px] h-[25px] ",
		Modal: "bg-black absolute inset-0   p-10 py-20 text-center text-white w-[310px] h-[600px] m-auto",
	};
	return (
		<>
			<Modal
				isOpen={openModal}
				onRequestClose={closeModal}
				className={style.Modal}
			>
				<h2 className={style.title}>Add A Dates And Guests</h2>
				<div onClick={closeModal} className={style.close}>
					<AiOutlineClose className={style.closeIcon} />
				</div>
				<div className="text-sm lg:w-[700px] w-[250px] mx-auto gap-5">
					<div>
						<label className=" w-full ">
							Number Of Guests
							<input
								type="number"
								className={styles.input}
								value={numOfGuests}
								onChange={(e) => setNumOfGuests(e.target.value)}
							/>
						</label>
					</div>
					<div className="flex w-[220px] my-5">
						<div>
							<label className="w-1/2">
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
									className={styles.input}
								/>
							</label>
						</div>
						<div>
							<label className=" w-1/2 ">
								Departure Date
								<DatePicker
									selected={endDate}
									onChange={(date) => setEndDate(date)}
									selectsEnd
									startDate={startDate}
									placeholderText="MM/DD/YY"
									endDate={endDate}
									minDate={startDate}
									className={styles.input}
								/>
							</label>
						</div>
					</div>

					<SearchButton />
				</div>
			</Modal>
		</>
	);
}

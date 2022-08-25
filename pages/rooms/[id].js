import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import { useState, useEffect, useContext } from "react";
import Gallery from "../../components/gallery.js";
import RoomCalender from "../../components/roomcalender.js";
import Features from "../../components/features.js";
import BookingForm from "../../components/bookform.js";
import Title from "../../components/title.js";
import Prices from "../../components/prices.js";
import NotFound from "../../components/notfound.js";
import MapComp from "../../components/map.js";
import HashLoader from "react-spinners/HashLoader";
import SubmitButton from "../../components/button.js";
import moment from "moment";
import { TravelHomeContext } from "../../context/TravelHomeContext.js";
import { owner, primaryColor } from "../../lib/constants.js";
import { checkEmptyField } from "../../components/formvalidation.js";
import Loader from "../../components/loader.js";

export default function addroom(props) {
	const router = useRouter();
	const { Moralis } = useMoralis();
	const { id } = router.query;
	const {
		weiToEth,
		currentAccount,
		BookRoom,
		fetchingRoom,
		fetchBlockedDates,
	} = useContext(TravelHomeContext);
	const [blockedDates, setBlockedDates] = useState();
	const [dates, setDates] = useState({ startDate: null, endDate: null });
	const [room, setRoom] = useState([]);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [error, setError] = useState("");
	const [roomPriceByNumOfDay, setRoomPriceByNumOfDay] = useState();
	const [numOfGuest, setNumOfGuest] = useState(1);
	const [loading, setLoading] = useState(true);
	const transactionFee = roomPriceByNumOfDay * 0.15;
	const totalPrice =
		owner == currentAccount
			? roomPriceByNumOfDay
			: roomPriceByNumOfDay + transactionFee;

	const fields = [
		{ startDate: startDate },
		{ endDate: endDate },
		{ numOfGuest: numOfGuest },
	];

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

	const SubmitHandler = () => {
		const maxGuest = room.map((r) => r.maxNumOfPeople);
		if (checkEmptyField(fields)) {
			const errorField = checkEmptyField(fields);
			setError(`ERROR : Please Enter ${errorField.join(" ")}`);
		} else if (numOfGuest <= maxGuest) {
			setError("ERROR : Max Number Of Guest Exceed");
		} else {
			setLoading(true);

			console.log(numOfGuest, maxGuest);
			const dtarr = getDates(startDate, endDate);
			let id = room.map((r) => r.uid)[0];
			id = parseInt(id);
			BookRoom(dtarr, id, totalPrice);
			setLoading(false);
		}
	};

	const isBlocked = (day) => {
		if (blockedDates) {
			return blockedDates.some((date) => day.isSame(date, "day"));
		}
	};

	useEffect(() => {
		const fetchRoom = async () => {
			if (fetchingRoom(id)) {
				setLoading(true);

				const newRomm = await fetchingRoom(id);
				console.log(newRomm);
				setRoom(newRomm);
				setLoading(false);
			}
		};

		fetchRoom();
	}, [id]);

	useEffect(() => {
		const fetchDates = async () => {
			const roomId = room ? room.map((r) => r.uid) : "";

			if (fetchBlockedDates(roomId)) {
				const blocked = await fetchBlockedDates(roomId);
				setBlockedDates(blocked);
			}
		};

		fetchDates();
	}, [room]);

	useEffect(() => {
		const momentToDate = (date) => {
			return date ? moment(date).format("MM/DD/YY") : null;
		};
		const setAllDate = () => {
			setStartDate(momentToDate(dates.startDate));
			setEndDate(momentToDate(dates.endDate));
		};
		setAllDate();
	}, [dates]);

	useEffect(() => {
		const setPrices = () => {
			if (room) {
				const roomprc = room.map((r) => r.price);
				const prc = roomprc[0] * getDates(startDate, endDate).length;
				const datesd = getDates(startDate, endDate);
				setRoomPriceByNumOfDay(prc);
			}
		};
		setPrices();
	}, [startDate, endDate]);

	return (
		<div>
			{loading ? (
				<Loader />
			) : room.length >= 1 ? (
				room.map((r) => (
					<div key={r.name}>
						<div
							key={r.name}
							className="text-2xl mt-20 font-semibold"
						>
							{r.name}
						</div>
						<div
							key={r.name}
							className="font-medium underline mt-2 mb-2"
						>
							{r.location}
						</div>
						<div className="my-10">
							<Gallery images={r.img} />
						</div>

						<div key={r.name} className="flex shink gap-10">
							<div key={r.name} className="w-3/4 pr-5 ">
								<Title
									placeType={r.placeType}
									price={r.price}
									bedbath={r.bedbath}
									description={r.description}
									maxGuests={parseInt(r.maxNumOfPeople)}
								/>
								<div className="my-10">
									<Features feature={r.features} />
								</div>
								<RoomCalender
									dates={dates}
									setDates={setDates}
									isDayBlocked={isBlocked}
								/>
							</div>
							<div
								key={r.name}
								className="sticky w-[385px] text-center mb-auto"
							>
								<BookingForm
									maxNumOfPeople={parseInt(r.maxNumOfPeople)}
									dates={dates}
									setDates={setDates}
									isDayBlocked={isBlocked}
									roomPriceByNumOfDay={roomPriceByNumOfDay}
									transactionFee={transactionFee}
									setNumOfGuest={setNumOfGuest}
									numOfGuest={numOfGuest}
								/>
								{roomPriceByNumOfDay ? (
									<Prices
										roomPriceByNumOfDay={
											roomPriceByNumOfDay
										}
										transactionFee={transactionFee}
										totalPrice={totalPrice}
										account={currentAccount}
									/>
								) : (
									""
								)}
								<div className="text-red-600 text-lg font-semibold my-3">
									{error ? error : ""}
								</div>

								<SubmitButton
									className=" my-5"
									type="SubmitButton"
									onClick={SubmitHandler}
									text="Book Now"
								/>
							</div>
						</div>
					</div>
				))
			) : (
				<NotFound Title="room" />
			)}
		</div>
	);
}

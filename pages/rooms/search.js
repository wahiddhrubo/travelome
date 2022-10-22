import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { TravelHomeContext } from "../../context/TravelHomeContext.js";
import Card from "../../components/cardlong.js";
import Loader from "../../components/loader.js";

export default function Search() {
	const router = useRouter();
	const { dates, numOfGuests } = router.query;
	const { fetchRoomsByBlockedDates, fetchRoomsByGuestNumber, weiToEth } =
		useContext(TravelHomeContext);
	const [loading, setLoading] = useState(true);
	const [rooms, setRooms] = useState();
	useEffect(() => {
		const getRooms = async () => {
			if (dates && numOfGuests) {
				setLoading(true);

				const roomsByGuest = await fetchRoomsByGuestNumber(numOfGuests);
				const blockedIds = await fetchRoomsByBlockedDates(dates);
				const fetchedRooms = roomsByGuest.filter((r) => {
					return !blockedIds.includes(r.uid);
				});
				setRooms(fetchedRooms);
				console.log(roomsByGuest, blockedIds, rooms);
				setLoading(false);
			}
		};
		getRooms();
	}, [dates, numOfGuests]);

	return (
		<div>
			<Head>
				<title>Search</title>
				<meta name="description" content="Search Result" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{loading ? (
				<Loader />
			) : rooms ? (
				rooms.map((r) => (
					<div key={r.uid} className="my-20">
						<Card
							id={r.uid}
							img={r.img}
							title={r.name}
							price={weiToEth(r.price)}
							location={r.location}
							description={r.description}
						/>
					</div>
				))
			) : (
				""
			)}
		</div>
	);
}

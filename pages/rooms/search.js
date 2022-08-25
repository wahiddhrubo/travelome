import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { TravelHomeContext } from "../../context/TravelHomeContext.js";
import Card from "../../components/cardlong.js";

export default function Search() {
	const router = useRouter();
	const { dates, numOfGuests } = router.query;
	const { fetchRoomsByBlockedDates, fetchRoomsByGuestNumber, weiToEth } =
		useContext(TravelHomeContext);
	const [rooms, setRooms] = useState();
	useEffect(() => {
		const getRooms = async () => {
			if (dates && numOfGuests) {
				const roomsByGuest = await fetchRoomsByGuestNumber(numOfGuests);
				const blockedIds = await fetchRoomsByBlockedDates(dates);
				const fetchedRooms = roomsByGuest.filter((r) => {
					return !blockedIds.includes(r.uid);
				});
				setRooms(fetchedRooms);
				console.log(roomsByGuest, blockedIds, rooms);
			}
		};
		getRooms();
	}, [dates, numOfGuests]);

	return (
		<div>
			{rooms &&
				rooms.map((r) => (
					<div className="my-20">
						<Card
							id={r.uid}
							img={r.img}
							title={r.name}
							price={weiToEth(r.price)}
							location={r.location}
							description={r.description}
						/>
					</div>
				))}
		</div>
	);
}

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { primaryColor } from "../../../lib/constants.js";
import { TravelHomeContext } from "../../../context/TravelHomeContext.js";
import Card from "../../../components/cardlong.js";
import Loader from "../../../components/loader.js";

export default function Categories() {
	const router = useRouter();
	const { id } = router.query;
	const {
		fetchingRoomByLocationOrType,
		sortRoomByPrice,
		fetchingFeaturedRooms,
		weiToEth,
	} = useContext(TravelHomeContext);
	const [loading, setLoading] = useState(true);
	const [rooms, setRooms] = useState();
	useEffect(() => {
		const getRooms = async () => {
			setLoading(true);
			const locRooms = await fetchingRoomByLocationOrType(id);
			setRooms(locRooms);
			setLoading(false);
			console.log(locRooms);
		};
		getRooms();
	}, [id]);
	return (
		<div>
			<Head>
				<title>{id}</title>
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

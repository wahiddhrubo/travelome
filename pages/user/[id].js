// import Head from "next/head";
// import { useRouter } from "next/router";
// import { useMoralis } from "react-moralis";
// import { useEffect, useState, useContext } from "react";
// import { TravelHomeContext } from "../../context/TravelHomeContext.js";
// import Slider from "react-slick";
// import UserProfile from "../../components/userprofile.js";
// import Cards from "../../components/card.js";
// import ShortCard from "../../components/cardshort.js";
// import SliderComp from "../../components/slidercomponent.js";
// import NotFound from "../../components/notfound.js";
// import Loader from "../../components/loader.js";

// import SwiperCore, { EffectCoverflow, Navigation, Pagination } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";

export default function User() {
  // SwiperCore.use([Navigation, EffectCoverflow, Pagination]);
  // const router = useRouter();
  // const { Moralis } = useMoralis();
  // const [loading, setLoading] = useState(true);

  // const { id } = router.query;

  // const [user, setUser] = useState();
  // const [bookedRooms, setBookedRooms] = useState();
  // const [listedRooms, setListedRooms] = useState();
  // const {
  // 	fetchUser,
  // 	fetchRoomsByBooker,
  // 	fetchRoomsByRenter,
  // 	currentAccount,
  // 	weiToEth,
  // } = useContext(TravelHomeContext);

  // useEffect(() => {
  // 	const getUser = async () => {
  // 		setLoading(true);

  // 		const userData = await fetchUser(id);
  // 		setUser(userData);
  // 		console.log(userData);
  // 		setLoading(false);
  // 	};
  // 	getUser();
  // }, [id]);

  // useEffect(() => {
  // 	const fetchRooms = async () => {
  // 		const bookedRoomsdta = await fetchRoomsByBooker(user.ethAddress);
  // 		const listedRoomsdta = await fetchRoomsByRenter(user.ethAddress);
  // 		setBookedRooms(bookedRoomsdta);
  // 		setListedRooms(listedRoomsdta);
  // 		console.log(listedRoomsdta);
  // 	};
  // 	if (user) {
  // 		fetchRooms();
  // 	}
  // }, [user]);

  return (
    <div>
      {/* {loading ? (
				<Loader />
			) : user ? (
				<>
					<div>
						<Head>
							<title>{user.nickname}</title>
							<meta
								name="description"
								content="User Description"
							/>
							<link rel="icon" href="/favicon.ico" />
						</Head>
						<UserProfile
							userAcc={currentAccount}
							profileAcc={user.ethAddress}
							name={user.nickname}
							joinedDate={user.createdAt?.split("T")[0]}
							verified={user.authData ? true : false}
							details={user.bio}
							languages={user.languages}
							location={user.location}
							work={"Student"}
							profileImg={user.profileImg[0]}
						/>
					</div>
					<h2 className="text-black font-semibold text-2xl mb-10">
						Rooms Booked
					</h2>
					<div className="flex gap-10">
						{bookedRooms &&
							bookedRooms.map((b) => (
								<ShortCard
									key={b.uid}
									img={b.img}
									title={b.name}
									price={b.price}
									dates={b.datesBooked}
								/>
							))}
					</div>

					<hr className="border-[#ffd6d1] my-20 border-0 w-2/3 border-b-[2px]" />
					<h2 className="text-black font-semibold text-2xl mb-10">
						Rooms Listed
					</h2>
					{listedRooms && <SliderComp divs={listedRooms} />}
				</>
			) : (
				<NotFound title="user" />
			)} */}
    </div>
  );
}

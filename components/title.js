import { useState, useEffect, useContext } from "react";
import { TravelHomeContext } from "../context/TravelHomeContext.js";
import { IconContext } from "react-icons";
import { FaEthereum, FaHotel, FaHome } from "react-icons/fa";
import { MdBed } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { primaryColor } from "../lib/constants.js";

export default function Title({
	placeType,
	price,
	bedbath,
	description,
	maxGuests,
}) {
	const [longDes, setLongDes] = useState(false);

	const toggleDescrip = () => setLongDes((s) => !s);

	const customDescription = longDes ? description : description.slice(0, 250);

	const name = placeType.includes("Entire place")
		? "Entire "
		: placeType.includes("Private room")
		? "Private "
		: "Shared ";
	const { weiToEth } = useContext(TravelHomeContext);

	const HomeIcon = placeType.includes("House") ? (
		<AiOutlineHome size={25} color="black" />
	) : placeType.includes("Apartment") ? (
		<FaHome size={25} color="black" />
	) : placeType.includes("Guesthouse") ? (
		<RiHotelLine size={25} color="black" />
	) : (
		<FaHotel size={25} color="black" />
	);
	console.log(maxGuests);

	const styles = {
		name: "text-black font-semibold text-xl mb-3",
		price: `flex  text-[${primaryColor}] font-semibold text-md gap-1 my-2`,
		prcspan: `inline  text-[${primaryColor}] font-semibold text-sm my-auto`,
		bedbath: "flex  text-black font-md text-md gap-1",
		description: "my-5 pr-20 leading-7",
		iconWrapper: "flex gap-20",
		icon: " p-5 border-2 border-black w-[150px] text-lg font-semibold",
		iconDescription: "text-sm font-md my-1",
		divider: "border-[#ffd6d1] my-20 border-0 w-2/3 border-b-[2px]",
		readMore: "font-semibold cursor-pointer",
	};

	return (
		<div className="my-5">
			<div className={styles.name}>
				{!placeType.includes("Hotel")
					? `${name} ${placeType[2]} in ${placeType[0]}`
					: `${name} Room in ${placeType[0]}`}
			</div>
			<div className={styles.price}>
				<FaEthereum color="black" size={25} />
				{weiToEth(price)}
				<div className={styles.prcspan}>per Night</div>
			</div>
			<div className={styles.bedbath}>
				{bedbath[0]} BedRoom • {bedbath[1]} BathRoom
			</div>
			<hr className={styles.divider} />
			<div className={styles.name}> Learn More About This Place</div>
			<div className={styles.description}>
				{customDescription}
				{description.length >= 250 && (
					<span onClick={toggleDescrip} className={styles.readMore}>
						{!longDes && "...Read More"} {longDes && "...Show Less"}{" "}
					</span>
				)}
			</div>
			<hr className={styles.divider} />
			<div className={styles.iconWrapper}>
				<div className={styles.icon}>
					{HomeIcon}
					<br />
					{`${placeType[2]}`}
					<div className={styles.iconDescription}>{placeType[1]}</div>
				</div>
				<div className={styles.icon}>
					<MdBed size={25} color="black" />
					<br />
					{bedbath[0]} Beds
					<div className={styles.iconDescription}>
						For<b> {maxGuests} Persons</b>
					</div>
				</div>
			</div>
			<hr className={styles.divider} />
		</div>
	);
}

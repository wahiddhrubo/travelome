import {
	MdWorkOutline,
	MdAlternateEmail,
	MdOutlineVerifiedUser,
	MdSmartphone,
} from "react-icons/md";
import { IoHomeOutline, IoPhonePortraitSharp } from "react-icons/io";
import { BiMessageAlt } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { IconContext } from "react-icons";
import Image from "next/image";
import { useContext } from "react";
import { TravelHomeContext } from "../context/TravelHomeContext.js";
import Button from "./button.js";

export default function UserProfile({
	userAcc,
	profileAcc,
	name,
	joinedDate,
	verified,
	details,
	languages,
	work,
	location,
	profileImg,
}) {
	const { getBalance, isAuthenticated } = useContext(TravelHomeContext);
	const userView = userAcc == profileAcc ? true : false;
	const styles = {
		name: `text-3xl font-semibold`,
		joined: `font-medium mt-2 mb-2`,
		secondary: ` border-black  text-lg font-semibold my-5`,
		header: `text-black font-semibold text-2xl mb-3`,
		desciption: `my-5 pr-20 leading-7 font-normal text-base`,
		divider: `border-[#ffd6d1] my-20 border-0 w-2/3 border-b-[2px]`,
		icon: "inline mr-2",
		img: `rounded-full h-[150px] w-[150px] object-cover object-top`,
	};
	return (
		<div>
			<div>
				<div className="flex shrink">
					<div className="w-3/4 my-auto">
						<div className={styles.name}>
							{userView && "Hello,"}
							{!userView && "Hi, I'm"} {name}
						</div>
						<div className={styles.joined}>
							Joined in {joinedDate}
						</div>
						<div className={styles.secondary}>
							{verified ? (
								<div>
									<MdOutlineVerifiedUser
										className="inline text-green-400 mr-2"
										size={35}
									/>
									Indentity Verified
									{userView && (
										<Button
											type="DefaultButton"
											text="Withdraw Balance"
											className="my-10"
										/>
									)}
								</div>
							) : (
								""
							)}
						</div>
					</div>
					<div>
						<Image
							alt=""
							src={profileImg}
							className={styles.img}
							height={250}
							width={250}
						/>
					</div>
				</div>
				<hr className={styles.divider} />
				<div className={styles.header}>
					About
					<div className={styles.desciption}>{details}</div>
				</div>

				<hr className={styles.divider} />
				<div className={styles.secondary}>
					<AiOutlineHome className={styles.icon} size={25} /> Lives in{" "}
					{location}
				</div>
				<div className={styles.secondary}>
					<BiMessageAlt className={styles.icon} size={25} /> Speaks{" "}
					{languages.join(", ")}
				</div>
				<div className={styles.secondary}>
					<MdWorkOutline className={styles.icon} size={25} /> Works as{" "}
					{work}
				</div>

				<hr className={styles.divider} />
				<div className={styles.header}>
					Contact {name}
					<div className={styles.secondary}>
						<MdAlternateEmail className={styles.icon} size={25} />{" "}
						Email
					</div>
					<div className={styles.secondary}>
						<MdSmartphone className={styles.icon} size={25} /> Phone
					</div>
				</div>
				<hr className={styles.divider} />
			</div>
		</div>
	);
}

import React, { useContext } from "react";
import logo from "../assets/logo.svg";
import Image from "next/image";
import { TravelHomeContext } from "../context/TravelHomeContext.js";
import Link from "next/link";
import Button from "./button.js";
import DropDown from "./dropdown.js";
import SearchBar from "./searchbar.js";
import { primaryColor } from "../lib/constants.js";

export default function NavBar() {
	const styles = {
		wrapper: `flex p-5 justify-center`,
		logo: `mr-auto cursor-pointer`,
		logOut: ``,
		connect: `bg-white text-black border-black border-2 `,
		img: "object-cover object-top",
		dropDown: "my-auto",
	};

	const {
		isAuthenticated,
		nickname,
		setNickname,
		username,
		handleSetUsername,
		logOut,
		connectWallet,
		balance,
	} = useContext(TravelHomeContext);

	const connectWalletHandler = () => {
		connectWallet();
		if (ethereum.isMetaMask) {
			console.log("Metamask");
		}
	};
	return (
		<div className={styles.wrapper}>
			<Link href="/">
				<div className={styles.logo}>
					<Image
						src={logo}
						alt="Travel Home"
						height={80}
						width={120}
					/>
				</div>
			</Link>
			<div className="m-auto">
				<SearchBar />
			</div>
			{isAuthenticated ? (
				<div className={styles.dropDown}>
					<DropDown />
				</div>
			) : (
				<Button
					onClick={connectWalletHandler}
					color={primaryColor}
					text="Login"
					type="DefaultButton"
				/>
			)}
			{console.log(isAuthenticated)}
			<div className={styles.menu}></div>
		</div>
	);
}

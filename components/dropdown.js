import { useContext } from "react";
import { TravelHomeContext } from "../context/TravelHomeContext.js";
import MainButton from "./button.js";
import Link from "next/link";
import * as React from "react";
import { MenuItem, Menu, Button, Avatar } from "@mui/material";
import { primaryColor } from "../lib/constants.js";

export default function DropDown() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const {
		formattedAccount,
		nickname,
		setNickname,
		username,
		handleSetUsername,
		logOut,
		connectWallet,
		profileImg,
		balance,
		completed,
	} = useContext(TravelHomeContext);

	return (
		<div className={`text-[${primaryColor}] font-semibold text-md gap-5`}>
			{nickname && `Hello ${nickname}`}
			{!nickname && `Hello Guest`}
			<Button
				id="demo-positioned-button"
				aria-controls={open ? "demo-positioned-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				className="text-[#f12711] font-semibold text-md gap-5 hover:bg-white"
			>
				<Avatar
					src={
						profileImg
							? profileImg
							: `https://avatars.dicebear.com/api/pixel-art/${username}.svg`
					}
					className=" border-2px border-[f12711] object-top"
				/>
			</Button>
			<Menu
				aria-labelledby="demo-positioned-button"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left",
					height: "150px",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
			>
				<MenuItem className="cursor-default hover:bg-white text-black  text-md">
					Account : {formattedAccount}
				</MenuItem>
				<MenuItem className="cursor-default hover:bg-white text-black  text-md">
					Balance : {balance} MATIC
				</MenuItem>
				<hr className="my-1 text-orange-100" />
				{completed ? (
					<Link href={`/user/${username}`}>
						<MenuItem
							className={`text-black font-semibold hover:text-orange-400 hover:bg-white`}
						>
							View Profile
						</MenuItem>
					</Link>
				) : (
					<Link href={`/user`}>
						<MenuItem
							className={`text-black font-semibold hover:text-orange-400 hover:bg-white`}
						>
							Complete Profile
						</MenuItem>
					</Link>
				)}
				<Link href={`/addroom`}>
					<MenuItem
						className={`text-black font-semibold hover:text-orange-400 hover:bg-white`}
					>
						Add A Room
					</MenuItem>
				</Link>
				<MenuItem onClick={handleClose}>
					<MainButton
						text={"Log Out"}
						onClick={logOut}
						type="DefaultButton"
					/>
				</MenuItem>
			</Menu>
		</div>
	);
}

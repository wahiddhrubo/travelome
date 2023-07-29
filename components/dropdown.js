import { useContext } from "react";
import { TravelHomeContext } from "../context/TravelHomeContext.js";
import MainButton from "./button.js";
import Link from "next/link";
import * as React from "react";
import { MenuItem, Menu, Button, Avatar } from "@mui/material";
import { primaryColor } from "../lib/constants.js";
import { useSelector } from "react-redux";
import { getUser } from "../store/selectors.js";

export default function DropDown() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { formattedAccount, logOut, balance } = useSelector(getUser);

  return (
    <div className={`text-[${primaryColor}] font-semibold text-md gap-5`}>
      Hello
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="text-[#f12711] font-semibold text-md gap-5 hover:bg-white"
      ></Button>
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

        <Link href={`/addroom`}>
          <MenuItem
            className={`text-black font-semibold hover:text-orange-400 hover:bg-white`}
          >
            Add A Room
          </MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>
          <MainButton text={"Log Out"} onClick={logOut} type="DefaultButton" />
        </MenuItem>
      </Menu>
    </div>
  );
}

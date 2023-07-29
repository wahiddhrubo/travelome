import React, { useContext, useEffect } from "react";
import logo from "../assets/logo.png";
import Image from "next/image";
import { TravelHomeContext } from "../context/TravelHomeContext.js";
import Link from "next/link";
import Button from "./button.js";
import DropDown from "./dropdown.js";
import SearchBar from "./searchbar.js";
import { primaryColor } from "../lib/constants.js";
import SearchDiv from "./searchpopup.js";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/selectors";
import { CONNECT_WALLET, GET_ROOMS, LOGIN } from "../store/saga/actions";

export default function NavBar() {
  const dispatch = useDispatch();
  const styles = {
    wrapper: `flex p-5 justify-center`,
    logo: `mr-auto cursor-pointer`,
    logOut: ``,
    connect: `bg-white text-black border-black border-2 `,
    img: "object-cover object-top",
    dropDown: "my-auto",
  };

  // const {
  // 	isAuthenticated,
  // 	connectWallet,
  // } = useContext(TravelHomeContext);

  const { isAuthenticated } = useSelector(getUser);

  useEffect(() => {
    dispatch({ type: LOGIN });
  }, []);
  const connectWalletHandler = () => {
    dispatch({ type: CONNECT_WALLET });
  };
  return (
    <div className="">
      <div className="hidden lg:block">
        <div className={styles.wrapper}>
          <Link href="/">
            <div className={styles.logo}>
              <Image
                src={logo}
                className="object-contain"
                alt="Travel Home"
                height={80}
                width={180}
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
      </div>
      <div className="lg:hidden w-[300px]">
        <div className="m-auto">
          <SearchDiv />
        </div>
      </div>
    </div>
  );
}

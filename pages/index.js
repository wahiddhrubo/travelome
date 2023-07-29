import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useContext } from "react";
import { primaryColor } from "../lib/constants.js";
import { TravelHomeContext } from "../context/TravelHomeContext.js";
import SliderDiv from "../components/selectSlider.js";
import Loader from "../components/loader.js";
import Header from "../components/header.js";
import { useDispatch, useSelector } from "react-redux";
import { GET_ROOMS } from "../store/saga/actions";
import { getRooms } from "../store/selectors";

export default function Home() {
  const dispatch = useDispatch();
  const [placeType, setPlaceType] = useState("Entire place");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [loc, setLoc] = useState("Southern Asia");
  const {
    featuredRooms,
    loading,
    roomsByPlaceType,
    roomsByPropertyType,
    roomsByLoc,
  } = useSelector(getRooms);

  useEffect(() => {
    dispatch({ type: GET_ROOMS, placeType, propertyType, area: loc });
  }, [placeType, loc, propertyType]);

  const selectData = [
    {
      roomsData: roomsByLoc,
      sortBy: loc,
      setSortby: setLoc,
      label: "Sort By Location",
      options: [
        "United States",
        "United Kingdom",
        "Canada",
        "Southern Asia",
        "Europe",
      ],
    },
    {
      roomsData: roomsByPlaceType,
      sortBy: placeType,
      setSortby: setPlaceType,
      label: "Sort By Place",
      options: ["Entire place", "Private room", "Shared room"],
    },
    {
      roomsData: roomsByPropertyType,
      sortBy: propertyType,
      setSortby: setPropertyType,
      label: "Sort By Property Type",
      options: ["House", "Apartment", "Guesthouse", "Hotel"],
    },
  ];
  console.log(selectData[0].roomsData);

  return (
    <div className={styles.container}>
      <Head>
        <title>Travel Home</title>
        <meta name="description" content="Your Personal Vacation Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Header divs={featuredRooms} />
          {selectData.map((dta) => (
            <div key={dta.label} className="my-[200px]">
              <SliderDiv
                roomsData={dta.roomsData}
                sortBy={dta.sortBy}
                setSortby={dta.setSortby}
                label={dta.label}
                options={dta.options}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useContext } from "react";
import { primaryColor } from "../lib/constants.js";
import { TravelHomeContext } from "../context/TravelHomeContext.js";
import SliderDiv from "../components/selectSlider.js";
import Loader from "../components/loader.js";
import Header from "../components/header.js";

export default function Home() {
  const {
    fetchingRoomByLocationOrType,
    sortRoomByPrice,
    fetchingFeaturedRooms,
  } = useContext(TravelHomeContext);
  const [roomsByPlaceType, setRoomsByPlaceType] = useState();
  const [placeType, setPlaceType] = useState("Entire place");
  const [roomsByPropertyType, setRoomsByPropertyType] = useState();
  const [propertyType, setPropertyType] = useState("Apartment");
  const [roomsByLoc, setRoomsByLoc] = useState();
  const [loc, setLoc] = useState("Southern Asia");
  const [headerRm, setHeaderRm] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getRooms = async () => {
      setLoading(true);
      const propertyRooms = await fetchingRoomByLocationOrType(propertyType);
      setRoomsByPropertyType(propertyRooms);
      setLoading(false);
      console.log(propertyRooms);
    };
    getRooms();
  }, [propertyType]);

  useEffect(() => {
    const getRooms = async () => {
      setLoading(true);
      const placeRooms = await fetchingRoomByLocationOrType(placeType);
      setRoomsByPlaceType(placeRooms);
      setLoading(false);
      console.log(placeRooms);
    };
    getRooms();
  }, [placeType]);

  useEffect(() => {
    const getRooms = async () => {
      setLoading(true);
      const locRooms = await fetchingRoomByLocationOrType(loc);
      setRoomsByLoc(locRooms);
      setLoading(false);
      console.log(locRooms);
    };
    getRooms();
  }, [loc]);
  useEffect(() => {
    const fetchHeader = async () => {
      const hdrRm = await fetchingFeaturedRooms();
      setHeaderRm(hdrRm);
    };
    fetchHeader();
  }, []);

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
          <Header divs={headerRm} />
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

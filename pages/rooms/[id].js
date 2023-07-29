import { useRouter } from "next/router";
import Head from "next/head";

import { useState, useEffect, useContext } from "react";
import Gallery from "../../components/gallery.js";
import RoomCalender from "../../components/roomcalender.js";
import Features from "../../components/features.js";
import BookingForm from "../../components/bookform.js";
import Title from "../../components/title.js";
import Prices from "../../components/prices.js";
import NotFound from "../../components/notfound.js";
import UserBio from "../../components/userBio.js";
import HashLoader from "react-spinners/HashLoader";
import SubmitButton from "../../components/button.js";
import moment from "moment";
import { owner, primaryColor } from "../../lib/constants.js";
import { checkEmptyField } from "../../components/formvalidation.js";
import { useDispatch, useSelector } from "react-redux";
import { getSingleRoom, getUser } from "../../store/selectors.js";
import { BOOK_ROOM, GET_SINGLE_ROOMS } from "../../store/saga/actions.js";

export default function Addroom(props) {
  const router = useRouter();

  const dispatch = useDispatch();

  const { account } = useSelector(getUser);
  const { room } = useSelector(getSingleRoom);

  const { id } = router.query;
  const [blockedDates, setBlockedDates] = useState();
  const [dates, setDates] = useState({ startDate: null, endDate: null });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [roomPriceByNumOfDay, setRoomPriceByNumOfDay] = useState();
  const [numOfGuest, setNumOfGuest] = useState(1);
  const [loading, setLoading] = useState(true);
  const transactionFee = roomPriceByNumOfDay * 0.15;
  const totalPrice =
    owner == account
      ? roomPriceByNumOfDay
      : roomPriceByNumOfDay + transactionFee;

  const fields = [
    { startDate: startDate },
    { endDate: endDate },
    { numOfGuest: numOfGuest },
  ];

  const getDates = (startDate, stopDate) => {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = moment(currentDate).add(1, "days");
    }
    return dateArray;
  };

  const SubmitHandler = () => {
    const maxGuest = room.maxNumOfPeople;
    if (checkEmptyField(fields)) {
      const errorField = checkEmptyField(fields);
      setError(`ERROR : Please Enter ${errorField.join(" ")}`);
    } else if (parseInt(numOfGuest) >= parseInt(maxGuest)) {
      setError("ERROR : Max Number Of Guest Exceed");
    } else {
      setLoading(true);

      console.log(numOfGuest, maxGuest);
      const dtarr = getDates(startDate, endDate);
      let id = room.id;
      id = parseInt(id);
      dispatch({ type: BOOK_ROOM, newDate: dtarr, id, price: totalPrice });
      setLoading(false);
    }
  };

  const isBlocked = (day) => {
    if (blockedDates) {
      return blockedDates.some((date) => day.isSame(date, "day"));
    }
  };

  useEffect(() => {
    dispatch({ type: GET_SINGLE_ROOMS, id });
  }, [id]);

  useEffect(() => {
    const momentToDate = (date) => {
      return date ? moment(date).format("MM/DD/YY") : null;
    };
    const setAllDate = () => {
      setStartDate(momentToDate(dates.startDate));
      setEndDate(momentToDate(dates.endDate));
    };
    setAllDate();
  }, [dates]);

  useEffect(() => {
    const setPrices = () => {
      if (room) {
        const roomprc = room.price;
        const prc = roomprc[0] * getDates(startDate, endDate).length;
        const datesd = getDates(startDate, endDate);
        setRoomPriceByNumOfDay(prc);
      }
    };
    setPrices();
  }, [startDate, endDate]);

  console.log({ room });

  return (
    <div>
      {room && (
        <div>
          <Head>
            <title>{room.name}</title>
            <meta name="description" content="Room Description" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="text-2xl mt-20 font-semibold">{room.name}</div>
          <div className="font-medium underline mt-2 mb-2">{room.location}</div>
          <div className="my-10 ">
            <Gallery images={room.img} />
          </div>

          <div className="lg:flex hidden shink gap-10">
            <div className="lg:w-3/4 text-center lg:text-left pr-5 ">
              <Title
                placeType={room.placeType}
                price={room.price}
                bedbath={room.bedbath}
                description={room.description}
                maxGuests={parseInt(room.maxNumOfPeople)}
              />
              <div className="my-10">
                <Features feature={room.features} />
              </div>

              <RoomCalender dates={dates} setDates={setDates} />
            </div>
            <div className="sticky top-[10px] w-[385px] text-center mb-auto">
              <BookingForm
                maxNumOfPeople={parseInt(room.maxNumOfPeople)}
                dates={dates}
                setDates={setDates}
                isDayBlocked={isBlocked}
                roomPriceByNumOfDay={roomPriceByNumOfDay}
                transactionFee={transactionFee}
                setNumOfGuest={setNumOfGuest}
                numOfGuest={numOfGuest}
              />
              {roomPriceByNumOfDay ? (
                <Prices
                  roomPriceByNumOfDay={roomPriceByNumOfDay}
                  transactionFee={transactionFee}
                  totalPrice={totalPrice}
                  account={account}
                />
              ) : (
                ""
              )}
              <div className="text-red-600 text-lg font-semibold my-3">
                {error ? error : ""}
              </div>

              <SubmitButton
                className=" my-5"
                type="SubmitButton"
                onClick={SubmitHandler}
                text="Book Now"
              />
            </div>
          </div>
          <div className=" lg:hidden">
            <div className="w-full text-center px-2 ">
              <Title
                placeType={room.placeType}
                price={room.price}
                bedbath={room.bedbath}
                description={room.description}
                maxGuests={parseInt(room.maxNumOfPeople)}
              />
              <div className="my-10">
                <Features feature={room.features} />
              </div>
              <RoomCalender dates={dates} setDates={setDates} />
            </div>
            <div className=" w-[325px]  text-center mb-8">
              <BookingForm
                maxNumOfPeople={parseInt(room.maxNumOfPeople)}
                dates={dates}
                setDates={setDates}
                isDayBlocked={isBlocked}
                roomPriceByNumOfDay={roomPriceByNumOfDay}
                transactionFee={transactionFee}
                setNumOfGuest={setNumOfGuest}
                numOfGuest={numOfGuest}
              />
              {roomPriceByNumOfDay ? (
                <Prices
                  roomPriceByNumOfDay={roomPriceByNumOfDay}
                  transactionFee={transactionFee}
                  totalPrice={totalPrice}
                  account={account}
                />
              ) : (
                ""
              )}
              <div className="text-red-600 text-lg font-semibold my-3">
                {error ? error : ""}
              </div>

              <SubmitButton
                className=" my-5"
                type="SubmitButton"
                onClick={SubmitHandler}
                text="Book Now"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

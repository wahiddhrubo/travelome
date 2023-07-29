import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { TravelHomeContext } from "../../context/TravelHomeContext.js";
import Card from "../../components/cardlong.js";
import Loader from "../../components/loader.js";
import { useDispatch, useSelector } from "react-redux";
import { GET_ROOMS } from "../../store/saga/actions.js";
import { getRooms } from "../../store/selectors.js";

export default function Search() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { numOfGuests } = router.query;

  const { loading, roomsByGuestNumber: rooms } = useSelector(getRooms);
  useEffect(() => {
    dispatch({ type: GET_ROOMS, guestNumber: numOfGuests });
  }, [numOfGuests]);

  return (
    <div>
      <Head>
        <title>Search</title>
        <meta name="description" content="Search Result" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <Loader />
      ) : rooms ? (
        rooms.map((r) => (
          <div key={r.id} className="my-20">
            <Card
              id={r.id}
              img={r.img}
              title={r.name}
              price={r.price}
              location={r.location}
              description={r.description}
            />
          </div>
        ))
      ) : (
        ""
      )}
    </div>
  );
}

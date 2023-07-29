import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Card from "../../../components/cardlong.js";
import Loader from "../../../components/loader.js";
import { useDispatch, useSelector } from "react-redux";
import { GET_ROOMS } from "../../../store/saga/actions.js";
import { getRooms } from "../../../store/selectors.js";

export default function Categories() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { roomsByLoc: rooms, loading } = useSelector(getRooms);
  useEffect(() => {
    dispatch({ type: GET_ROOMS, area: id });
  }, [id]);
  return (
    <div>
      <Head>
        <title>{id}</title>
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

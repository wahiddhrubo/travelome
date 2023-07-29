import { put, call } from "redux-saga/effects";
import contactAbi from "../../../lib/TravelHomeAbi.json";
import Web3 from "web3";
import {
  addRoomSuccess,
  roomLoader,
  roomSucess,
  roomsError,
} from "../../slice/rooms";
import { AddReaction } from "@mui/icons-material";
import { singleRoomLoading, singleRoomSucess } from "../../slice/singleRoom";

const contractAddress = "0x2503E21f01787cDab5C2A7Cd81D4993266C24169";

const web3 = new Web3(process.env.NEXT_PUBLIC_ALCHEMY_SOCKET_URL);
const contract = new web3.eth.Contract(contactAbi, contractAddress);

export function* fetchRooms(action) {
  const { renter, guestNumber, area, placeType, propertyType } = action;

  try {
    const res = yield contract.getPastEvents("addRooms", {
      fromBlock: 0,
      toBlock: "latest",
    });
    const customJson = JSON.stringify(res, (key, value) => {
      // <------------
      return typeof value === "bigint" ? value.toString() : value; // <--- SOLUTION
    }); // <------------

    const events = JSON.parse(customJson);

    const result = {};
    const rooms = events.map((e) => {
      return {
        ...e.returnValues,
        price: web3.utils.fromWei(e.returnValues.price, "ether"),
      };
    });
    if (renter) {
      result.renterRooms = rooms.filter((r) => r.renter !== renter);
    }
    if (guestNumber) {
      result.roomsByGuestNumber = rooms.filter(
        (r) => parseInt(r.maxNumOfPeople) >= parseInt(guestNumber)
      );
    }
    if (area) {
      result.roomsByLoc = rooms.filter((r) => r.placeType[0] === area);
    }

    result.featuredRooms = rooms.sort(
      (prev, next) => parseInt(prev.price) - parseInt(next.price)
    );

    if (placeType) {
      result.roomsByPlaceType = rooms.filter(
        (r) => r.placeType[1] === placeType
      );
    }
    if (propertyType) {
      result.roomsByPropertyType = rooms.filter(
        (r) => r.placeType[2] === propertyType
      );
    }

    yield put(roomSucess(result));
  } catch (error) {
    console.log(error);
    yield put(roomsError(error));
  }
}
export function* fetchSingleRoom(action) {
  const { id } = action;

  yield put(singleRoomLoading());
  try {
    const res = yield contract.getPastEvents("addRooms", {
      fromBlock: 0,
      toBlock: "latest",
    });
    const customJson = JSON.stringify(res, (key, value) => {
      // <------------
      return typeof value === "bigint" ? value.toString() : value; // <--- SOLUTION
    }); // <------------

    const events = JSON.parse(customJson);
    const room = events
      .map((e) => {
        return {
          ...e.returnValues,
          price: parseInt(web3.utils.fromWei(e.returnValues.price, "ether")),
        };
      })
      .filter((e) => e.id === id)[0];
    console.log(room);
    yield put(singleRoomSucess({ room }));
  } catch (error) {
    console.log(error);
    yield put(roomsError(error));
  }
}

export function* addRoom(action) {
  const {
    name,
    description,
    location,
    img,
    maxNumOfPeople,
    features,
    latitude,
    longitude,
    bed,
    bath,
    city,
    placeType: roomType,
    propertyType,
    price,
  } = action;
  yield put(roomLoader());

  window.ethereum.enable();
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(contactAbi, contractAddress);

  const functionName = "addRoom";
  const { account: address } = yield select(getUser);
  const latlong = [latitude, longitude];
  const bedbath = [bed, bath];
  const placeType = [city, roomType, propertyType];
  const totalPrice = web3.utils.fromWei(price, "wei");
  if (address[0]) {
    try {
      const transactionObject = contract.methods[functionName](
        name,
        description,
        location,
        img,
        latlong,
        bedbath,
        placeType,
        totalPrice,
        maxNumOfPeople,
        features
      );
      const receipt = yield transactionObject.send({
        from: address[0],
      });

      yield put(addRoomSuccess(receipt));
    } catch (err) {
      console.log(err);
      yield put(bookingError(err));
    }
  }
}

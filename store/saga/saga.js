import { takeLatest } from "redux-saga/effects";
import {
  BOOK_ROOM,
  CONNECT_WALLET,
  GET_ROOMS,
  GET_SINGLE_ROOMS,
  LOGIN,
} from "./actions";
import { connectWallet, loadUser } from "./handlers/user";
import { fetchRooms, fetchSingleRoom } from "./handlers/rooms";
import { bookRoom } from "./handlers/booking";

export default function* rootSaga() {
  yield takeLatest(CONNECT_WALLET, connectWallet);
  yield takeLatest(GET_ROOMS, fetchRooms);
  yield takeLatest(LOGIN, loadUser);
  yield takeLatest(BOOK_ROOM, bookRoom);
  yield takeLatest(GET_SINGLE_ROOMS, fetchSingleRoom);
}

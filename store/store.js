import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/saga.js";
import roomsSlice from "./slice/rooms.js";
import bookingSlice from "./slice/booking.js";
import userSlice from "./slice/user.js";
import singleRoomSlice from "./slice/singleRoom.js";

const sagaMiddleware = createSagaMiddleware();
const middleware = (getDefaultMiddleware) => [
  ...getDefaultMiddleware({ thunk: false }),
  sagaMiddleware,
];

const store = configureStore({
  reducer: {
    rooms: roomsSlice,
    singleRoom: singleRoomSlice,
    user: userSlice,
    booking: bookingSlice,
  },
  middleware,
});

sagaMiddleware.run(rootSaga);

export default store;

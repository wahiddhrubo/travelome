import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    roomLoader: (state, action) => {
      state.loading = true;
    },

    roomSucess: (state, action) => {
      state.loading = false;
      state.rooms = action.payload.rooms;
      state.renterRooms = action.payload.renterRooms;
      state.roomsByGuestNumber = action.payload.roomsByGuestNumber;
      state.roomsByLoc = action.payload.roomsByLoc;
      state.roomsByPlaceType = action.payload.roomsByPlaceType;
      state.featuredRooms = action.payload.featuredRooms;
      state.roomsByPropertyType = action.payload.roomsByPropertyType;
    },
    roomsError: (state, action) => {
      state.loading = false;
    },
  },
});

export const { weiToEth, roomLoader, roomSucess, roomsError } =
  roomSlice.actions;
export default roomSlice.reducer;

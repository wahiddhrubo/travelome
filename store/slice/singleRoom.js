import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const singleRoomSlice = createSlice({
  name: "singleRoom",
  initialState,
  reducers: {
    singleRoomLoading: (state, action) => {
      state.loading = true;
    },
    singleRoomSucess: (state, action) => {
      state.loading = false;
      state.room = action.payload.room;
    },
  },
});

export const { singleRoomLoading, singleRoomSucess } = singleRoomSlice.actions;
export default singleRoomSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    bookingSucess: (state, action) => {
      state.loading = false;
      state.sucess = true;
    },
    bookingLoading: (state, action) => {
      state.loading = true;
    },
    bookingError: (state, action) => {
      console.log(action.payload);
      state.error = action.payload.message;
      state.loading = false;
    },
  },
});

export const {
  updateOrders,
  getSingleOrder,
  bookingSucess,
  bookingLoading,
  bookingError,
} = bookingSlice.actions;
export default bookingSlice.reducer;

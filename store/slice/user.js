import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoading: (state, action) => {
      state.loading = true;
    },
    connectWalletSucess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.account = action.payload.account;
      state.balance = action.payload.balance;
      state.formattedAccount = action.payload.formattedAccount;
    },
    loadSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.emailSentSuccess = true;
    },

    logoutSuccess: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    onError: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
  },
});

export const { loadSuccess, connectWalletSucess } = userSlice.actions;
export default userSlice.reducer;

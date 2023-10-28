import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userId: null,
  expirationTime: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authentication(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.expirationTime = action.payload.expirationTime;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    logout(state) {
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;

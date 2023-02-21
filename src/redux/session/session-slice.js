import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = " https://wallet.goit.ua/api";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    isAuth: false,
    token: null,
    isShown: true,
    modal: { isOpen: false, data: {}, type: "" },
  },
  reducers: {
    loggedIn(state) {
      token.set(state.token);
      state.isAuth = true;
    },
    loggedOff(state) {
      state.isAuth = false;
      state.token = null;
      token.unset();
    },
    setToken(state, { payload }) {
      token.set(payload);
      state.token = payload;
    },
    isButtonShown(state, { payload }) {
      state.isShown = payload;
    },
    setModal(state, { payload }) {
      state.modal = payload;
    },
    closeModal(state) {
      state.modal = { isOpen: false, data: {}, type: "" };
    },
  },
});

export const {
  loggedIn,
  loggedOff,
  setToken,
  isButtonShown,
  setModal,
  closeModal,
} = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;

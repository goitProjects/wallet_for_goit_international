import { createSlice } from "@reduxjs/toolkit";

import { getCategories } from "./categories-thunk";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    data: {},
    error: "",
    isLoading: false,
  },
  extraReducers: {
    [getCategories.pending]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [getCategories.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    },
    [getCategories.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const categoriesReducer = categoriesSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import prepareCategories from "services/categories";

export const getCategories = createAsyncThunk(
  "getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/transaction-categories");
      return prepareCategories(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

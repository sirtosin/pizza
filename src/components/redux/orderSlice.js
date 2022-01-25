import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAsyncOrder = createAsyncThunk(
  "order/fetchAsyncOrder",
  async () => {
    const response = await axios.get(`http://localhost:7000/api/v1/order`);
    return response.data;
  }
);

export const fetchAsyncOrderDetail = createAsyncThunk(
  "order/fetchAsyncOrderDetail",
  async (id) => {
    const response = await axios.get(
      `http://localhost:7000/api/v1/order/${id}`
    );
    return response.data;
  }
);

const initialState = {
  order: {},
  selectOrder: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAsyncOrder.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncOrder.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, order: payload };
    },
    [fetchAsyncOrder.rejected]: () => {
      console.log("Rejected!");
    },
    [fetchAsyncOrderDetail.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, selectOrder: payload };
    },
  },
});

export default orderSlice.reducer;

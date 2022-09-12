import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderThunk } from "./createOrderThunk";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  createOrderThunk
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderItems: localStorage.getItem("orderItems")
      ? JSON.parse(localStorage.getItem("orderItems"))
      : [],
    loading: false,
    success: false,
  },
  reducers: {
    setOrder: (state, { payload }) => {
      state.orderItems = payload;
    },
  },
  extraReducers: {
    [createOrder.pending]: (state) => {
      state.loading = true;
    },
    [createOrder.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.orderItems = payload;
    },
    [createOrder.pending]: (state) => {
      state.loading = false;
    },
  },
});

export const { setOrder } = orderSlice.actions;

export default orderSlice.reducer;

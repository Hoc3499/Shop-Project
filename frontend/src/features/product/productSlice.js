import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productThunk } from "./productThunk";

// const cartItemsFromStorage = localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];

export const getProduct = createAsyncThunk(
  "product/getProduct",
  productThunk
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    product: {},
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getProduct.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getProduct.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.product = payload;
    },
    [getProduct.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export default productSlice.reducer;

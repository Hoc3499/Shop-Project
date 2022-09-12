import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productsThunk } from "./productsThunk";

// const cartItemsFromStorage = localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];

export const getProducts = createAsyncThunk(
  "products/getProducts",
  productsThunk
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.products = payload;
    },
    [getProducts.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export default productsSlice.reducer;

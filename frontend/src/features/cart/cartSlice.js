import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
    totalQty: localStorage.getItem("totalQty")
      ? JSON.parse(localStorage.getItem("totalQty"))
      : 0,
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? JSON.parse(localStorage.getItem("paymentMethod"))
      : "",
  },
  reducers: {
    addToCart: (state, { payload }) => {
      state.totalQty++;
      const newItem = payload;
      const existItem = state.items.find((item) => item.id === newItem.id);

      if (!existItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          img: newItem.img,
          price: newItem.price,
          totalPrice: newItem.price * newItem.qty,
          countInStock: newItem.countInStock,
          qty: newItem.qty,
        });
      } else {
        existItem.qty++;
        existItem.totalPrice = existItem.totalPrice + newItem.price;
      }
    },
    removeCartItem(state, { payload }) {
      state.totalQty--;
      const id = payload;
      const existItem = state.items.find((item) => item.id === id);
      if (existItem.qty === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existItem.qty--;
        existItem.totalPrice = existItem.totalPrice - existItem.price;
      }
    },
    setCart: (state, { payload }) => {
      state.items = payload;
    },
    saveShippingAddress: (state, { payload }) => {
      state.shippingAddress = payload;
      localStorage.setItem("shippingAddress", JSON.stringify(payload));
    },
    setShippingAddress: (state, { payload }) => {
      state.shippingAddress = payload;
    },
    savePaymentMethod: (state, { payload }) => {
      console.log(payload);
      state.paymentMethod = payload;
      localStorage.setItem("paymentMethod", JSON.stringify(payload));
    },
    setPaymentMethod: (state, { payload }) => {
      state.paymentMethod = payload;
    },
  },
});

export const {
  addToCart,
  removeCartItem,
  setCart,
  saveShippingAddress,
  setShippingAddress,
  savePaymentMethod,
  setPaymentMethod
} = cartSlice.actions;

export default cartSlice.reducer;

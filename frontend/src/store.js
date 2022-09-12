import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart/cartSlice";
import productSlice from "./features/product/productSlice";
import productsSlice from "./features/product/productsSlice";
import userSlice from "./features/user/userSlice";
import orderSlice from "./features/orders/orderSlice";


const store = configureStore({
  reducer: {
    products: productsSlice,
    product: productSlice,
    cart: cartSlice,
    user: userSlice,
    order: orderSlice,
  },
});

export default store;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { useParams, useLocation } from "react-router-dom";

const CartScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const productId = params.id;
  const location = useLocation();

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  return <h1>CartScreen</h1>;
};

export default CartScreen;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CheckoutStep from "../components/CheckoutSteps";
import Navbar from "../components/Navbar";
import {
  savePaymentMethod,
  setPaymentMethod,
} from "../features/cart/cartSlice";
/* ${mobile({ width: "75%" })} */

const Container = styled.div`
  width: 100vw;
  /* height: 100vh; */
  display: flex;
  margin-top: 50px;
  align-items: center;
  flex-direction: column;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const FormGroup = styled.div`
  display: flex;
  align-items: center;
`;

const PaymentMethod = styled.input``;

const Button = styled.button`
  width: 40%;
  margin-top: 20px;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { paymentMethod, shippingAddress } = cart;

  if (!shippingAddress) {
    navigate("/shipping");
  }

  useEffect(() => {
    if (localStorage.getItem("paymentMethod")) {
      dispatch(
        setPaymentMethod(JSON.parse(localStorage.getItem("paymentMethod")))
      );
    }
  }, [dispatch]);

  const [payment, setPayment] = useState(paymentMethod);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(payment));
    navigate("/placeorder");
  };

  return (
    <>
      <Navbar />
      <Container>
        <CheckoutStep step1 step2 step3 />
        <Wrapper>
          <Title>Payment Method</Title>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <PaymentMethod
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="PayPal or Credit Card"
                checked={payment === "PayPal or Credit Card"}
                onChange={(e) => setPayment(e.target.value)}
              />
              <label>PayPal or Credit Card</label>
            </FormGroup>
            <FormGroup>
              <PaymentMethod
                type="radio"
                id="visa"
                name="paymentMethod"
                value="Visa"
                checked={payment === "Visa"}
                onChange={(e) => setPayment(e.target.value)}
              />
              <label>Visa</label>
            </FormGroup>
            <Button>CONTINUE</Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Payment;

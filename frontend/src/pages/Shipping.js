import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import CheckoutSteps from "../components/CheckoutSteps";
import Navbar from "../components/Navbar";
import { saveShippingAddress } from "../features/cart/cartSlice";
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

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  margin-top: 20px;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  const initialState = {
    address: shippingAddress.address || "",
    city: shippingAddress.city || "",
    postalCode: shippingAddress.postalCode || "",
    country: shippingAddress.country || "",
  };

  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    const { address, city, postalCode, country } = values;
    e.preventDefault();
    if (!address || !city || !postalCode || !country) {
      toast.error("Please fill out all fields");
      return;
    }
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };

  return (
    <>
      <Navbar />
      <Container>
        <CheckoutSteps step1 step2 />
        <Wrapper>
          <Title>SHIPPING</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              value={values.address}
              onChange={handleChange}
              name="address"
              placeholder="Name"
            />
            <Input
              type="text"
              value={values.city}
              onChange={handleChange}
              name="city"
              placeholder="City"
            />
            <Input
              type="text"
              value={values.postalCode}
              onChange={handleChange}
              name="postalCode"
              placeholder="Postal Code"
            />
            <Input
              type="text"
              value={values.country}
              onChange={handleChange}
              name="country"
              placeholder="Country"
            />
            <Button>CONTINUE</Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Shipping;

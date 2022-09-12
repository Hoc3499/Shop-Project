import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CheckoutStep from "../components/CheckoutSteps";
import Navbar from "../components/Navbar";
import { createOrder, setOrder } from "../features/orders/orderSlice";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  margin-top: 50px;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;  
  width: 100%;
`;

const WrapperLeft = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Shipping = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
`;

const ShippingText = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const ShippingAddress = styled.div``;

const Payment = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
`;

const PaymentText = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const PaymentMethod = styled.span``;

const InfoText = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Hr = styled.hr`
  background-color: #ccc;
  border: none;
  height: 1px;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", marginBottom: "20px" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 100px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({ marginBottom: "10px" })}
`;

const ProductAmount = styled.div`
  font-size: 16px;
  margin: 5px;
  font-weight: 200;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 54vh;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
`;
const SummaryItemText = styled.span`
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order);


  const { items, shippingAddress, paymentMethod } = cart;
  const { orderItems } = order;

  useEffect(() => {
    localStorage.setItem("orderItems", JSON.stringify(orderItems));
  }, [orderItems]);

  const subTotalPrice = items.reduce(
    (totalPrice, item) => totalPrice + item.totalPrice,
    0
  );
  const shippingPrice = subTotalPrice > 100 ? 0 : subTotalPrice * 0.05;
  const taxPrice = subTotalPrice * 0.07;

  const totalPrice = subTotalPrice + shippingPrice + taxPrice;

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("orderItems")) {
      dispatch(setOrder(JSON.parse(localStorage.getItem("orderItems"))));
    }
  }, [dispatch]);

  // useEffect(() => {
  //   if (success) {
  //     navigate(`/order/${orderItems._id}`);
  //   }
  // }, [navigate, success, orderItems]);

  const handlePlaceOrder = () => {
    dispatch(
      createOrder({
        orderItems: items,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: subTotalPrice,
        taxPrice: taxPrice,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice,
      })
    );
  };

  return (
    <>
      <Navbar />
      <Container>
        <CheckoutStep step1 step2 step3 step4 />
        <Wrapper>
          <WrapperLeft>
            <Shipping>
              <ShippingText>SHIPPING</ShippingText>
              <ShippingAddress>
                Address: {shippingAddress.address}, {shippingAddress.city}{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </ShippingAddress>
            </Shipping>
            <Hr />
            <Payment>
              <PaymentText>PAYMENT METHOD</PaymentText>
              <PaymentMethod>Method: {paymentMethod}</PaymentMethod>
            </Payment>
            <Hr />
            <Info>
              <InfoText>ORDER ITEMS</InfoText>
              {items.map((item, index) => (
                <div key={index}>
                  <Product>
                    <ProductDetail>
                      <Image src={item.img} />
                      <Details>
                        <ProductName>{item.name}</ProductName>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <ProductAmount>
                          {item.qty} x ${item.price} = $
                          {item.totalPrice.toFixed(2)}
                        </ProductAmount>
                      </ProductAmountContainer>
                    </PriceDetail>
                  </Product>
                  <Hr />
                </div>
              ))}
            </Info>
          </WrapperLeft>

          <Bottom>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>
                  $ {subTotalPrice.toFixed(2)}
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Price</SummaryItemText>
                <SummaryItemPrice>
                  $ {shippingPrice.toFixed(2)}
                </SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Tax Price</SummaryItemText>
                <SummaryItemPrice>$ {taxPrice.toFixed(2)}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText type="total">Total</SummaryItemText>
                <SummaryItemPrice>$ {totalPrice.toFixed(2)}</SummaryItemPrice>
              </SummaryItem>
              <Button onClick={handlePlaceOrder}>PLACE ORDER</Button>
            </Summary>
          </Bottom>
        </Wrapper>
      </Container>
    </>
  );
};

export default PlaceOrder;

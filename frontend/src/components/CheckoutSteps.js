import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
`;
const Wrapper = styled.div`
  display: flex;
  justify-items: center;
`;
const Step = styled.div`
  margin-left: 20px;
  font-size: 20px;
  color: black;
  font-weight: 600;
`;

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Container>
      <Wrapper>
        {step1 ? (
          <Step>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/login"
            >
              Sign In
            </Link>
          </Step>
        ) : (
          <Step>
            <Link
              style={{
                textDecoration: "none",
                color: "#ccc",
                cursor: "not-allowed",
              }}
              to="/login"
              onClick={(e) => e.preventDefault()}
            >
              Sign In
            </Link>
          </Step>
        )}
        {step2 ? (
          <Step>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/shipping"
            >
              Shipping
            </Link>
          </Step>
        ) : (
          <Step>
            <Link
              style={{
                textDecoration: "none",
                color: "#ccc",
                cursor: "not-allowed",
              }}
              to="/shipping"
              onClick={(e) => e.preventDefault()}
            >
              Shipping
            </Link>
          </Step>
        )}
        {step3 ? (
          <Step>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/payment"
            >
              Payment
            </Link>
          </Step>
        ) : (
          <Step>
            <Link
              style={{
                textDecoration: "none",
                color: "#ccc",
                cursor: "not-allowed",
              }}
              to="/payment"
              onClick={(e) => e.preventDefault()}
            >
              Payment
            </Link>
          </Step>
        )}
        {step4 ? (
          <Step>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/placeorder"
            >
              Place Order
            </Link>
          </Step>
        ) : (
          <Step>
            <Link
              style={{
                textDecoration: "none",
                color: "#ccc",
                cursor: "not-allowed",
              }}
              to="/placeorder"
              onClick={(e) => e.preventDefault()}
            >
              Place Order
            </Link>
          </Step>
        )}
      </Wrapper>
    </Container>
  );
};

export default CheckoutSteps;

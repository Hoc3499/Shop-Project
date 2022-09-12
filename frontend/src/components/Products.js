import React from "react";
import styled from "styled-components";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;
const Products = () => {
  return (
    <Container>
      <Product />
    </Container>
  );
};

export default Products;

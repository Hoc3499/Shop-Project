import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", padding:"0px"})}

`;

const Categories = () => {
  return (
    <Container>
      <CategoryItem />
    </Container>
  );
};

export default Categories;

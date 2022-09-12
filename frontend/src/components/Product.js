import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getProducts } from "../features/product/productsSlice";
import Loading from "./Loading";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 300px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 80%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease-in;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const Product = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);
  const { products, loading } = productList;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          {products.map((item, index) => (
            <Container key={index}>
              <Circle />
              <Image src={item.img} />
              <Info>
                <Link to={`/product/${item._id}`}>
                  <Icon>
                    <SearchOutlinedIcon />
                  </Icon>
                </Link>
                <Icon>
                  <FavoriteBorderOutlinedIcon />
                </Icon>
              </Info>
            </Container>
          ))}
        </>
      )}
    </>
  );
};

export default Product;

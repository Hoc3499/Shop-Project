import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Rating from "../components/Rating";
import { addToCart } from "../features/cart/cartSlice";
import { getProduct } from "../features/product/productSlice";
import { mobile } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ flexDirection: "column", padding: "10px" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 95vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 32px;
`;

const PriceText = styled.span`
  font-weight: 400;
  font-size: 28px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Status = styled.span`
  font-weight: 100;
  font-size: 32px;
`;

const StatusText = styled.span`
  font-weight: 400;
  font-size: 28px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;
const WrapperQty = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;
const QtyText = styled.span`
  font-size: 28px;
  font-weight: 400;
  margin-right: 20px;
  ${mobile({ margin: "0" })}
`;
const QtyDetails = styled.span`
  font-weight: 100;
  font-size: 32px;
`;

const Product = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product);
  const { loading, product } = productList;
  console.log(loading);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [id, dispatch]);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        img: product.img,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      })
    );
    toast.success("Add item!");
    navigate(`/cart/${id}`);
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <Wrapper>
            <ImgContainer>
              <Image src={product?.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product?.name}</Title>
              <Desc>{product?.description}</Desc>
              <Rating
                value={product?.rating}
                text={`${product?.numReviews} reviews`}
              />
              <Price>
                <PriceText>Price:</PriceText> $ {product?.price}
              </Price>
              <AddContainer>
                <Status>
                  <StatusText>Status:</StatusText>{" "}
                  {product?.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                </Status>
                {product?.countInStock > 0 && (
                  <WrapperQty>
                    <QtyText>Quantity:</QtyText>
                    <QtyDetails>{product?.countInStock}</QtyDetails>
                  </WrapperQty>
                )}
                <Button
                  onClick={addToCartHandler}
                  disabled={product?.countInStock === 0}
                >
                  ADD TO CART
                </Button>
              </AddContainer>
            </InfoContainer>
          </Wrapper>
        </>
      )}

      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;

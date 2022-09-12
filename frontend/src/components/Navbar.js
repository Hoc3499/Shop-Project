import { Search } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logOutUser, setIsVisible } from "../features/user/userSlice";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: " 0" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  padding: 5px;
  ${mobile({ marginLeft: "10px" })}
`;

const Input = styled.input`
  border: none;
  outline: none;

  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center" })}
`;

const WrapperUser = styled.div`
  position: relative;
`;
const User = styled.button`
  display: flex;
  align-items: center;
  padding: 5px 15px;
  cursor: pointer;
`;
const UserName = styled.span`
  margin-left: 5px;
  font-size: 16px;
  font-weight: 500;
`;

const LogOut = styled.button`
  position: absolute;
  top: 75px;
  width: 100%;
  font-size: 17px;
  z-index: 3;
  border: 1px solid #ccc;
  cursor: pointer;
`;
const Profile = styled.button`
  position: absolute;
  top: 45px;
  width: 100%;
  font-size: 17px;
  z-index: 3;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  text-decoration: none;
  ${mobile({ fontSize: "12px", marginRight: "5px" })}
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const totalQty = useSelector((state) => state.cart.totalQty);
  const userInfo = useSelector((state) => state.user);
  const isLogIn = useSelector((state) => state.user.isLogIn);
  
  const { user, isVisible } = userInfo;

  useEffect(() => {
    localStorage.setItem("totalQty", JSON.stringify(totalQty));
  }, [totalQty]);

  const handleLogOut = () => {
    dispatch(logOutUser())
    navigate('/')
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input placeholder="Search..." />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
          <Center>
            <Logo>SHOP</Logo>
          </Center>
        <Right>
          {isLogIn ? (
            <WrapperUser>
              <User onClick={() => dispatch(setIsVisible())}>
                <AccountCircleIcon />
                <UserName>{user.name}</UserName>
                <ArrowDropDownIcon />
              </User>
              {isVisible && (
                <>
                  <Link to="/profile" style={{textDecoration: "none"}}>
                    <Profile>Profile</Profile>
                  </Link>
                  <LogOut onClick={handleLogOut}>LogOut</LogOut>
                </>
              )}
            </WrapperUser>
          ) : (
            <>
              {" "}
              <MenuItem>
                <Link to="/register">REGISTER </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/login" id="RouterLink">
                  SIGNIN
                </Link>
              </MenuItem>
            </>
          )}

          <MenuItem>
            <Link to="/cart">
              <Badge badgeContent={totalQty} color="primary">
                <ShoppingCartIcon color="action" />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

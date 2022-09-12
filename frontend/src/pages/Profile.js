import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { updateUser } from "../features/user/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ${mobile({ width: "75%" })} */

const Container = styled.div`
  width: 100vw;
  /* height: 100vh; */
  display: flex;
  margin-top: 50px;
  /* align-items: center; */
  justify-content: center;
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

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const initialState = {
    name: user.name,
    email: user.email,
    password: "",
    confirmPassword: "",
  };

  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    const { name, email, password, confirmPassword } = values;
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      dispatch(
        updateUser({
          name,
          email,
          password,
        })
      );
    }
    setValues({ ...values, password: "", confirmPassword: "" });
  };

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>USER PROFILE</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              value={values.name}
              onChange={handleChange}
              name="name"
              placeholder="name"
            />
            <Input
              type="email"
              value={values.email}
              onChange={handleChange}
              name="email"
              placeholder="email"
            />
            <Input
              type="password"
              value={values.password}
              onChange={handleChange}
              name="password"
              placeholder="password"
            />
            <Input
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              placeholder="confirm password"
            />
            <Button>UPDATE</Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Profile;

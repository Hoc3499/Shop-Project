import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
import { registerUser, setIsLogIn } from "../features/user/userSlice";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.1)
    ),
    url("https://timviec365.vn/pictures/news/2019/07/25/xqk1564050756.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    const { name, email, password, confirmPassword } = values;
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill out all fields");
      return;
    } else if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      dispatch(
        registerUser({
          name,
          email,
          password,
        })
      );
     dispatch(setIsLogIn(true));
      setValues({ name: "", email: "", password: "", confirmPassword: "" });
    }
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, [navigate, user]);
  return (
    <Container>
      <Wrapper>
        <Title>CREATE ACCOUNT</Title>
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
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY. </b>
            <Link to="/login">Already account</Link>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;

import React from "react";
import styled from "styled-components";

const LoadingIcon = styled.div`
  width: 40px;
  height: 40px;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  border-bottom: 1px solid gray;
  margin: 0 auto;

  border-radius: 50%;
  border-top-color: transparent;
  animation: spinner 1s linear infinite;

  @keyframes spinner {
    to {
    transform: rotate(360deg);
  }
  }
`;


const Loading = () => {
  return <LoadingIcon />
};

export default Loading;

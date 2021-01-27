import React from 'react';
import styled from "styled-components";
import GlobalStyle from "./constants/GlobalStyles";
import Router from './Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const styles = {
  wrapper: {
    height: "100vh",
  }
};




const Wrapper = styled('div')(styles.wrapper)

function App() {
  return (
    <Wrapper className="App">
      <GlobalStyle />
      <Router />
      <ToastContainer />
    </Wrapper>
  );
}

export default App;

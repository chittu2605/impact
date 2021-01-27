import React from 'react';
import styled from "styled-components";
import GlobalStyle from "./constants/GlobalStyles";
import Router from './Router';

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
    </Wrapper>
  );
}

export default App;

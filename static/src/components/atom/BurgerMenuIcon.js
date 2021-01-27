import React from "react";
import styled from "styled-components";

const styles = {
  div: {
    width: "35px",
    height: "5px",
    backgroundColor: "white",
    margin: "6px 0",
  }
}


const StyledDiv = styled("div")(styles.div)

const BurgerMenuIcon = () => {
  return (
    <>
      <StyledDiv></StyledDiv>
      <StyledDiv></StyledDiv>
      <StyledDiv></StyledDiv>
    </>
  )
}

export default BurgerMenuIcon;
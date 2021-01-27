import React from "react";
import styled from "styled-components";

const styles = {
    logoImage: {
        backgroundBlendMode: "difference",
    }
}

const LogoImage = styled("img")(styles.logoImage);

const Logo = () => {
    return (
        <LogoImage src={require("../../assets/images/impact-white.png")} />
    )
} 

export default Logo;
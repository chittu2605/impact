import React from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box"
import { rem } from "polished";
import { device } from "../../utils/mediaQueries/device";
import LoginForgotForm from "../organisms/LoginForgotForm";
import LogoImage  from "./../../assets/images/impact.png";
const styles = {
    wrapper: {
        backgroundImage: `linear-gradient(50deg,rgba(10, 10, 10, 0.7), rgba(54, 180, 238, 0.7)), url(${require("../../assets/images/login-bg.jpg")})`,
        height: "100%",
        backgroundSize: "cover",

    },

    backgroundImage: {
    },

    form: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: rem("16px"),
        background: "rgba(0, 0, 0, 0.2784313725490196);",
        boxShadow: "3px 4px 8px 2px rgba(0,0,0,0.3)",
        width: "80%",
        [device.tablet]: {
            maxWidth: rem("550px"),
        }

    },

    logo: {
        display: "block",
        margin: "auto",
        width: "45%",
    },

}

const Wrapper = styled(Box)(styles.wrapper);
const Form = styled('form')(styles.form);
const Logo = styled("img")(styles.logo);


const Login = (props) => {

        
        return (
            <Wrapper>
                <Form >
                    <Logo src={LogoImage} />
                    <LoginForgotForm />
                </Form>
            </Wrapper>
        )
}

export default Login;
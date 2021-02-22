import React from "react";
import styled from "styled-components";
import LoginForm from "../molecules/LoginForm";
import { SECONDARY_COLOR } from "../../constants/colors";
import ForgotPasswordForm from "../molecules/ForgotPasswordForm";
import {
  FORGOT_PASSWORD_TEXT,
  ALREADY_HAVE_ACCOUNT_TEXT,
  LOGIN_NOW_TEXT,
} from "../../constants/Login";
import AnimateHeight from "react-animate-height";
import OtpForm from "../molecules/OtpForm";

const styles = {
  forgotPassword: {
    textAlign: "center",
    color: SECONDARY_COLOR,
    cursor: "pointer",
  },

  signInNow: {
    cursor: "pointer",
    fontWeight: 500,
  },

  alreadyAccount: {
    textAlign: "center",
    color: SECONDARY_COLOR,
  },
};

const ForgotPassword = styled("p")(styles.forgotPassword);
const SignInNow = styled("span")(styles.signInNow);
const AlreadyAccount = styled("p")(styles.alreadyAccount);

class LoginForgotForm extends React.Component {
  state = {
    showLoginForm: true,
    height: 265,
    showOtpForm: false,
  };

  toggleLoginForm = (props) => {
    this.setState(
      {
        showLoginForm: !this.state.showLoginForm,
      },
      () => {
        this.toggle();
      }
    );
  };

  setOtpForm = () => {
    this.setState({ showOtpForm: true });
  };

  toggle = () => {
    const { height } = this.state;

    this.setState({
      height: height === 365 ? 265 : 365,
    });
  };

  render() {
    let { showLoginForm, height, showOtpForm } = this.state;
    return (
      <AnimateHeight
        duration={500}
        // height={ height }
      >
        {showOtpForm ? (
          <OtpForm />
        ) : showLoginForm ? (
          <LoginForm otpCB={this.setOtpForm} />
        ) : (
          // <OtpForm />
          <ForgotPasswordForm />
        )}

        {!showOtpForm && showLoginForm ? (
          <ForgotPassword onClick={this.toggleLoginForm}>
            {FORGOT_PASSWORD_TEXT}
          </ForgotPassword>
        ) : (
          !showOtpForm && (
            <AlreadyAccount>
              {ALREADY_HAVE_ACCOUNT_TEXT}
              <SignInNow onClick={this.toggleLoginForm}>
                {LOGIN_NOW_TEXT}
              </SignInNow>
            </AlreadyAccount>
          )
        )}
      </AnimateHeight>
    );
  }
}

export default LoginForgotForm;

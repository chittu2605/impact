import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import styled from "styled-components";
import clsx from "clsx";
import { rem } from "polished";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../constants/colors";
import { otpAction } from "../../redux/actions/login";

const styles = {
  wrapper: {
    marginTop: rem("16px"),
  },

  formInput: {
    width: "100%",
    marginBottom: "0.5rem",
    color: SECONDARY_COLOR,
    label: {
      color: `${PRIMARY_COLOR} `,
    },
    ".MuiFormLabel-root.Mui-focused": {
      color: `${PRIMARY_COLOR} `,

      "&.Mui-error": {
        color: "red",
      },
    },
  },
  FormInputBorderColor: {
    borderColor: `${SECONDARY_COLOR} !important`,
  },

  button: {
    width: "100%",
    background: PRIMARY_COLOR,
    color: "white ",
    marginTop: rem("16px"),
    border: "1px solid white",
    transition: "0.2s",

    "&:hover": {
      background: "white",
      color: PRIMARY_COLOR,
      border: `1px solid ${PRIMARY_COLOR}`,
    },
  },
};

const FormInput = styled(TextField)(styles.formInput);
const FormButton = styled(Button)(styles.button);
const Wrapper = styled("div")(styles.wrapper);

class OtpForm extends Component {
  state = {
    otp: "",
    otpStaus: "",
  };
  handleInputChange = (type, value) => {
    this.setState({
      [type]: value,
    });
  };

  handleOtpSubmit = () => {
    let body = {
      otp: this.state.otp,
    };
    this.props.otpAction(body, this.otpCallBack);
  };

  otpCallBack = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    const { classes, className, status } = this.props;
    const { otp, otpStaus } = this.state;
    return (
      <Wrapper>
        <FormInput
          error={status === "failed" ? true : false}
          helperText={otpStaus === "failed" ? "Please enter correct otp" : ""}
          className={clsx(classes.formInput, className)}
          label={"OTP" || "error"}
          variant="outlined"
          value={otp}
          InputProps={{
            classes: {
              root: classes.formInput,
              focused: classes.FormInputBorderColor,
              notchedOutline: classes.FormInputBorderColor,
            },
          }}
          onChange={(e) => this.handleInputChange("otp", e.target.value)}
          onKeyPress={this.handleInputEnterPress}
        />
        <FormButton
          className={clsx(classes.button, className)}
          onClick={this.handleOtpSubmit}
          disabled={otp === "" || otp.length < 4}
        >
          Submit
        </FormButton>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.updateLoginStatus.otpStatus,
    // password: state.updateLoginStatus.password,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    otpAction: bindActionCreators(otpAction, dispatch),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withStyles(styles)(withRouter(connector(OtpForm)));

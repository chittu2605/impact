import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { rem } from "polished";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../constants/colors";
import { withRouter } from "react-router-dom";
import { validateEmail } from "../../utils";
import { loginAction } from "../../redux/actions/login";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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

class LoginForm extends React.Component {
  state = {
    userId: "",
    password: "",
    emailValid: true,
  };

  handleInputChange = (type, value) => {
    this.setState({
      [type]: value,
    });
  };

  handleEmailBlur = (event) => {
    let emailValid = validateEmail(event.target.value);
    this.setState({
      emailValid,
    });
  };

  handleLogin = () => {
    let { userId, password } = this.state;
    let body = {
      username: userId,
      password: password,
    };
    this.props.loginAction(body).then(() => {
      if (this.props.status === "success") this.props.otpCB();
    });
  };

  handleInputEnterPress = (event) => {
    const { userId, password } = this.state;
    if (event.key === "Enter" && userId != "" && password != "") {
      this.handleLogin();
    }
  };

  render() {
    const { classes, className, status } = this.props;
    const { userId, password } = this.state;
    return (
      <Wrapper>
        <FormInput
          error={status === "failed" ? true : false}
          helperText={status === "failed" ? "Please enter correct user id" : ""}
          className={clsx(classes.formInput, className)}
          label={"User Id" || "error"}
          variant="outlined"
          value={userId}
          InputProps={{
            classes: {
              root: classes.formInput,
              focused: classes.FormInputBorderColor,
              notchedOutline: classes.FormInputBorderColor,
            },
          }}
          onChange={(e) => this.handleInputChange("userId", e.target.value)}
          onKeyPress={this.handleInputEnterPress}
          // onBlur={this.handleEmailBlur}
        />
        <FormInput
          className={clsx(classes.formInput, className)}
          error={status === "failed" ? true : false}
          helperText={
            status === "failed" ? "Please enter correct password" : ""
          }
          label="Password"
          variant="outlined"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => this.handleInputChange("password", e.target.value)}
          onKeyPress={this.handleInputEnterPress}
          InputProps={{
            classes: {
              root: classes.formInput,
              focused: classes.FormInputBorderColor,
              notchedOutline: classes.FormInputBorderColor,
            },
            form: {
              autoComplete: "off",
            },
          }}
        />

        <FormButton
          className={clsx(classes.button, className)}
          onClick={this.handleLogin}
          disabled={userId === "" || password === ""}
        >
          Login
        </FormButton>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.updateLoginStatus.status,
    // password: state.updateLoginStatus.password,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: bindActionCreators(loginAction, dispatch),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withStyles(styles)(withRouter(connector(LoginForm)));

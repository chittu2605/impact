import React from "react";
import styled from "styled-components";
import TextInput from "components/Input/TextInput";
import { Button } from "reactstrap";
import Logo from "../impact1.png";
import { Formik } from "formik";
import * as Yup from "yup";
import GlobalStyle from "utils/GlobalStyles";
import { device } from "../utils/mediaQueries/device";
import { loginAction, updateLoginSuccess } from "../redux/actions/login";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { apiHandler } from "config/apiConfig";
import { toast, ToastContainer } from "react-toastify";

const style = {
  loginContainer: {
    height: "100vh",
    position: "relative",
  },

  form: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "rgba(0, 0, 0, 0.4588235294117647)",
    padding: "5rem 2rem",
    width: "90%",
    [device.tablet]: {
      maxWidth: "370px",
    },
  },
  bg: {
    height: "100%",
    backgroundSize: "cover",
    background: "radial-gradient(rgb(245, 255, 0), red)",
  },
  input: {
    background: "white",
  },
  logo: {
    display: "block",
  },

  button: {
    width: "100%",
  },
};

const LoginContainer = styled("div")(style.loginContainer);
const LoginFormWrapper = styled("div")(style.form);
const BackgroundImage = styled("div")(style.bg);
const Input = styled(TextInput)(style.input);
const LogoComponent = styled("img")(style.logo);
const StyledButton = styled(Button)(style.button);

class Login extends React.Component {
  state = {
    showForgotForm: false,
    sentOtp: false,
    validating: true,
  };

  toggleForgot = () => {
    this.setState({
      showForgotForm: !this.state.showForgotForm,
    });
  };

  handlerLogin = (body) => {
    this.props.loginAction(body, this.navigateToDashboard).then((response) => {
      if (this.props.status !== "success")
        alert("Please check username and password.");
    });
  };

  navigateToDashboard = () => {
    this.props.history.push("/adp");
  };

  componentDidMount = () => {
    if (!this.props.authenticated) {
      validateToken().then((response) => {
        if (response.data.status === "success") {
          this.props.updateLoginSuccess(response.data);
          this.props.history.push("/adp");
        } else {
          this.setState({
            validating: false,
          });
        }
      });
    }
  };

  render() {
    let { showForgotForm, sentOtp } = this.state;
    return (
      <div className="limiter">
        <GlobalStyle />
        <LoginContainer className="container-login100">
          <ToastContainer />
          <BackgroundImage
            className="login100-more"
            // style={{
            //   backgroundImage:
            //     "url(https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)",
            // }}
          ></BackgroundImage>
          <LoginFormWrapper className="wrap-login100">
            <LogoComponent src={Logo} />
            <br></br>

            {showForgotForm ? (
              sentOtp ? (
                <GenerateNewPassword that={this} />
              ) : (
                <ForgotPasswordForm
                  toggleForgot={this.toggleForgot}
                  that={this}
                />
              )
            ) : (
              <LoginForm
                toggleForgot={this.toggleForgot}
                handlerLogin={this.handlerLogin}
              />
            )}
          </LoginFormWrapper>
        </LoginContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.updateLoginStatus.status,
    authenticated: state.updateLoginStatus.authenticated,
    // password: state.updateLoginStatus.password,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: bindActionCreators(loginAction, dispatch),
    updateLoginSuccess: bindActionCreators(updateLoginSuccess, dispatch),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(connector(Login));

class LoginForm extends React.Component {
  render() {
    let { handlerLogin, toggleForgot } = this.props;
    return (
      <Formik
        initialValues={{
          adpId: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          adpId: Yup.number()
            .typeError("Username must be a number")
            .positive("please enter a valid adp ID")
            .required("Required"),

          password: Yup.string().required("Please enter password"),
        })}
        onSubmit={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          handlerLogin(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          getFieldProps,
          setFieldValue,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="login100-form validate-form">
            <div
              className="wrap-input100 rs1-wrap-input100 validate-input m-b-20"
              data-validate="Type user name"
            >
              {errors.adpId && touched.adpId && (
                <div className="input-feedback">{errors.adpId}</div>
              )}
              <Input
                label="Adp ID"
                id="adpId"
                type="text"
                value={values.adpId}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.adpId && touched.adpId
                    ? "text-input error"
                    : "text-input"
                }
                showLabel={false}
              />

              <span className="focus-input100"></span>
            </div>
            <div
              className="wrap-input100 rs2-wrap-input100 validate-input m-b-20"
              data-validate="Type password"
            >
              <Input
                label="Password"
                id="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.password && touched.password
                    ? "text-input error"
                    : "text-input"
                }
                showLabel={false}
              />
              <span className="focus-input100"></span>
            </div>

            <div className="container-login100-form-btn">
              <StyledButton
                className="login100-form-btn"
                color="danger"
                type="submit"
                // size="lg"
                disabled={isSubmitting}
              >
                Sign in
              </StyledButton>
            </div>

            <div className="w-full text-center p-t-27 p-b-239">
              <span className="txt1"></span>

              <a href="#" className="txt2" onClick={toggleForgot}>
                Forgot password?
              </a>
            </div>
          </form>
        )}
      </Formik>
    );
  }
}

const ForgotPasswordForm = (props) => {
  return (
    <Formik
      initialValues={{
        adpId: "",
        email: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email("Invalid email address"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        submitChangePasswordRequest(values)
          .then((response) => {
            props.that.setState({ sentOtp: true });
            setSubmitting(true);
          })
          .catch((error) => {
            if (error.response.status === 409) {
              toast("Multiple accounts exits with email, Please enter ADP Id");
            } else if (error.response.status === 404) {
              toast("No account found with ADP Id and Email");
            } else {
              toast("Unknown error");
              console.log(error);
            }
            setSubmitting(false);
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        getFieldProps,
        setFieldValue,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} className="form-group">
          <div className="w-full text-center p-t-27 p-b-239">
            <Input
              label="ADP ID"
              id="adpId"
              type="text"
              value={values.adpId}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.adpId && touched.adpId
                  ? "text-input error"
                  : "text-input"
              }
            />
          </div>

          <div className="w-full text-center p-t-27 p-b-239">
            <Input
              label="Email"
              id="email"
              type="text"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.email && touched.email
                  ? "text-input error"
                  : "text-input"
              }
            />
          </div>

          <StyledButton color="danger" type="submit" disabled={isSubmitting}>
            Next
          </StyledButton>

          <div className="w-full text-center p-t-27 p-b-239">
            <span className="txt1"></span>

            <a href="#" className="txt2" onClick={props.toggleForgot}>
              Sign in instead?
            </a>
          </div>
        </form>
      )}
    </Formik>
  );
};

const GenerateNewPassword = (props) => {
  return (
    <Formik
      initialValues={{
        adpId: "",
        otp: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object().shape({
        adpId: Yup.number()
          .positive("please enter number greater than 0")
          .required("Required"),
        password: Yup.string().required("No password provided"),
        otp: Yup.number()
          .required("Required")
          .test(
            "len",
            "Must be exactly 4 digits",
            (val) => val && val.toString().length === 4
          ),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        if (values.password !== values.confirmPassword) {
          toast("Password and confirm Passoword did not match");
        } else {
          const body = {
            otp: values.otp,
            adpId: values.adpId,
            password: values.password,
          };
          validateOtpAndChangePassword(body)
            .then((response) => {
              props.that.toggleForgot();
              toast("Password change success");
            })
            .catch((error) => {
              toast("Unable to Set Password");
            });
        }
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        getFieldProps,
        setFieldValue,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} className="form-group">
          <div className="w-full text-center p-t-27 p-b-239">
            <Input
              label="ADP ID"
              id="adpId"
              type="text"
              value={values.adpId}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.adpId && touched.adpId
                  ? "text-input error"
                  : "text-input"
              }
            />
          </div>

          <div className="w-full text-center p-t-27 p-b-239">
            <Input
              label="OTP"
              id="otp"
              type="number"
              value={values.otp}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.otp && touched.otp ? "text-input error" : "text-input"
              }
            />
          </div>

          <div className="w-full text-center p-t-27 p-b-239">
            <Input
              label="Password"
              id="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.password && touched.password
                  ? "text-input error"
                  : "text-input"
              }
            />
          </div>

          <div className="w-full text-center p-t-27 p-b-239">
            <Input
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.confirmPassword && touched.confirmPassword
                  ? "text-input error"
                  : "text-input"
              }
            />
          </div>

          <StyledButton color="danger" type="submit" disabled={isSubmitting}>
            Generate Password
          </StyledButton>

          <div className="w-full text-center p-t-27 p-b-239">
            <span className="txt1"></span>

            <a href="#" className="txt2" onClick={props.toggleForgot}>
              Sign in instead?
            </a>
          </div>
        </form>
      )}
    </Formik>
  );
};

function validateToken() {
  return apiHandler.post("/validateToken");
}

function submitChangePasswordRequest(body) {
  return apiHandler.post("/forgot-password", body);
}

function validateOtpAndChangePassword(body) {
  return apiHandler.post("/validate-otp-change-password", body);
}

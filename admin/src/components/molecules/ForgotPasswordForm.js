import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { rem } from "polished";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../constants/colors";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { validateEmail } from "../../utils/index"
import ResetPassword from "./ResetPassword";
import axios from "axios";
import { apiHandler } from "../../utils/apiConfig";
const styles = {
  wrapper: {
    marginTop: rem("16px"),
  },

  formInput: {
    width: "100%",
    marginBottom: "0.5rem",
    color: SECONDARY_COLOR,
    label: {
      color: `${PRIMARY_COLOR} !important`,
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

class ForgotPasswordForm extends React.Component {
  state = {
    selectedOption: "email",
    value: "",
    otpWaiting: false,
  };

  handleRadioChange = (event) => {
    this.setState({
      selectedOption: event.target.value,
      value: "",
    })
  }

  handleInputChange = (event) => {
    let string = event.target.value;
    let email = "";
    let phone = "";
    let selectedOption = this.state.selectedOption;
    if (selectedOption === "email") {
      email = string
    } else {
      string = string.substring(0, 10)
      phone = string.match(/\d+/) == null ? "" : string.match(/\d+/)
    }
    this.setState({
      value: selectedOption === "email" ? email : phone
    })
  }

  handleReset = () => {
    let { selectedOption, value } = this.state;
    let valid = false;
    if (selectedOption === "email") {
      valid = validateEmail(value);
    } else {
      valid = value.toString().length == 10 ? true : false
    }

    if (!valid) {
      alert("Invalid Phone/Email")
      return
    }
    let body = {};
    if (selectedOption === "email") {
      body["email"] = value;
    } else {
      body["phone"] = value;
    }
    sendForgotPasswordRequest(body).then(() => {
      this.setState({
        otpWaiting: true,
      })
    });
  }

  render() {
    const { classes, className } = this.props;
    const { selectedOption, value, otpWaiting } = this.state;
    return (
      <Wrapper>
        {
          otpWaiting ? (
            <ResetPassword />
          ) : (
              <>
                <FormInput
                  className={clsx(classes.formInput, className)}
                  label={selectedOption == 'email' ? "Email" : "Phone"}
                  variant="outlined"
                  type={selectedOption == 'email' ? "email" : "text"}
                  value={value}
                  onChange={this.handleInputChange}
                  onKeyDown={onlyNumberKey}
                  InputProps={{
                    classes: {
                      root: classes.formInput,
                      focused: classes.FormInputBorderColor,
                      notchedOutline: classes.FormInputBorderColor,
                    },
                  }}
                />

                <FormControl component="fieldset">
                  {/* <FormLabel component="legend">Reset With</FormLabel> */}
                  <RadioGroup
                    aria-label="option"
                    name="option"
                    className={clsx(classes.formInput, className)}
                    value={this.state.selectedOption}
                    onChange={this.handleRadioChange}
                  >
                    <FormControlLabel
                      value="email"
                      control={<Radio />}
                      label="Email"
                    />
                    <FormControlLabel value="phone" control={<Radio />} label="Phone" />
                  </RadioGroup>
                </FormControl>

                <FormButton
                  className={clsx(classes.button, className)}
                  onClick={this.handleReset}
                >
                  Request OTP
        </FormButton>
              </>
            )
        }



      </Wrapper>
    );
  }
}

export default withStyles(styles)(ForgotPasswordForm);


function onlyNumberKey(evt) {

  // Only ASCII charactar in that range allowed 
  var ASCIICode = (evt.which) ? evt.which : evt.keyCode
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
    return false;
  return true;
} 


function sendForgotPasswordRequest (body) {
    return apiHandler.post(`/forgot`, body).catch((err) => {
        console.log(err)
    });
  
}
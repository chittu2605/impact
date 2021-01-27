import React from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { rem } from "polished";
import clsx from "clsx";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../constants/colors";
import Button from "@material-ui/core/Button";
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

class ResetPassword extends React.Component {
    state = {
        password: "",
        confirmPassword: "",
        otp: "",
        userId: ""

        
    };

    handleInputChange = (type, value) => {
        this.setState({
            [type]: value,
        })
    }


    handleReset = () => {
        let { otp, password, confirmPassword, userId } = this.state;

        if (otp.length < 6) {
            alert ("Please enter the 6 digit OTP");
            return
        }

        if (userId.length < 4) {
            alert ("Please enter a valid user ID");
            return
        }

        if (password.length < 6) {
            alert ("Password should be alteast 6 charachters");
            return
        }

        if (password !== confirmPassword) {
            alert ("Please Check the password")
            return
        }

        let body = {
            otp,
            password,
            confirmPassword,
            userId
        }
        resetPassword(body);
        
    }

    render () {
        const { classes, className } = this.props;
        const { password, confirmPassword, otp, userId } = this.state;
        return (
            <div>

                <FormInput
                    className={clsx(classes.formInput, className)}
                    label="Enter your 6 digit OTP"
                    variant="outlined"
                    type="text"
                    value={otp}
                    onChange={(event) => {this.handleInputChange("otp", event.target.value)}}
                    InputProps={{
                        classes: {
                        root: classes.formInput,
                        focused: classes.FormInputBorderColor,
                        notchedOutline: classes.FormInputBorderColor,
                        },
                    }}
                />

                <FormInput
                    className={clsx(classes.formInput, className)}
                    label="Enter user Id"
                    variant="outlined"
                    type="text"
                    value={userId}
                    onChange={(event) => {this.handleInputChange("userId", event.target.value)}}
                    InputProps={{
                        classes: {
                        root: classes.formInput,
                        focused: classes.FormInputBorderColor,
                        notchedOutline: classes.FormInputBorderColor,
                        },
                    }}
                />
                <FormInput
                    className={clsx(classes.formInput, className)}
                    label="New Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(event) => {this.handleInputChange("password", event.target.value)}}
                    InputProps={{
                        classes: {
                        root: classes.formInput,
                        focused: classes.FormInputBorderColor,
                        notchedOutline: classes.FormInputBorderColor,
                        },
                    }}
                />

                <FormInput
                    className={clsx(classes.formInput, className)}
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => {this.handleInputChange("confirmPassword", event.target.value)}}
                    InputProps={{
                        classes: {
                        root: classes.formInput,
                            focused: classes.FormInputBorderColor,
                        notchedOutline: classes.FormInputBorderColor,
                        },
                    }}
                />

            <FormButton
                  className={clsx(classes.button, className)}
                  onClick={this.handleReset}
                >
                  Reset Password
            </FormButton>
            </div>
        )
    }
}

export default withStyles(styles)(ResetPassword);


function resetPassword (body) {
    return apiHandler.post(`/reset-password`, body).catch((err) => {
        console.log(err)
    });
}
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { device } from "../../utils/mediaQueries/device";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";

const styles = {
    formInput: {
      width: "100%",
      // [device.mobileL]: {
      //   width: "60%",
      // },
    },
    FormInputBorderColor: {},
    FormInputBorderColor: {},
    button: {
      marginTop: "0.7rem",
  
      [device.mobileL]: {
        marginLeft: "1rem",
      },
    },
  
    paper: {
      padding: "1rem",
    },
    grid: {
      // margin: "auto"
    },
  };

function TextInput (props) {
    const { classes, className, value, error, label, handleChange} = props;
    return (
        <TextField
            className={clsx(classes.formInput, className)}
            label={!error ? label : "error"}
            variant="standard"
            value={value && value}
            onChange={handleChange}
            autoComplete='off'
            {...props}
        />  
    )
}

export default withStyles(styles)(TextInput)
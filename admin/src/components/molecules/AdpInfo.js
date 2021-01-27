import React from "react";
import { Slate } from "../atoms/Slate";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { device } from "../../utils/mediaQueries/device";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const styles = {
  formInput: {
    // width: "65%",
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

class AdpInfo extends React.Component {
  render() {
    const { classes, className, adp_id, firstname, lastname } = this.props;
    return (
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={8}
          md={8}
          className={clsx(classes.grid, className)}
        >
          <Paper className={classes.paper}>
            {/* <TextField
              className={clsx(classes.formInput, className)}
              label={"ADP ID" || "error"}
              variant="standard"
              value={adp_id}
              onChange={(e) => this.handleInput("cityName", e.target.value)}
              disabled
            /> */}
            <Grid container spacing={2}>
              <Grid
                item
                xs={6}
                // sm={8}
                // md={8}
                className={clsx(classes.grid, className)}
              >
                <TextField
                  className={clsx(classes.formInput, className)}
                  label={"First Name" || "error"}
                  variant="standard"
                  value={firstname && firstname}
                  //   onChange={(e) => this.handleInput("cityName", e.target.value)}
                  disabled
                />
              </Grid>
              <Grid
                item
                xs={6}
                // sm={8}
                // md={8}
                className={clsx(classes.grid, className)}
              >
                <TextField
                  className={clsx(classes.formInput, className)}
                  label={"Last Name" || "error"}
                  variant="standard"
                  value={lastname && lastname}
                  //   onChange={(e) => this.handleInput("cityName", e.target.value)}
                  disabled
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adp_id: state.updateAdpInfo.adp_id,
    firstname: state.updateAdpInfo.firstname,
    lastname: state.updateAdpInfo.lastname,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getCityAction: bindActionCreators(getCityAction, dispatch),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withStyles(styles)(connector(AdpInfo));

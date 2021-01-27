import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { device } from "../../utils/mediaQueries/device";
import axios from "axios";
import { getCityAction } from "../../redux/actions/city";
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { apiHandler } from "../../utils/apiConfig";

const styles = {
  formInput: {
    width: "65%",
    [device.mobileL]: {
      width: "60%",
    },
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
class AddCityForm extends React.Component {
  state = {
    cityName: "",
    apiCallOngoing: false,
  };

  handleInput = (type, value) => {
    this.setState({
      [type]: value,
    });
  };

  handleAddCity = () => {
    let body = {
      cityName: this.state.cityName,
    }
    this.setState({
      apiCallOngoing: true,
    }, () => {
      apiHandler.post(`/add-city`, body)
      .then((result) => {
        this.props.getCityAction();
        this.handleInput("apiCallOngoing", false);
        this.handleInput("cityName", "")
      })
      .catch((err) => {
        console.log(err)
        this.handleInput("apiCallOngoing", false)
      });
    })
    
  }

  render() {
    const { classes, className, status } = this.props;
    const { cityName, apiCallOngoing } = this.state;
    return (
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          className={clsx(classes.grid, className)}
        >
          <Paper className={classes.paper}>
            <TextField
              error={status === "failed" ? true : false}
              helperText={
                status === "failed" ? "Please enter correct user id" : ""
              }
              className={clsx(classes.formInput, className)}
              label={"Enter City Name" || "error"}
              variant="standard"
              value={cityName}
        
              onChange={(e) => this.handleInput("cityName", e.target.value)}
            />

            <Button
              variant="contained"
              color="primary"
              className={clsx(classes.button, className)}
              InputProps={{
                classes: {
                  root: classes.button,
                },
              }}
              disabled={apiCallOngoing ? true : (cityName.length > 1 ? false : true)}
              onClick={this.handleAddCity}
            >
              Add City
              
            </Button>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
// const AddCityForm = (props) => {

// };



const mapStateToProps = state => {
	return {
		// status: state.updateLoginStatus.status,
		// password: state.updateLoginStatus.password,
	};
  };
  
  const mapDispatchToProps = dispatch => {
	return {
		getCityAction: bindActionCreators(getCityAction, dispatch),
	};
  };
  
  const connector = connect(mapStateToProps, mapDispatchToProps);
  
  export default withStyles(styles)(connector(AddCityForm));
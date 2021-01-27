import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { device } from "../../utils/mediaQueries/device";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import axios from "axios";
import { getCategoryAction } from "../../redux/actions/category";
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
class AddCategoryForm extends React.Component {
  state = {
    categoryName: "",
    apiCallOngoing: false,
  };

  handleInput = (type, value) => {
    this.setState({
      [type]: value,
    });
  };

  handleAddCategory = () => {
    let body = {
      categoryName: this.state.categoryName,
    }
    this.setState({
      apiCallOngoing: true,
    }, () => {
      apiHandler.post(`/add-category`, body)
      .then((result) => {
        this.props.getCategoryAction();
        this.handleInput("apiCallOngoing", false);
        this.handleInput("categoryName", "")
      })
      .catch((err) => {
        console.log(err)
        this.handleInput("apiCallOngoing", false)
      });
    })
    
  }

  render() {
    const { classes, className, status } = this.props;
    const { categoryName, apiCallOngoing } = this.state;
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
              label={"Enter Category Name" || "error"}
              variant="standard"
              value={categoryName}
            //   InputProps={{
            //     classes: {
            //       //   root: classes.formInput,
            //       focused: classes.FormInputBorderColor,
            //       notchedOutline: classes.FormInputBorderColor,
            //     },
            //   }}
              onChange={(e) => this.handleInput("categoryName", e.target.value)}
              // onBlur={this.handleEmailBlur}
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
              disabled={apiCallOngoing ? true : (categoryName.length > 1 ? false : true)}
              onClick={this.handleAddCategory}
            >
              Add Category
              
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
		getCategoryAction: bindActionCreators(getCategoryAction, dispatch),
	};
  };
  
  const connector = connect(mapStateToProps, mapDispatchToProps);
  
  export default withStyles(styles)(connector(AddCategoryForm));
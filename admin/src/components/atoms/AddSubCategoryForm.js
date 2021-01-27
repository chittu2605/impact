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
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSubCategoryAction } from "../../redux/actions/subCategory";
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
class AddSubCategoryForm extends React.Component {
  state = {
    subCategoryName: "",
    apiCallOngoing: false,
  };

  handleInput = (type, value) => {
    this.setState({
      [type]: value,
    });
  };

  handleAddSubCategory = () => {
    let selectedCategoryId = this.props.selectedCategoryId;
    let body = {
      subCategoryName: this.state.subCategoryName,
      categoryId: selectedCategoryId,
    }
    this.setState({
      apiCallOngoing: true,
    }, () => {
      apiHandler.post(`/add-sub-category`, body)
      .then((result) => {
        this.props.getSubCategoryAction(selectedCategoryId);
        this.handleInput("apiCallOngoing", false);
        this.handleInput("subCategoryName", "")
      })
      .catch((err) => {
        console.log(err)
        this.handleInput("apiCallOngoing", false)
      });
    })
    
  }

  render() {
    const { classes, className, status, selectedCategoryId } = this.props;
    const { subCategoryName, apiCallOngoing } = this.state;
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
              label={"Enter Sub Category Name" || "error"}
              variant="standard"
              value={subCategoryName}
       
              onChange={(e) => this.handleInput("subCategoryName", e.target.value)}
              // onBlur={this.handleEmailBlur}
            />

            <Button
              variant="contained"
              color="primary"
              className={clsx(classes.button, className)}
            //   InputProps={{
            //     classes: {
            //       root: classes.button,
            //     },
            //   }}
              disabled={apiCallOngoing ? true : ((subCategoryName.length > 1 && selectedCategoryId != "") ? false : true)}
              onClick={this.handleAddSubCategory}
            >
              Add Sub Category
              
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
        selectedCategoryId: state.updateSubCategoryList.selectedCategoryId
	};
  };
  
  const mapDispatchToProps = dispatch => {
	return {
		getSubCategoryAction: bindActionCreators(getSubCategoryAction, dispatch),
	};
  };
  
  const connector = connect(mapStateToProps, mapDispatchToProps);
  
  export default withStyles(styles)(connector(AddSubCategoryForm));
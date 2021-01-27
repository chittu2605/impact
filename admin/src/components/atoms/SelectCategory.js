import React from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { device } from "../../utils/mediaQueries/device";
import axios from "axios";
import { getSubCategoryAction } from "../../redux/actions/subCategory";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getCategoryAction } from "../../redux/actions/category";
import { updateSubCategorySelectedCategory } from "../../redux/actions/subCategory";

const styles = {
  formInput: {
    width: "100%",
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
  formControl: {
    minWidth: "100%",
  },
};
class SelectCategory extends React.Component {
  state = {
    categoryId: "",
    apiCallOngoing: false,
    open: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleChange = (event) => {
    
			this.props.updateSubCategorySelectedCategory(event.target.value)
			this.props.getSubCategoryAction(event.target.value)
	};
	
	componentDidMount () {
		this.props.getCategoryAction();
	}

  render() {
    const { classes, className, status, categoryList, selectedCategoryId } = this.props;
    const { open, apiCallOngoing } = this.state;
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
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">
                Select Category
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={selectedCategoryId}
                onChange={this.handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
								{
									categoryList && categoryList.map((elm) => {
										return (
										<MenuItem key={elm.id} value={elm.id}>{elm.category}</MenuItem>
										)
									})
								}
                
                
              </Select>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
// const AddCityForm = (props) => {

// };

const mapStateToProps = (state) => {
  return {
    status: state.updateSubCategoryList.status,
		categoryList: state.updateCategoryList.categoryList,
		selectedCategoryId: state.updateSubCategoryList.selectedCategoryId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSubCategoryAction: bindActionCreators(getSubCategoryAction, dispatch),
    getCategoryAction: bindActionCreators(getCategoryAction, dispatch),
    updateSubCategorySelectedCategory: bindActionCreators(updateSubCategorySelectedCategory, dispatch),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withStyles(styles)(connector(SelectCategory));

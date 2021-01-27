import React from "react";
import { Slate } from "../atoms/Slate"
import Paper from "@material-ui/core/Paper";
import { device } from "../../utils/mediaQueries/device";
import { withStyles } from "@material-ui/core/styles";
import CityList from "../molecules/CityList";
import Select from 'react-select'
import ProductTable from "../molecules/ProductTable";
import { Grid, Button } from "@material-ui/core";
import clsx from "clsx";
import { getCityAction } from "../../redux/actions/city";
import { getAdminProductAction } from "../../redux/actions/franchise";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import Popup from "../organisms/AddProductPopup";
import { getCategoryAction } from "../../redux/actions/category";
import { getSubCategoryAction } from "../../redux/actions/subCategory";
import { apiHandler } from "../../utils/apiConfig";
import { withRouter } from "react-router-dom";

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
    marginBottom: "1rem"
  },
  grid: {
    // margin: "auto"
  },
};

class Products extends React.Component {
  state = {
    selectedcity: {},
    productList: [],
    showModal: false,
    productTypeOptions: [],
  
  };

  componentDidMount() {
    this.props.getCityAction();
    this.props.getCategoryAction();

    getProductType().then((response) => {
      let productTypeOptions = [];

      response.data.results &&
        response.data.results.forEach((elm) => {
          let obj = {
            value: elm.id,
            label: elm.product_type,
          };
          productTypeOptions.push(obj);
        });
      this.setState({
        productTypeOptions,
      });
    });

    this.props.getAdminProductAction();
  }

  handleSelect = (option) => {
    this.setState({
      selectedcity: option,
    }, () => {
      let apiBody = {
        params: {
          city: option.label
        }
      }
      this.props.getAdminProductAction();
      
    })
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    }, () => {
      if (this.state.showModal) {
        // this.props.getAdminProductAction();
      }
    })
  }

  render() {
    const { classes, className, cityList } = this.props;
    const { showModal } = this.state;
    return (
      <Slate>
        {showModal && <Popup toggleModal={this.toggleModal} productTypeOptions={this.state.productTypeOptions} getAdminProductAction={this.props.getAdminProductAction}/>}
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            // sm={}
            // md={8}
            className={clsx(classes.grid, className)}
          >
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                {/* <Grid item xs={8}>
                  <Select
                    options={generateSelectOption(cityList)}
                    onChange={this.handleSelect}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => this.props.history.push("/add-product")}
                  >
                    Add Product
                  </Button>
                </Grid>
              </Grid>

            </Paper>
          </Grid>

        </Grid>
        <Grid
          item
          xs={12}
          // sm={}
          // md={8}
          className={clsx(classes.grid, className)}
        >
          <Paper className={classes.paper}>
            <ProductTable />
          </Paper>
        </Grid>


      </Slate>
    )
  }
}




const mapStateToProps = (state) => {
  return {
    status: state.updateCityList.status,
    cityList: state.updateCityList.cityList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCityAction: bindActionCreators(getCityAction, dispatch),
    getAdminProductAction: bindActionCreators(getAdminProductAction, dispatch),
    getCategoryAction: bindActionCreators(getCategoryAction, dispatch),
    getSubCategoryAction: bindActionCreators(getSubCategoryAction, dispatch),
    
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withStyles(styles)(withRouter(connector(Products)));


function generateSelectOption(data) {
  let options = [];
  data && data.forEach((elm) => {
    let obj = {
      label: elm.city,
      value: elm.id,
    };
    options.push(obj)
  })

  return options;
}


function getProducts(city) {
  return apiHandler.get(`/get-all-products`, {
    params: {
      city,
    }
  })
}


function getProductType() {
  return apiHandler.get(`/get-product-type`);
}

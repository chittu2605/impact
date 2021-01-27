import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Grid, Paper, Divider, Button } from "@material-ui/core";
import BuyProductList from "../organisms/BuyProductList";
import Cart from "../organisms/Cart";
import { apiHandler } from "../../utils/apiConfig";
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';import styled  from "styled-components"


const style = {
    button: {
        background: "red !important",
        color: "white !important",
        "&.disabled": {
          background: "grey !important",
        }
    }
}


const StyledButton = styled(Button)(style.button)
class BuyProduct extends Component {
  state = {
    selectedCategory: [],
    categoryOptions: [],
    subCategoryOptions: [],
    selectedSubCategory: [],
    cityOptions: [],
    selectedCity: [],
    productList: [],
    cart: [],
    adp_id: "",
    franchiseOptions: [],
    selectedFranchise: [],
    selectedProductType: [],
    productTypeOptions: [],
  };

  componentDidMount() {
    let adp_id = this.props.location.search.split("?")[1];
    this.setState({ adp_id });
    getCategory().then((response) => {
      let categoryOptions = [];

      response.data.results &&
        response.data.results.forEach((elm) => {
          let obj = {
            value: elm.id,
            label: elm.category,
          };
          categoryOptions.push(obj);
        });
      this.setState({
        categoryOptions,
      });
    });

    getCity().then((response) => {
      let cityOptions = [];

      response.data.results &&
        response.data.results.forEach((elm) => {
          let obj = {
            value: elm.id,
            label: elm.city,
          };
          cityOptions.push(obj);
        });
      this.setState({
        cityOptions,
      });
    });

    this.getProductTypeApi();
  }

  subCategoryApiCall = (categoryId) => {
    getSubCategory(categoryId).then((response) => {
      let subCategoryOptions = [];

      response.data.results &&
        response.data.results.forEach((elm) => {
          let obj = {
            value: elm.id,
            label: elm.sub_category,
          };
          subCategoryOptions.push(obj);
        });
      this.setState({
        subCategoryOptions,
      });
    });
  };

  handleChange = (type, value) => {
    this.setState(
      {
        [type]: value,
      },
      () => {
        if (type === "selectedCategory") {
          this.setState(
            {
              selectedSubCategory: [],
            },
            () => {
              this.subCategoryApiCall(value.value);
            }
          );
        } else if (type === "selectedSubCategory") {
          let body = {
            params: {
              city: this.state.selectedCity.value,
              categoryId: this.state.selectedCategory.value,
              subCategoryId: this.state.selectedSubCategory.value,
            },
          };
          getProducts(body).then((response) => {
            this.setState({
              productList: response.data.results,
            });
          });
        } else if (type === "selectedCity") {
          getCity().then((response) => {
            let cityOptions = [];

            response.data.results &&
              response.data.results.forEach((elm) => {
                let obj = {
                  value: elm.id,
                  label: elm.city,
                };
                cityOptions.push(obj);
              });
            this.setState({
              cityOptions,
            });
          });

          let body = {
            params: {
              city: this.state.selectedCity.value,
              categoryId: this.state.selectedCategory.value,
              subCategoryId: this.state.selectedSubCategory.value,
            },
          };
          getProducts(body).then((response) => {
            this.setState({
              productList: response.data.results,
            });
          });

          getFranchise({
            params: { city: this.state.selectedCity.value },
          }).then((response) => {
            let franchiseOptions = [];

            response.data.results &&
              response.data.results.forEach((elm) => {
                let obj = {
                  value: elm.id,
                  label: elm.franchise_name,
                };
                franchiseOptions.push(obj);
              });
            this.setState({
              franchiseOptions,
            });
          });
        } else if (type === "selectedFranchise") {
          let body = {
            params: {
              city: this.state.selectedCity.value,
              categoryId: this.state.selectedCategory.value,
              subCategoryId: this.state.selectedSubCategory.value,
              franchiseId: this.state.selectedFranchise.value,
            },
          };
          getProducts(body).then((response) => {
            this.setState({
              productList: response.data.results,
            });
          });
        }
      }
    );
  };

  cartAdded = (product) => {
    let localCart = [...this.state.cart];
    let quantityFlag = 0;
    for (let i = 0; i < localCart.length; i++) {
      if (localCart[i].id === product.id) {
        localCart[i].quantityAdded =
          Number(localCart[i].quantityAdded) + Number(product.quantityAdded);
        quantityFlag = 1;
      }
    }
    if (quantityFlag == 0) {
      localCart.push(product);
    }
    this.setState({ cart: localCart });

  };

  deleteItemHandler = (cartItem) => {
    let localCart = [...this.state.cart];
    let index = 0;
    for (let i = 0; i < localCart.length; i++) {
      if (localCart[i].id === cartItem.id) {
        index = i;
      }
    }
    localCart.splice(index, 1);
    this.setState({ cart: localCart });
  };

  quantityAdded = (cartItem) => {
    let localCart = [...this.state.cart];

    for (let i = 0; i < localCart.length; i++) {
      if (localCart[i].id === cartItem.id) {
        localCart[i].quantityAdded =
          Number(localCart[i].quantityAdded) + Number(1);
      }
    }

    this.setState({ cart: localCart });
  };

  quantityReduced = (cartItem) => {
    let localCart = [...this.state.cart];

    for (let i = 0; i < localCart.length; i++) {
      if (localCart[i].id === cartItem.id) {
        if (localCart[i].quantityAdded > 1) {
          localCart[i].quantityAdded =
            Number(localCart[i].quantityAdded) - Number(1);
        }
      }
    }

    this.setState({ cart: localCart });
  };

  createOrderApi = () => {
    let {adp_id, cart} = this.state;
    
    let body = {
      adp_id,
      products: cart,
    }
    createOrder(body).then((response) => {
      toast("Order Placed");
      this.props.history.push("/dashboard")

    })
  };

  getProductTypeApi = () => {
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
  }

  render() {
    const { classes, className, adp_id, firstname, lastname } = this.props;
    const {
      categoryOptions,
      selectedCategory,
      subCategoryOptions,
      selectedSubCategory,
      cityOptions,
      selectedCity,
      productList,
      selectedFranchise,
      franchiseOptions,
      selectedProductType,
      productTypeOptions
    } = this.state;

    return (
      <Grid
        container
        spacing={4}
        style={{
          marginTop: "40px",
          textAlign: "center",
          padding: "1rem",
          margin: "auto",
          width: "90%",
        }}
      >
        <Grid item xs={12}>
          <Paper style={{ textAlign: "center", padding: "1rem" }} elevation={3}>
            <h6>Your Cart</h6>
            <Divider variant="middle" productList={productList} />
            <Cart
              cartItem={this.state.cart}
              deleteItem={this.deleteItemHandler}
              quantityAdded={this.quantityAdded}
              quantityReduced={this.quantityReduced}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={{ textAlign: "center", padding: "1rem" }} elevation={3}>
            <h6>Select Product</h6>
            <Divider variant="middle" />
            <BuyProductList
              cityOptions={cityOptions}
              selectedCity={selectedCity}
              categoryOptions={categoryOptions}
              selectedCategory={selectedCategory}
              subCategoryOptions={subCategoryOptions}
              selectedSubCategory={selectedSubCategory}
              handleChange={this.handleChange}
              productList={productList}
              cartAdded={this.cartAdded}
              selectedFranchise={selectedFranchise}
              franchiseOptions={franchiseOptions}
              selectedProductType={selectedProductType}
              productTypeOptions={productTypeOptions}
            />
            <br></br>
            <StyledButton 
              onClick={this.createOrderApi}
              disabled={this.state.cart.length == 0 ? true : false}
              className={this.state.cart.length == 0 ? "disabled" : ""}
              variant="contained"
              color="primary"
            >Place Order</StyledButton>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

function getCategory() {
  return apiHandler.get(`/list-category`);
}

function getCity() {
  return apiHandler.get(`/list-city`);
}

function getProducts(body) {
  return apiHandler.get(`/get-all-products`, body);
}

function getSubCategory(categoryId) {
  return apiHandler.get(`/list-sub-category`, {
    params: {
      categoryId: categoryId,
    },
  });
}

function getFranchise(body) {
  return apiHandler.get(`/get-franchise`, body);
}

function createOrder(body) {
  return apiHandler.post(`/create-order`, body);
}

function getProductType(body) {
  return apiHandler.get(`/get-product-type`, body);
}


export default withRouter(BuyProduct);
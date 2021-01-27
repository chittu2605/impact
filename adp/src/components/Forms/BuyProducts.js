import React from "react";
import Cart from "../Molecule/Cart";
import styled from "styled-components";
import axios from "axios";
import BuyProductList from "components/Organism/BuyProductList";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateAdpData } from "../../redux/actions/addAdp";
import { withRouter } from "react-router-dom";
import { apiHandler } from "config/apiConfig";
import { fetchWalletAction } from "redux/actions/wallet";
import { toast } from "react-toastify";
import { fetchSmartMartAction } from "redux/actions/smartMart";

const styles = {
  wrapper: {
    padding: "1rem",
  },
  button: {
    background: "red !important",
    color: "white !important",
    marginRight: "1rem !important",
    "&.disabled": {
      background: "grey !important",
    },
    "&.grey": {
      background: "black !important",
    },
  },
};

const Wrapper = styled("div")(styles.wrapper);
const StyledButton = styled(Button)(styles.button);

class BuyProducts extends React.Component {
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
    bvWeightageList: [],
    totalSmartMartDiscount: 0,
    previousBv: 0,
    balance: 0,
    showDiscount: false,
    selectedProductType: [],
    productTypeOptions: [],
  };

  componentDidMount() {
    this.getWalletBalance();

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

    getPreviousBv().then((response) => {
      if (response && response.data) {
        this.setState({
          previousBv: response.data.bvTillDate,
        });
      }
    });

    getBvWeightage().then((response) => {
      if (response && response.data) {
        this.setState({
          bvWeightageList: response.data.results,
        });
      }
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
              productType: this.state.selectedProductType.value,
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
              productType: this.state.selectedProductType.value,
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
              productType: this.state.selectedProductType.value,
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
    //console.log('localCart After Push', localCart[0]);
    this.setState({ cart: localCart }, () => {
      this.calculateSmartMartDiscount();
    });
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
    this.setState({ cart: localCart }, () => {
      this.calculateSmartMartDiscount();
    });
  };

  quantityAdded = (cartItem) => {
    let localCart = [...this.state.cart];

    for (let i = 0; i < localCart.length; i++) {
      if (localCart[i].id === cartItem.id) {
        localCart[i].quantityAdded =
          Number(localCart[i].quantityAdded) + Number(1);
      }
    }

    this.setState({ cart: localCart }, () => {
      this.calculateSmartMartDiscount();
    });
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

    this.setState({ cart: localCart }, () => {
      this.calculateSmartMartDiscount();
    });
  };

  addAdpCreateOrderApi = () => {
    let { cart, bvWeightageList, totalSmartMartDiscount } = this.state;
    let {
      adpData,
      fetchWalletAction,
      updateAdpData,
      fetchSmartMartAction,
    } = this.props;
    let totalBv = getTotalBv(cart);

    let calculatedBv =
      totalBv * (calcBvWeightage(totalBv, bvWeightageList) / 100);
    let body = {
      adpData: adpData,
      products: cart,
      totalAmount: getTotal(cart),
      calculatedBv,
      totalSmartMartDiscount,
    };
    if (getTotal(cart) > this.state.balance) {
      alert("You sont have enough funds in wallet");
      return;
    }
    addAdp(body).then((response) => {
      fetchWalletAction();
      fetchSmartMartAction();
      toast("ADP Created");
      this.props.history.push("/adp/dashboard");
      updateAdpData({ adpData: {} });
    });
  };

  rePurchaseCreateOrderApi = () => {
    let {
      cart,
      bvWeightageList,
      totalSmartMartDiscount,
      previousBv,
    } = this.state;
    let { fetchWalletAction, adpId, fetchSmartMartAction } = this.props;
    let totalBv = getTotalBv(cart);
    let calculatedBv =
      totalBv * (calcBvWeightage(previousBv + totalBv, bvWeightageList) / 100);

    let body = {
      products: cart,
      totalAmount: getTotal(cart),
      adp_id: adpId,
      calculatedBv,
      totalSmartMartDiscount,
    };

    if (getTotal(cart) > this.state.balance) {
      alert("You sont have enough funds in wallet");
      return;
    }

    rePurchase(body).then((response) => {
      fetchWalletAction();
      fetchSmartMartAction();
      toast("Order Placed Successfully");
      this.props.history.push("/adp/dashboard");
    });
  };

  calculateSmartMartDiscount = () => {
    let { cart } = this.state;
    let { smartMartBalance } = this.props;
    this.setState({
      totalSmartMartDiscount: getTotalDiscount(cart),
      showDiscount: smartMartBalance >= getTotalDiscount(cart) ? true : false,
    });
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
  };

  getWalletBalance = async () => {
    const response = await apiHandler.get("/wallet-balance");
    this.setState({
      balance: response.data.balance,
    });
  };

  render() {
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
      cart,
      bvWeightageList,
      showDiscount,
      totalSmartMartDiscount,
      selectedProductType,
      productTypeOptions,
      previousBv,
    } = this.state;

    let { toggleBuyProducts, rePurchase, addAdp } = this.props;
    let totalBv = getTotalBv(cart);
    const prevBVToConsider = rePurchase ? previousBv : 0;
    let bvWeightage = calcBvWeightage(
      prevBVToConsider + totalBv,
      bvWeightageList
    );
    return (
      <Wrapper>
        <h6>Your Cart</h6>
        <Cart
          cartItem={cart}
          deleteItem={this.deleteItemHandler}
          quantityAdded={this.quantityAdded}
          quantityReduced={this.quantityReduced}
          showDiscount={showDiscount}
        />
        <div className="row row-cols-1 row-cols-sm-4">
          <div className="col">
            Total Amount:{" "}
            {showDiscount
              ? getTotal(cart) - totalSmartMartDiscount
              : getTotal(cart)}
          </div>
          <div className="col">
            Total BV: {prevBVToConsider + totalBv * (bvWeightage / 100)}
          </div>
          <div className="col">
            Purchase BV: {totalBv * (bvWeightage / 100)}
          </div>
          <div className="col">BV Weightage: {bvWeightage}</div>
        </div>

        <br></br>
        <StyledButton
          onClick={
            rePurchase
              ? this.rePurchaseCreateOrderApi
              : this.addAdpCreateOrderApi
          }
          disabled={cart.length == 0 ? true : false}
          className={cart.length == 0 ? "disabled" : ""}
          variant="contained"
          color="primary"
        >
          {addAdp ? "ADD ADP" : "PLACE ORDER"}
        </StyledButton>
        {toggleBuyProducts && (
          <StyledButton
            onClick={toggleBuyProducts}
            variant="contained"
            color="secondary"
            className="grey"
          >
            Back
          </StyledButton>
        )}

        <br></br>
        <br></br>
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
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    balance: state.fetchWalletStatus.balance,
    smartMartBalance: state.fetchSmartMartStatus.balance,
    adpData: state.createAdpReducer.adpData,
    adpId: state.updateRepurchaseAdpDetails.adpId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAdpData: bindActionCreators(updateAdpData, dispatch),
    fetchWalletAction: bindActionCreators(fetchWalletAction, dispatch),
    fetchSmartMartAction: bindActionCreators(fetchSmartMartAction, dispatch),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(withRouter(BuyProducts));

function getCategory() {
  return axios.get(`/list-category`);
}

function getCity() {
  return axios.get(`/list-city`);
}

function getProducts(body) {
  return axios.get(`/get-all-products`, body);
}

function getSubCategory(categoryId) {
  return axios.get(`/list-sub-category`, {
    params: {
      categoryId: categoryId,
    },
  });
}

function getProductType() {
  return axios.get(`/get-product-type`);
}

function getFranchise(body) {
  return axios.get(`/get-franchise`, body);
}

function addAdp(body) {
  return apiHandler.post(`/add-adp`, body);
}

function rePurchase(body) {
  return apiHandler.post(`/re-purchase`, body);
}

function getTotal(cartArray) {
  let total = 0;
  cartArray &&
    cartArray.forEach((elm) => {
      total = total + elm.actual_price * elm.quantityAdded;
    });

  return total;
}

function getTotalDiscount(cartArray) {
  let total = 0;
  cartArray &&
    cartArray.forEach((elm) => {
      total = total + elm.vdba * elm.quantityAdded + elm.vdba * elm.vdbd;
    });

  return total;
}

function getBvWeightage() {
  return apiHandler.get("/bv-weightage");
}

function getPreviousBv() {
  return apiHandler.get("/bv");
}

function getTotalBv(products) {
  let totalBv = 0;
  products &&
    products.forEach((elm) => {
      totalBv = totalBv + elm.bv * elm.quantityAdded;
    });

  return totalBv;
}

function calcBvWeightage(totalBv, bvWeightageList) {
  let bvWeightage = 0;
  bvWeightageList &&
    bvWeightageList.forEach((elm) => {
      if (elm.min_value <= totalBv && elm.max_value > totalBv) {
        bvWeightage = elm.value;
      } else if (elm.min_value <= totalBv && elm.max_value == 0) {
        bvWeightage = elm.value;
      }
    });
  return bvWeightage;
}

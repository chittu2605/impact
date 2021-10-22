import React from "react";
import ProductCard from "../atom/ProductCard";
import styled from "styled-components";
import axios from "axios";
import Select from "react-select";
import Popup from "../molecule/Popup";
import { apiHandler } from "../../config/apiConfig";
import FranchiseDetails from "../atom/FranchiseDetails";
import { device } from "../../constants/mediaQueries/device";
import InfiniteScroll from "react-infinite-scroller";

const styles = {
  productContainer: {
    textAlign: "center",
  },
  productWrapper: {
    // overflow: "auto",
    // height: "calc(100vh - 350px)",
    [device.tablet]: {
      height: "calc(100vh - 222px)",
      paddingTop: "1rem",
      overflow: "auto",
    },
  },
};

const ProductContainer = styled("div")(styles.productContainer);
const ProductWrapper = styled("div")(styles.productWrapper);

class Products extends React.Component {
  state = {
    cityOptions: [],
    selectedCity: {},
    categoryOptions: [],
    selectedCategory: [],
    subCategoryOptions: [],
    selectedSubCategory: [],
    filteredProducts: [],
    selectedProductData: {},
    selectedFranchise: [],
    franchiseoption: [],
    showPopup: false,
    selectedProductType: [],
    productTypeOptions: [],
    productCards: [],
    hasMore: true,
  };
  componentDidMount() {
    // getProducts().then((response) => {
    //     this.setState({
    //         products: response.data.results
    //     })
    // });
    this.getCityList();
    this.getCategoryList();
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

  handleChange = (type, value, pageNo = 0) => {
    if (type === "selectedCity") {
      this.setState({
        selectedFranchise: [],
      });
    }
    if (type && value) {
      this.setState(
        {
          [type]: value,
          hasMore: true,
          productCards: [],
        },
        () => this.getProductList(type, value, pageNo)
      );
    } else {
      this.getProductList(type, value, pageNo);
    }
  };

  getCategoryList = () => {
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
  };

  getCityList = () => {
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
  };

  getFranchiseList = (body) => {
    getFranchise(body).then((response) => {
      let franchiseOptions = [];
      response.data.results &&
        response.data.results.forEach((elm) => {
          let obj = elm;
          obj.value = elm.id;
          obj.label = elm.franchise_name;
          franchiseOptions.push(obj);
        });
      this.setState({
        franchiseOptions,
      });
    });
  };

  getProductList = (type, value, pageNo) => {
    let body = {};
    let {
      selectedCity,
      selectedCategory,
      selectedSubCategory,
      selectedFranchise,
      selectedProductType,
    } = this.state;
    if (selectedCity.value) body.city = selectedCity.value;
    if (selectedCategory.value) body.categoryId = selectedCategory.value;
    if (selectedSubCategory.value)
      body.subCategoryId = selectedSubCategory.value;
    if (selectedFranchise.value) body.franchiseId = selectedFranchise.value;
    if (selectedProductType.value) body.productType = selectedProductType.value;
    body.pageNo = pageNo;
    if (type === "selectedCategory") {
      this.setState(
        {
          selectedSubCategory: [],
        },
        () => {
          this.subCategoryApiCall(value.value);
        }
      );
    }

    if (type === "selectedSubCategory") {
    }

    if (type === "selectedCity") {
      this.setState(
        {
          selectedFranchise: [],
          selectedCategory: [],
          selectedSubCategory: [],
        },
        () => {
          this.getFranchiseList(body);
        }
      );
    }

    if (type === "selectedFranchise") {
      this.setState({
        selectedCategory: [],
        selectedSubCategory: [],
      });
    }
    getProducts(body).then((response) => {
      if (
        response.data &&
        response.data.results &&
        response.data.results.length
      ) {
        this.setState({
          productCards: [
            ...this.state.productCards,
            ...response.data.results.map((elm) => (
              <ProductCard
                key={elm.id}
                {...elm}
                handleReadMoreclicked={() => this.handleReadMoreclicked(elm)}
              />
            )),
          ],
        });
        if (response.data.results.length < 30) {
          this.setState({
            hasMore: false,
          });
        }
      }
    });
  };
  handleReadMoreclicked = (data) => {
    this.setState({
      selectedProductData: data,
      showPopup: data.product ? true : false,
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

  render() {
    const {
      products,
      cityOptions,
      categoryOptions,
      subCategoryOptions,
      filteredProducts,
      selectedCity,
      selectedCategory,
      selectedSubCategory,
      selectedProductData,
      showPopup,
      franchiseOptions,
      selectedFranchise,
      selectedProductType,
      productTypeOptions,
      productCards,
    } = this.state;
    return (
      <ProductContainer className="container-fluid">
        {showPopup && (
          <Popup
            {...selectedProductData}
            handleReadMoreclicked={() => this.handleReadMoreclicked({})}
          />
        )}

        <br></br>
        <div className="row">
          <div className="col-xs-12 col-md-2">
            <Select
              options={productTypeOptions}
              // isMulti
              placeholder="Product Type"
              value={selectedProductType}
              onChange={(value) => {
                this.handleChange("selectedProductType", value);
              }}
            />
          </div>

          <div className="col-xs-12 col-md-2">
            <Select
              options={cityOptions}
              // isClearable
              placeholder="City"
              onChange={(value) => {
                this.handleChange("selectedCity", value);
              }}
            />
          </div>

          <div className="col-xs-12 col-md-4">
            <Select
              options={franchiseOptions}
              placeholder="Franchise"
              value={selectedFranchise}
              onChange={(value) => {
                this.handleChange("selectedFranchise", value);
              }}
            />
          </div>

          <div className="col-xs-12 col-md-2">
            <Select
              options={categoryOptions}
              // isMulti
              placeholder="Category"
              value={selectedCategory}
              onChange={(value) => {
                this.handleChange("selectedCategory", value);
              }}
            />
          </div>

          <div className="col-xs-12 col-md-2">
            <Select
              options={subCategoryOptions}
              // isMulti
              placeholder="Sub Category"
              value={selectedSubCategory}
              onChange={(value) => {
                this.handleChange("selectedSubCategory", value);
              }}
            />
          </div>
        </div>

        <br></br>
        <FranchiseDetails selectedFranchise={selectedFranchise} />

        <ProductWrapper>
          {this.state.productCards && this.state.productCards.length > 0 ? (
            <InfiniteScroll
              pageStart={0}
              loadMore={(page) => {
                this.handleChange(null, null, page);
              }}
              hasMore={this.state.hasMore}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
            >
              {this.state.productCards}
            </InfiniteScroll>
          ) : (
            "Nothing to Show"
          )}
        </ProductWrapper>
      </ProductContainer>
    );
  }
}

export default Products;

function getProducts(body) {
  return apiHandler.get(`/get-all-products`, {
    params: body,
  });
}

function getCity() {
  return apiHandler.get(`/list-city`);
}

function getCategoryAndSubCategory() {
  return apiHandler.get(`/get-category-with-sub-category`);
}

function getCategory() {
  return apiHandler.get(`/list-category`);
}

function getSubCategory(categoryId) {
  return apiHandler.get(`/list-sub-category`, {
    params: {
      categoryId: categoryId,
    },
  });
}

function getFranchise(body) {
  return apiHandler.get(`/get-franchise`, {
    params: body,
  });
}

function getProductType() {
  return apiHandler.get(`/get-product-type`);
}

// function filterProducts(products, city, category, franchise) {
//     let filteredProducts = [];
//     // let categories = []
//     // subCategory && subCategory.forEach((elm) => {
//     //     categories.push(elm.value);
//     // })

//     products && products.forEach((elm) => {
//         if (city && city.value && category && category.value) {
//             if (elm.city.includes(city.label) && (category.value === elm.category_id)) {
//                 filteredProducts.push(elm);
//             }
//         } else if (city && city.value) {
//             if (elm.city.includes(city.label)) {
//                 filteredProducts.push(elm);
//             }
//         } else if (category.value === elm.category_id) {
//             filteredProducts.push(elm);
//         }

//     })

//     return filteredProducts;
// }

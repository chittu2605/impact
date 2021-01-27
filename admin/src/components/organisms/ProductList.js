import React from "react";
import TextInput from "../atoms/TextInput";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { device } from "../../utils/mediaQueries/device";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import SelectCategory from "../atoms/SelectCategory";
import { getAdminProductAction } from "../../redux/actions/franchise";
import Select from "react-select";
import axios from "axios";
import FranchiseProductTable from "../molecules/FranchiseProductTable";
import { Button } from "@material-ui/core";
import Example from "./Example";
import DeleteIcon from '@material-ui/icons/Delete';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
import { date } from "yup";
import { apiHandler } from "../../utils/apiConfig";

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

  deleteIcon: {
    width: "100%",
    position: 'absolute',
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    
  },
  
};

const columns = 
  [
    {key: "delete", name: "Action", width: 15},
    // {key: "product", name: "Product Name", width: 200, editable: true},
    {key: "price", name: "Price", width: 80, editable: true, type: "number"},
    {key: "discount", name: "Discount", width: 100, editable: true},
    {key: "after_discount", name: "Price After discount", width: 170, editable: false},
    {key: "retail_profit", name: "Retail Profit", width: 120, editable: true},
    {key: "actual_price", name: "Actual Price", width: 120, editable: false},
    {key: "bv", name: "Business Volume", width: 150, editable: true},
    {key: "maxPurchase", name: "Max Purchase", width: 130, editable: true},
    {key: "quantity", name: "Quantity", width: 100, editable: true},
    {key: "vdbc", name: "VDBC", width: 100, editable: true},
    {key: "vdbd", name: "VDBD", width: 100, editable: true},
    {key: "vdba", name: "VDBA", width: 100, editable: true},
    {key: "free_code", name: "Free Product", width: 150, editable: true},
    {key: "free_code_from_calendar", name: "From", width: 150, editable: true},
    {key: "free_code_to_calendar", name: "To", width: 150, editable: true},
  ]

class ProductList extends React.Component {
  state = {
    selectedCategory: [],
    categoryOptions: [],
    subCategoryOptions: [],
    selectedSubCategory: [],
    
    selectedProductType: [],
    productTypeOptions: [],
    productList: [],
  };

 

  componentDidMount() {
    
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

    if (this.props.rowKey !== 1 ) {
      // this.handleChange("selectedCity",  this.props.selectedMainCity)
      this.handleChange("selectedCategory", this.props.selectedMainCategory);
    }
      
    
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
              if(value) this.subCategoryApiCall(value.value);
            }
          );
        } 
        else if (type === "selectedSubCategory") {
          let body = {
            params: {
              productType: this.state.selectedProductType.value,
              categoryId: this.state.selectedCategory.value,
              subCategoryId: this.state.selectedSubCategory.value,
            }
          }
          getProducts(body).then((response) => {
            debugger
            let products = response.data.results;
            let categoryIds = getDistinctCategoryId(products);
            const {classes, className, franchiseProducts} = this.props;
            var result = []
            products.forEach((el, i) => {
              let isDuplicate = false;
              franchiseProducts && franchiseProducts.forEach((existingProduct) => {
                if (existingProduct.product == el.product) {
                  isDuplicate = true
                }
              })

              if (!isDuplicate) {
                var obj = Object.assign({}, el);
                obj.delete = <DeleteIcon className={clsx(classes.deleteIcon, className)} onClick={(event) => {event.stopPropagation(); this.removeProducts(obj.id)}}/>;
                obj.details && obj.details.forEach((elm, i) => {
                  elm.delete = <DeleteIcon className={clsx(classes.deleteIcon, className)} onClick={(event) => {event.stopPropagation(); this.removeProducts(obj.id, elm.id)}}/>;
                  elm.free_code_from_calendar = <DatePicker onChange={(date) => {this.handleCalendarChange(i,"free_code_from", date)}} selected={elm.free_code_from} minDate={new Date()} dateFormat={"dd/MM/yyyy"}/>
                  elm.free_code_to_calendar = <DatePicker onChange={(date) => {this.handleCalendarChange(i,"free_code_to", date)}} selected={elm.free_code_to} minDate={new Date(elm.free_code_from)} dateFormat={"dd/MM/yyyy"}/>
                })
                
                result.push(obj) ;
              }
              
            })

            let rowKey = this.props.rowKey;
            
            this.setState({
              productList: result
            }, () => {
              this.props.updateProductsToRows(rowKey, result)
            })
          })
        }
      }
    );
  };

  handleCalendarChange = (index, key, date) => {
    let productList = this.state.productList;
    // productList[index][key] = date;
    // this.setState({
    //   productList
    // })
    let data = {
      fromRow: index,
      toRow: index,
      updated: {
        [key]: date.toDateString("dd/MM/yyy"),
      }
    }

    if (key === "free_code_from") {
      data.updated["free_code_from_calendar"] = <DatePicker onChange={(date) => {this.handleCalendarChange(index,"free_code_from", date)}} selected={new Date(date.toDateString("dd/MM/yyy"))} minDate={new Date()} dateFormat={"dd/MM/yyyy"}/>
      data.updated["free_code_to_calendar"] = <DatePicker onChange={(date) => {this.handleCalendarChange(index,"free_code_to", date)}} selected={""} minDate={new Date(date.free_code_from)} dateFormat={"dd/MM/yyyy"}/>
    } else if (key === "free_code_to") {
      data.updated["free_code_to_calendar"] = <DatePicker onChange={(date) => {this.handleCalendarChange(index,"free_code_to", date)}} selected={new Date(date.toDateString("dd/MM/yyy"))} minDate={new Date(productList[index]["free_code_from"])} dateFormat={"dd/MM/yyyy"}/>
    } 
    this.onRowsUpdate(data)
  }

  removeProducts = (productId, subProductId) => {
    let productList = clone(this.state.productList);
    if (subProductId) {
      let details = [];
      productList && productList.forEach((elm) => {
        if (elm.id === productId) {
          details = elm.details.filter(function (el) {
            return el.id !== subProductId
          });
          elm.details = details;
        }
      })
      if (details.length === 0) {
        productList = productList.filter(function (el) {
          return el.id !== productId
        });
      }
    } else {
      productList = productList.filter(function (el) {
        return el.id !== productId
      });
    }
    

    this.setState({
      productList
    }, () => {
      this.props.updateProductsToRows(this.props.rowKey, productList)
    })
  }

  onRowsUpdate = ( fromRow, toRow, updated, index ) => {
    let rowKey = this.props.rowKey;
    let currentProduct = this.state.productList[index].details[fromRow];
    let changedKey = Object.keys(updated)[0];
    // if (currentProduct.free_code === "" && (changedKey === 'free_code_to' || changedKey === 'free_code_from')) {
    //   // return alert("Please enter Free Product Code")
    // } else 
    if (changedKey === "price" || changedKey === "discount" || changedKey === "retail_profit"){
      updated = validateProductChange(currentProduct, changedKey, updated[changedKey], updated)
    }
    this.setState(state => {
      const productList = state.productList.slice();
      const productDetails = productList[index].details.slice();
      for (let i = fromRow; i <= toRow; i++) {
        productDetails[i] = { ...productDetails[i], ...updated };
      }
      productList[index].details = productDetails;
      return { productList };
    }, () => {
      this.props.updateProductsToRows(this.props.rowKey, this.state.productList)
    });
  };

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    let { addedSample } = this.props;
    // if (prevProps.addedSample != addedSample) {
      if (!addedSample && nextProps.productListData == this.props.productListData) return 
      let products = nextProps.productListData;
      const {classes, className} = this.props;
      if (!Array.isArray(products)) {
        let key = Object.keys(products);
        products = products[key]
      }
      var result = products && products.map((el, i) => {
        var obj = Object.assign({}, el);
        var obj = Object.assign({}, el);
        obj.delete = <DeleteIcon className={clsx(classes.deleteIcon, className)} onClick={(event) => {event.stopPropagation(); this.removeProducts(obj.id)}}/>;
          obj.details && obj.details.forEach((elm, i) => {
            elm.delete = <DeleteIcon className={clsx(classes.deleteIcon, className)} onClick={(event) => {event.stopPropagation(); this.removeProducts(obj.id, elm.id)}}/>;
            elm.free_code_from_calendar = <DatePicker onChange={(date) => {this.handleCalendarChange(i,"free_code_from", date)}} selected={elm.free_code_from} minDate={new Date()} dateFormat={"dd/MM/yyyy"}/>
            elm.free_code_to_calendar = <DatePicker onChange={(date) => {this.handleCalendarChange(i,"free_code_to", date)}} selected={elm.free_code_to} minDate={new Date(elm.free_code_from)} dateFormat={"dd/MM/yyyy"}/>
          })
          
        return obj;
      })

      let rowKey = this.props.rowKey;
      debugger
      if (result.length > 0) this.setSelectedDataForSample(result[0])
      this.setState({
        productList: result
      }, () => {
        
        
        this.props.updateProductsToRows(rowKey, result)
      })
    // }
  }


  setSelectedDataForSample = (product) => {
    debugger
    let { categoryOptions, productTypeOptions } = this.state;

    let selectedCategory = categoryOptions.filter(function (el) {
      return el.value == product.category_id
    })[0];

    let subCategoryOptions = [];
      getSubCategory(product.category_id).then((response) => {

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
        }, () => {
          let selectedSubCategory = subCategoryOptions.filter(function (el) {
            return el.value == product.sub_category_id
          })[0];
          this.setState({
            selectedSubCategory,
          })
        });
      });
    

    let selectedProductType = productTypeOptions.filter(function (el) {
      return el.value == product.product_type
    })[0];
    this.setState({
      selectedCategory,
      
      selectedProductType
    }, () => {
      this.handleChange("selectedCategory", selectedCategory)
    })
  } 

  

  render() {
    const { 
      classes, 
      className, 
      franchiseName,
      franchiseAddress,
      franchisePhone,
      productListData,
      rowKey,
      handleChangeState,
      selectedMainCategory,
      

    } = this.props;

    const {
      categoryOptions,
      selectedCategory,
      subCategoryOptions,
      selectedSubCategory,
      productList,
      selectedProductType,
      productTypeOptions
      
    } = this.state;
    



     return (
      <Grid container spacing={2} style={{ border: '1px solid #bdbdbd', marginTop: '2rem',}}>
        <Grid
          item
          xs={12}
          // sm={}
          // md={8}
          className={clsx(classes.grid, className)}
        >
          {/* <Paper className={classes.paper}> */}
            <Grid container spacing={2}>
            <Grid
                item
                xs={12}
                sm={3}
                // md={8}
                className={clsx(classes.grid, className)}
              >
                <Select
                  options={productTypeOptions}
                  // isMulti
                  placeholder="Product Type"
                  value={selectedProductType}
                  onChange={(value) => {
                    this.handleChange("selectedProductType", value);
                  }}
                />
              </Grid>
            
              <Grid
                item
                xs={12}
                sm={3}
                // md={8}
                className={clsx(classes.grid, className)}
              >
                <Select
                  options={categoryOptions}
                  // isMulti
                  isDisabled={rowKey == 1 ? false : true}
                  placeholder="Category"
                  value={selectedCategory}
                  isDisabled={(selectedProductType && selectedProductType.label === undefined)   ? true : false}
                  onChange={(value) => {
                    // this.handleChange("selectedCategory", value);
                    this.handleChange("selectedCategory", value );
                    handleChangeState("selectedMainCategory", value);
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                // md={8}
                className={clsx(classes.grid, className)}
              >
                <Select
                  options={subCategoryOptions}
                  // isMulti
                  placeholder="Sub Category"
                  value={selectedSubCategory}
                  isDisabled={selectedCategory && selectedCategory.label === undefined ? true : false}
                  onChange={(value) => {
                    this.handleChange("selectedSubCategory", value);
                  }}
                  
                />
                <br></br>
                
              </Grid>
            </Grid>
           
           
          {/* </Paper> */}

         <FranchiseProductTable 
            productList={productList}
            removeProducts={this.removeProducts}
            columns={columns}
            onRowsUpdate={this.onRowsUpdate}
            key={rowKey}
          />
          



          <br></br>
          
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
    getAdminProductAction: bindActionCreators(getAdminProductAction, dispatch),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withStyles(styles)(connector(ProductList));



function getCategory() {
  return apiHandler.get(`/list-category`);
}


function getProducts(body) {
  return apiHandler.get(`/get-products-admin`, body);
}

function getSubCategory(categoryId) {
  return apiHandler.get(`/list-sub-category`, {
    params: {
      categoryId: categoryId,
    },
  });
}

function getProductType() {
  return apiHandler.get(`/get-product-type`);
}


function validateProductChange (product, key, value, object) {

  object.price = key === "price"? value : product.price;
  object.after_discount = key === "price"? (value - product.discount) : (key === "discount" ? (product.price - value) : (product.price - product.discount));
  object.actual_price = key === "price"? (value - product.discount - product.retail_profit) : (key === "discount" ? (product.price - value - product.retail_profit) : (product.price - product.discount - value));
  return object;
}

function clone(item) {
  if (!item) { return item; } // null, undefined values check

  var types = [ Number, String, Boolean ], 
      result;

  // normalizing primitives if someone did new String('aaa'), or new Number('444');
  types.forEach(function(type) {
      if (item instanceof type) {
          result = type( item );
      }
  });

  if (typeof result == "undefined") {
      if (Object.prototype.toString.call( item ) === "[object Array]") {
          result = [];
          item.forEach(function(child, index, array) { 
              result[index] = clone( child );
          });
      } else if (typeof item == "object") {
          // testing that this is DOM
          if (item.nodeType && typeof item.cloneNode == "function") {
              result = item.cloneNode( true );    
          } else if (!item.prototype) { // check that this is a literal
              if (item instanceof Date) {
                  result = new Date(item);
              } else {
                  // it is an object literal
                  result = {};
                  for (var i in item) {
                      result[i] = clone( item[i] );
                  }
              }
          } else {
              // depending what you would like here,
              // just keep the reference, or create new object
              if (false && item.constructor) {
                  // would not advice to do that, reason? Read below
                  result = new item.constructor();
              } else {
                  result = item;
              }
          }
      } else {
          result = item;
      }
  }

  return result;
}

function getDistinctCategoryId(array) {
  var flags = [],
    output = [],
    l = array.length,
    i;
  for (i = 0; i < l; i++) {
    if (flags[array[i].category_id]) continue;
    flags[array[i].category_id] = true;
    output.push(array[i].category_id);
  }
  return output;
}
import React from "react";
import { Slate } from "../atoms/Slate";
import { Paper, withStyles, Grid, styled } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { device } from "../../utils/mediaQueries/device";
import clsx from "clsx";
import TextInput from "../atoms/TextInput";
import Select from "react-select";
import { apiHandler } from "../../utils/apiConfig";
import { Formik } from "formik";
import * as Yup from "yup";
import Compressor from "compressorjs";

const styles = {
  input: {
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
    marginBottom: "1rem",
  },
  grid: {
    // margin: "auto"
  },
  error: {
    borderBottom: "2px solid red",
  },
  select: {
    marginTop: "0.6rem",
  },
  feedBack: {
    color: "red",
  }
};

const yesNoObj = [
  {
    label: "Yes",
    value: 1,
  },
  {
    label: "No",
    value: 0,
  },
];

const productUnitObj = {
  unitQuantity: 0,
  unit: [],
  price: 0,
  discount: 0,
  priceAfterDiscount: 0,
  retailProfit: 0,
  actualPrice: 0,
  gst: 0,
  franchiseCommision: 0,
  bv: 0,
  vdbc: 0,
  vdbd: 0,
  vdba: 0,
  freeCode: "",
  freeCodeTo: "",
  freeCodeFrom: "",
  quantity: 1,
  maxPurchase: "",
  saved: false,
};

const CustomSelect = styled(Select)(styles.select);
const StyledPaper = styled(Paper)(styles.paper);
const Feedback = styled("div")(styles.feedBack);

class AddProduct extends React.Component {
  state = {
    productTypeOptions: [],
    selectedProductType: {
      value: 1,
      label: "BV STORE",
    },
    productName: "",
    categoryOptions: [],
    selectedCategoryOption: [],
    subCategoryOptions: [],
    selectedSubCategoryOption: [],
    shortDesc: "",
    desc: "",
    referral: [],
    training: [],
    productQuantityType: [],
    unitOption: getUnit(),
    image: "",
  };

  handleChange = (type, value) => {
    this.setState({
      [type]: value,
    });
  };

  handleBlur = () => {};

  componentDidMount = () => {
    this.getCategory();
    this.getProductType();
    this.addProductQuantityType();
  };

  getCategory = () => {
    getCategoryApi().then((response) => {
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

  getProductType = () => {
    getProductTypeApi().then((response) => {
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

  getSubCategory = (categoryId) => {
    getSubCategoryApi(categoryId).then((response) => {
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

  addProductQuantityType = () => {
    let { productQuantityType } = this.state;
    productQuantityType.push(productUnitObj);
    this.setState({
      productQuantityType,
    });
  };

  handleObjectChange = (index, obj) => {
    let { productQuantityType } = this.state;
    productQuantityType[index] = obj;
    this.setState({
      productQuantityType,
    });
  };

  deleteProductType = (index) => {
    let { productQuantityType } = this.state;
    productQuantityType.splice(index, 1);
    this.setState({
      productQuantityType,
    });
  }

  validateField = () => {
    let { 
      selectedProductType,
      productName,
      selectedCategoryOption,
      selectedSubCategoryOption,
      shortDesc,
      desc,
      referral,
      training,
      productQuantityType ,
    } = this.state;

    let error = [];
    if (!selectedProductType.value) {
      error.push("Please select Product Type.")
    }
    if (!productName) {
      error.push("Please Enter Product Name.")
    }
    if (!selectedCategoryOption.value) {
      error.push("Please select Category.")
    }
    if (!selectedSubCategoryOption.value) {
      error.push("Please select Sub Category.")
    }
    if (!referral.label) {
      error.push("Please select Referal Type.")
    }
    if (!training.label) {
      error.push("Please select Training Type.")
    }
    
    if (error.length == 0) {
      this.handleCreateProduct();
    } else {
      alert(error.join("\n"))
    }

  }

  handleCreateProduct = () => {
    let { 
      selectedProductType,
      productName,
      selectedCategoryOption,
      selectedSubCategoryOption,
      shortDesc,
      desc,
      referral,
      training,
      productQuantityType ,
      image
    } = this.state;

    let body = {
      product_type: selectedProductType.value,
      product: productName,
      category_id: selectedCategoryOption.value,
      sub_category_id: selectedSubCategoryOption.value,
      short_desc: shortDesc,
      desc: desc,
      productQuantityType,
      image

    }

    var bodyFormData = new FormData();
    for ( var key in body ) {
        if (key === "image" && body[key] !== "") {
            bodyFormData.append(key, body[key], body[key].name);
        } else if (key === "productQuantityType") {
            bodyFormData.append(key, JSON.stringify(body[key]));
        } else {
          bodyFormData.append(key, body[key]);
      }
        
    }
    createProduct(bodyFormData).then((response) => {
      this.props.history.push("/products")
    })
  }

  render() {
    const { classes, className } = this.props;
    const {
      categoryOptions,
      productName,
      productTypeOptions,
      selectedProductType,
      subCategoryOptions,
      shortDesc,
      desc,
      referral,
      training,
      selectedCategoryOption,
      selectedSubCategoryOption,
      productQuantityType,
      unitOption
    } = this.state;
    return (
      <Slate>
        <Paper className={classes.paper}>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            <div className="col-sm-4">
              <CustomSelect
                options={productTypeOptions}
                placeholder="Product Type"
                value={selectedProductType}
                onChange={(selectedOption) => {
                  this.handleChange("selectedProductType", selectedOption);
                }}
              />
            </div>

            <div class="col-sm-4">
              <CustomSelect
                options={categoryOptions}
                placeholder="Category"
                id="categoryId"
                name="categoryId"
                // isClearable
                value={selectedCategoryOption}
                onChange={(selectedOption) => {
                  this.handleChange("selectedCategoryOption", selectedOption);
                  this.getSubCategory(selectedOption.value);
                  this.handleChange("selectedSubCategoryOption", []);
                }}
              />
            </div>

            <div class="col">
              <CustomSelect
                options={subCategoryOptions}
                placeholder="Sub Category"
                id="subCategoryId"
                name="subCategoryId"
                // isClearable
                value={selectedSubCategoryOption}
                onChange={(selectedOption) => {
                  this.handleChange(
                    "selectedSubCategoryOption",
                    selectedOption
                  );
                }}
              />
            </div>

            <div class="col-sm-4">
              <TextInput
                label="Product Name"
                id="productName"
                type="text"
                value={productName}
                onChange={(e) => {
                  this.handleChange("productName", e.target.value);
                }}
                className={`${classes.input}`}
              />
            </div>

            <div class="col-sm-4">
              <TextInput
                label="Short Desc"
                id="shortDesc"
                type="text"
                value={shortDesc}
                onChange={(e) => {
                  this.handleChange("shortDesc", e.target.value);
                }}
                className={`${classes.input}`}
              />
            </div>

            <div class="col-sm-4">
              <TextInput
                label="Desc"
                id="desc"
                type="text"
                value={desc}
                onChange={(e) => {
                  this.handleChange("desc", e.target.value);
                }}
                className={`${classes.input}`}
              />
            </div>

            <div class="col">
              <CustomSelect
                options={yesNoObj}
                placeholder="Referral"
                id="referral"
                name="referral"
                // isClearable
                value={referral}
                onChange={(selectedOption) => {
                  this.handleChange("referral", selectedOption);
                }}
              />
            </div>

            <div class="col">
              <CustomSelect
                options={yesNoObj}
                placeholder="Training"
                id="training"
                name="training"
                // isClearable
                value={training}
                onChange={(selectedOption) => {
                  this.handleChange("training", selectedOption);
                }}
              />
            </div>

            <div class="col">
              <br></br>
              <input
                id="image"
                name="image"
                type="file"
                onChange={(event) => {
                  let self = this;
                  let reader = new FileReader();
                  let file = event.currentTarget.files[0];
                  
                  reader.onloadend = () => {
                    let image = new Compressor(file, {
                      // maxWidth: 120,
                      // maxHeight: 120,
                      // quality: 0.6,
                      success(result) {
                        self.handleChange("image", result);
                      },
                    });
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </div>
          </div>
          <br></br>
          
          <button
            type="button"
            className="btn btn-primary"
            type="submit"
            onClick={this.addProductQuantityType}
            disabled={productQuantityType && productQuantityType.length == 0 ? false : ( productQuantityType[productQuantityType.length - 1]["saved"] == true ? false : true)}
          >
            +
          </button>

          <button
            className="btn btn-danger"
            onClick={this.validateField}
            style={{
              marginLeft: "1rem"
            }}
            disabled={productQuantityType && productQuantityType.length == 0 ? false : ( productQuantityType[productQuantityType.length - 1]["saved"] == true ? false : true)}

          >
            Create Product
          </button>
        </Paper>

        {productQuantityType &&
          productQuantityType.map((elm, i) => {
            return (
              <ProductQuantityType
                dataObj={elm}
                index={i}
                key={i}
                handleObjectChange={this.handleObjectChange}
                deleteProductType={this.deleteProductType}
                unitOption={unitOption}
              />
            );
          })}
      </Slate>
    );
  }
}

export default withStyles(styles)(withRouter(AddProduct));

function getCategoryApi() {
  return apiHandler.get(`/list-category`);
}

function getSubCategoryApi(categoryId) {
  return apiHandler.get(`/list-sub-category`, {
    params: {
      categoryId: categoryId,
    },
  });
}

function getProductTypeApi() {
  return apiHandler.get(`/get-product-type`);
}

function createProduct(body) {
  return apiHandler.post(`/add-product`, body);
}

function getUnit() {
  let unitsObject = [];
  apiHandler.get(`/list-units`).then((response) => {
    let units = response.data.results;

    units &&
      units.forEach((elm) => {
        let obj = {
          label: elm.unit,
          value: elm.id,
        };
        unitsObject.push(obj);
      });
  });
  return unitsObject;
}

const ProductQuantityType = (props) => {
  let {
    dataObj,
    handleChange,
    handleBlur,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    handleObjectChange,
    index,
    deleteProductType,
    unitOption
  } = props;

  let initialDataObj = JSON.parse(JSON.stringify(dataObj))
  return (
    <Formik
      initialValues={initialDataObj}
      validationSchema={Yup.object().shape({
        price: Yup.number()
          .min(1)
          .positive("please enter number greater than 0")
          .required("Enter Cost Price"),
        discount: Yup.number().min(0).required("Enter Discount"),
        retailProfit: Yup.number().min(0).required("Enter Profit"),
        gst: Yup.number().min(0).required("Enter GST"),
        bv: Yup.number().min(0).required("Enter BV"),
        quantity: Yup.number()
          .min(1)
          .positive("please enter number greater than 0")
          .required("Enter Quantity"),
        unit: Yup.string().required("Enter Unit"),
        maxPurchase: Yup.number(),
        vdba: Yup.number().min(0).required("Enter vdba"),
        vdbc: Yup.number().min(0).required("Enter vdbc"),
        vdbd: Yup.number().min(0).required("Enter vdbd"),
        unitQuantity: Yup.number()
          .positive("please enter number greater than 0")
          .required("Enter unit Quantity"),
      })}

      onSubmit={async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        if (values.saved) {
          values.saved = false
        } else {
          values.saved = true
        }
        values.priceAfterDiscount = values.price - values.discount;
        values.actualPrice = values.price - values.discount - values.retailProfit;
        handleObjectChange(index, values)
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          setFieldValue,
          setTouched,
          setFieldTouched,
        } = props;
        return (
          <StyledPaper>
            <form onSubmit={handleSubmit}>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                <div className="col">
                  <TextInput
                    label="Unit Quantity"
                    id="unitQuantity"
                    type="text"
                    value={values.unitQuantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.saved ? true : false}
                    className={
                      errors.unitQuantity && touched.unitQuantity
                        ? "text-input error"
                        : "text-input"
                    }
                    style={{
                      marginBottom: "1rem"
                    }}
                  />
                  {errors.unitQuantity && touched.unitQuantity && (
                    <Feedback className="input-feedback">{errors.unitQuantity}</Feedback>
                  )}
                </div>

                <div className="col">
                  <CustomSelect
                    options={unitOption}
                    placeholder="Unit"
                    id="unit"
                    name="unit"
                    isClearable
                    isDisabled={values.saved ? true : false}
                    // value={props.values.categoryId}
                    onChange={(selectedOption) => {
                      selectedOption
                        ? setFieldValue("unit", selectedOption.label)
                        : setFieldValue("unit", "");
                    }}
                    onBlur={() => {
                      setFieldTouched("unit");
                    }}
                    style={{
                      marginBottom: "1rem"
                    }}
                  />
                  <Feedback>{errors.unit}</Feedback>
                </div>

                <div className="col">
                  <TextInput
                    label="Price (Rs)"
                    id="price"
                    type="number"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.saved ? true : false}
                    className={
                      errors.price && touched.price
                        ? "text-input error"
                        : "text-input"
                    }
                    style={{
                      marginBottom: "1rem"
                    }}
                  />
                  {errors.price && touched.price && (
                    <Feedback className="input-feedback">{errors.price}</Feedback>
                  )}
                </div>

                <div className="col">
                  <TextInput
                    label="Discount (Rs)"
                    id="discount"
                    type="number"
                    value={values.discount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.saved ? true : false}
                    className={
                      errors.discount && touched.discount
                        ? "text-input error"
                        : "text-input"
                    }
                    style={{
                      marginBottom: "1rem"
                    }}
                  />
                  {errors.discount && touched.discount && (
                    <Feedback className="input-feedback">{errors.discount}</Feedback>
                  )}
                </div>

                <div className="col">
                  <TextInput
                    label="Price after discount (Rs)"
                    id="priceAfterDiscount"
                    type="number"
                    disabled
                    value={values.price - values.discount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.saved ? true : false}
                    className={
                      errors.priceAfterDiscount && touched.priceAfterDiscount
                        ? "text-input error"
                        : "text-input"
                    }
                    style={{
                      marginBottom: "1rem"
                    }}
                  />
                  {errors.priceAfterDiscount && touched.priceAfterDiscount && (
                    <Feedback className="input-feedback">
                      {errors.priceAfterDiscount}
                    </Feedback>
                  )}
                </div>

                <div className="col">
                  <TextInput
                    label="Retail Profit (Rs)"
                    id="retailProfit"
                    type="number"
                    value={values.retailProfit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.saved ? true : false}
                    className={
                      errors.retailProfit && touched.retailProfit
                        ? "text-input error"
                        : "text-input"
                    }
                    style={{
                      marginBottom: "1rem"
                    }}
                  />
                  {errors.retailProfit && touched.retailProfit && (
                    <Feedback className="input-feedback">{errors.retailProfit}</Feedback>
                  )}
                </div>

                <div className="col">
                  <TextInput
                    label="Actual Price (Rs)"
                    id="actualPrice"
                    type="number"
                    disabled
                    value={values.price - values.discount - values.retailProfit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.saved ? true : false}
                    className={
                      errors.actualPrice && touched.actualPrice


                      
                        ? "text-input error"
                        : "text-input"
                    }
                    style={{
                      marginBottom: "1rem"
                    }}
                  />
                  {errors.actualPrice && touched.actualPrice && (
                    <Feedback className="input-feedback">{errors.actualPrice}</Feedback>
                  )}
                </div>

                <div className="col">
                  <TextInput
                    label="GST (%)"
                    id="gst"
                    type="number"
                    value={values.gst}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.saved ? true : false}
                    className={
                      errors.gst && touched.gst
                        ? "text-input error"
                        : "text-input"
                    }
                    style={{
                      marginBottom: "1rem"
                    }}
                  />
                  {errors.gst && touched.gst && (
                    <Feedback className="input-feedback">{errors.gst}</Feedback>
                  )}
                </div>

                <div className="col">
                  <TextInput
                    label="Commision"
                    id="franchiseCommision"
                    type="number"
                    value={values.franchiseCommision}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.saved ? true : false}
                    className={
                      errors.franchiseCommision && touched.franchiseCommision
                        ? "text-input error"
                        : "text-input"
                    }
                    style={{
                      marginBottom: "1rem"
                    }}
                  />
                  {errors.franchiseCommision && touched.franchiseCommision && (
                    <Feedback className="input-feedback">
                      {errors.franchiseCommision}
                    </Feedback>
                  )}
                </div>

                <div className="col">
                  <TextInput
                    label="BV"
                    id="bv"
                    type="number"
                    value={values.bv}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.saved ? true : false}
                    className={
                      errors.bv && touched.bv
                        ? "text-input error"
                        : "text-input"
                    }
                    style={{
                      marginBottom: "1rem"
                    }}
                  />
                  {errors.bv && touched.bv && (
                    <Feedback className="input-feedback">{errors.bv}</Feedback>
                  )}
                </div>

                <div className="col">
                  <TextInput
                    label="VCB Credit"
                    id="vdbc"
                    type="number"
                    value={values.vdbc}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.saved ? true : false}
                    className={
                      errors.vdbc && touched.vdbc
                        ? "text-input error"
                        : "text-input"
                    }
                    style={{
                      marginBottom: "1rem"
                    }}
                  />
                  {errors.vdbc && touched.vdbc && (
                    <Feedback className="input-feedback">{errors.vdbc}</Feedback>
                  )}
                </div>

                <div className="col">
                  <TextInput
                    label="VCB Debit"
                    id="vdbd"
                    type="number"
                    value={values.vdbd}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.saved ? true : false}
                    className={
                      errors.vdbd && touched.vdbd
                        ? "text-input error"
                        : "text-input"
                    }
                    style={{
                      marginBottom: "1rem"
                    }}
                  />
                  {errors.vdbd && touched.vdbd && (
                    <Feedback className="input-feedback">{errors.vdbd}</Feedback>
                  )}
                </div>

                <div className="col">
                  <TextInput
                    label="VCB Admin"
                    id="vdba"
                    type="number"
                    value={values.vdba}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.saved ? true : false}
                    className={
                      errors.vdba && touched.vdba
                        ? "text-input error"
                        : "text-input"
                    }
                    style={{
                      marginBottom: "1rem"
                    }}
                  />
                  {errors.vdba && touched.vdba && (
                    <Feedback className="input-feedback">{errors.vdba}</Feedback>
                  )}
                </div>

                <div className="col">
                  <TextInput
                    label="Free Code"
                    id="freeCode"
                    type="text"
                    value={values.freeCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.saved ? true : false}
                    className={
                      errors.freeCode && touched.freeCode
                        ? "text-input error"
                        : "text-input"
                    }
                    style={{
                      marginBottom: "1rem"
                    }}
                  />
                  {errors.freeCode && touched.freeCode && (
                    <Feedback className="input-feedback">{errors.freeCode}</Feedback>
                  )}
                </div>

                <div className="col">
                  <TextInput
                    label="Free Code To"
                    id="freeCodeTo"
                    type="text"
                    value={values.freeCodeTo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.saved ? true : false}
                    className={
                      errors.freeCodeTo && touched.freeCodeTo
                        ? "text-input error"
                        : "text-input"
                    }
                    style={{
                      marginBottom: "1rem"
                    }}
                  />
                  {errors.freeCodeTo && touched.freeCodeTo && (
                    <Feedback className="input-feedback">{errors.freeCodeTo}</Feedback>
                  )}
                </div>

                <div className="col">
                  <TextInput
                    label="Free Code From"
                    id="freeCodeFrom"
                    type="text"
                    value={values.freeCodeFrom}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.saved ? true : false}
                    className={
                      errors.freeCodeFrom && touched.freeCodeFrom
                        ? "text-input error"
                        : "text-input"
                    }
                    style={{
                      marginBottom: "1rem"
                    }}
                  />
                  {errors.freeCodeFrom && touched.freeCodeFrom && (
                    <Feedback className="input-feedback">{errors.freeCodeFrom}</Feedback>
                  )}
                </div>

                <div className="col">
                  <TextInput
                    label="Quantity"
                    id="quantity"
                    type="text"
                    value={values.quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.saved ? true : false}
                    className={
                      errors.quantity && touched.quantity
                        ? "text-input error"
                        : "text-input"
                    }
                    style={{
                      marginBottom: "1rem"
                    }}
                  />
                  {errors.quantity && touched.quantity && (
                    <Feedback className="input-feedback">{errors.quantity}</Feedback>
                  )}
                </div>

                <div className="col">
                  <TextInput
                    label="Max Purchase"
                    id="maxPurchase"
                    type="number"
                    value={values.maxPurchase}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.saved ? true : false}
                    className={
                      errors.maxPurchase && touched.maxPurchase
                        ? "text-input error"
                        : "text-input"
                    }
                    style={{
                      marginBottom: "1rem"
                    }}
                  />
                  {errors.maxPurchase && touched.maxPurchase && (
                    <Feedback className="input-feedback">{errors.maxPurchase}</Feedback>
                  )}
                </div>
              </div>
              <br></br>
              {values.saved ? (
                <button
                  type="button"
                  className="btn btn-danger"
                  type="submit"
                  
                  // disabled={}
                >
                  Edit
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-danger"
                  type="submit"
                  
                  // disabled={}
                >
                  Done
                </button>
              )}

              <button
                className="btn btn-warning  pull-right"
                style={{
                  marginLeft: "1rem"
                }}
                onClick={() => {deleteProductType(index)}}
              >
                Delete
              </button>
            </form>
          </StyledPaper>
        );
      }}
    </Formik>
  );
};

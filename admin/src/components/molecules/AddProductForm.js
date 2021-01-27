import React from "react";
import TextInput from "../atoms/TextInput";
import { Grid, Button } from "@material-ui/core";
import clsx from "clsx";
import { device } from "../../utils/mediaQueries/device";
import { withStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getSubCategoryAction } from "../../redux/actions/subCategory";
import styled from "styled-components";
import axios from "axios";
import { apiHandler } from "../../utils/apiConfig";
import Compressor from "compressorjs";

const styles = {
  formInput: {
    width: "100%",
    [device.mobileL]: {
      width: "100%",
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
    marginBottom: "1rem",
  },
  grid: {
    // margin: "auto"
  },

  select: {
    marginTop: "0.6rem",
  },
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

const CustomSelect = styled(Select)(styles.select);
class AddProductForm extends React.Component {
  state = {
		productUnitType: [],
	};

  render() {
    const {
      classes,
      className,
      getSubCategoryAction,
      subCategoryList,
      handleProductAdd,
      cityList,
      toggleModal,
      productTypeOptions,
    } = this.props;
    let categoryOptions = generateSelectOption(
      this.props.categoryList,
      "category"
    );
    let subCategoryOptions = generateSelectOption(
      subCategoryList,
      "sub_category"
    );
    let cityListOptions = generateSelectOption(cityList, "city");
    let unitOption = getUnit();
    return (
      <div>
        <Formik
          initialValues={{
            productName: "",
            categoryId: "",
            subCategoryId: "",
            price: "",
            // sellingPrice: "",
            discount: "",
            retailProfit: "",
            gst: 0,
            franchiseCommision: "",
            bv: 0,
            vdbc: 0,
            vdbd: 0,
            freeCode: "",
            freeCodeTo: "",
            freeCodeFrom: "",
            quantity: "",
            unit: "",
            image: "",
            desc: "",
            shortDesc: "",
            maxPurchase: "",
            referral: 0,
            training: 0,
            // city: "",
            vdba: 0,
            productType: "",
            unitQuantity: "",
          }}
          onSubmit={async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            handleProductAdd({ product: values });
          }}
          validationSchema={Yup.object().shape({
            productName: Yup.string().required("Required"),
            categoryId: Yup.string().required("Select Category"),
            subCategoryId: Yup.string().required("Select Sub Category"),
            price: Yup.number()
              .min(1)
              .positive("please enter number greater than 0")
              .required("Enter Cost Price"),
            // sellingPrice: Yup.number().min(1).positive("please enter number greater than 0").required("Enter Selling Price"),
            discount: Yup.number().min(0).required("Enter Discount"),
            retailProfit: Yup.number().min(0).required("Enter Profit"),
            gst: Yup.number().min(0).required("Enter GST"),
            bv: Yup.number().min(0).required("Enter BV"),
            quantity: Yup.number()
              .min(1)
              .positive("please enter number greater than 0")
              .required("Enter Quantity"),
            unit: Yup.string().required("Enter Unit"),
            desc: Yup.string(),
            shortDesc: Yup.string(),
            maxPurchase: Yup.number(),
            referral: Yup.string().required("Select Referral"),
            training: Yup.string().required("Select Training"),
            // city: Yup.array().min(1).required("Please select atlease one city"),
            vdba: Yup.number().min(0).required("Enter vdba"),
            vdbc: Yup.number().min(0).required("Enter vdbc"),
            vdbd: Yup.number().min(0).required("Enter vdbd"),
            productType: Yup.string().required("Select Product Type"),
            unitQuantity: Yup.number()
              .positive("please enter number greater than 0")
              .required("Enter unit Quantity"),
          })}
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
              <form onSubmit={handleSubmit}>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                  <div class="col">
                    <CustomSelect
                      options={productTypeOptions}
                      // isMulti
                      placeholder="Product Type"
                      // value={values.productType}
                      onChange={(selectedOption) => {
                        selectedOption
                          ? setFieldValue("productType", selectedOption.value)
                          : setFieldValue("productType", "");
                      }}
                    />
                    {errors.productType && touched.productType && (
                      <div className="input-feedback">{errors.productType}</div>
                    )}
                  </div>

                  <div class="col">
                    <TextInput
                      label="Product Name"
                      id="productName"
                      type="text"
                      value={values.productName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.productName && touched.productName
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.productName && touched.productName && (
                      <div className="input-feedback">{errors.productName}</div>
                    )}
                  </div>

                  <div class="col">
                    <CustomSelect
                      options={categoryOptions}
                      placeholder="Category"
                      id="categoryId"
                      name="categoryId"
                      // value={props.values.categoryId}
                      isClearable
                      onChange={(selectedOption) => {
                        selectedOption &&
                          getSubCategoryAction(selectedOption.value);

                        selectedOption
                          ? setFieldValue("categoryId", selectedOption.value)
                          : setFieldValue("categoryId", "");
                      }}
                      onBlur={() => {
                        setFieldTouched("categoryId");
                      }}
                    />
                    {errors.categoryId && touched.categoryId && (
                      <div className="input-feedback">{errors.categoryId}</div>
                    )}
                  </div>
                  <div class="col">
                    <CustomSelect
                      options={subCategoryOptions}
                      placeholder="Sub Category"
                      id="subCategoryId"
                      name="subCategoryId"
                      isClearable
                      // value={props.values.categoryId}
                      onChange={(selectedOption) => {
                        selectedOption
                          ? setFieldValue("subCategoryId", selectedOption.value)
                          : setFieldValue("subCategoryId", "");
                      }}
                      onBlur={() => {
                        setFieldTouched("subCategoryId");
                      }}
                    />

                    {errors.subCategoryId && touched.subCategoryId && (
                      <div className="input-feedback">
                        {errors.subCategoryId}
                      </div>
                    )}
                  </div>

                  <div class="col">
                    <br></br>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      onChange={(event) => {
                        let reader = new FileReader();
                        let file = event.currentTarget.files[0];
                        reader.onloadend = () => {
                          let image = new Compressor(file, {
                            // maxWidth: 120,
                            // maxHeight: 120,
                            // quality: 0.6,
                            success(result) {
                              setFieldValue("image", result);
                            },
                          });
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                  </div>

                  <div class="col">
                    <TextInput
                      label="Short Desc"
                      id="shortDesc"
                      type="text"
                      value={values.shortDesc}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.shortDesc && touched.shortDesc
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.shortDesc && touched.shortDesc && (
                      <div className="input-feedback">{errors.shortDesc}</div>
                    )}
                  </div>

                  <div class="col">
                    <TextInput
                      label="Desc"
                      id="desc"
                      type="text"
                      value={values.desc}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.desc && touched.desc
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.desc && touched.desc && (
                      <div className="input-feedback">{errors.desc}</div>
                    )}
                  </div>

                  <div class="col">
                    <CustomSelect
                      options={yesNoObj}
                      placeholder="Referral"
                      id="referral"
                      name="referral"
                      isClearable
                      value={SelectOptionByValue(yesNoObj, values.referral)}
                      onChange={(selectedOption) => {
                        selectedOption
                          ? setFieldValue("referral", selectedOption.value)
                          : setFieldValue("referral", "");
                      }}
                      onBlur={() => {
                        setFieldTouched("referral");
                      }}
                    />
                    {errors.referral}
                  </div>

                  <div class="col">
                    <CustomSelect
                      options={yesNoObj}
                      placeholder="Training"
                      id="training"
                      name="training"
                      isClearable
                      value={SelectOptionByValue(yesNoObj, values.training)}
                      onChange={(selectedOption) => {
                        selectedOption
                          ? setFieldValue("training", selectedOption.value)
                          : setFieldValue("training", "");
                      }}
                      onBlur={() => {
                        setFieldTouched("training");
                      }}
                    />
                    {errors.training}
                  </div>
                </div>
                <br></br>

                <ProductQuantityType
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  unitOption={unitOption}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                />

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={toggleModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Save changes
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.updateCityList.status,
    subCategoryList: state.updateSubCategoryList.subCategoryList,
    categoryList: state.updateCategoryList.categoryList,
    cityList: state.updateCityList.cityList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSubCategoryAction: bindActionCreators(getSubCategoryAction, dispatch),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withStyles(styles)(connector(AddProductForm));

function generateSelectOption(data, labelKey) {
  let options = [];
  data &&
    data.forEach((elm) => {
      let obj = {
        label: elm[labelKey],
        value: elm.id,
      };
      options.push(obj);
    });

  return options;
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

function SelectOptionByValue(arr, value) {
  let selectedOption = {};
  arr &&
    arr.forEach((elm) => {
      if (elm.value == value) {
        selectedOption = elm;
      }
    });

  return selectedOption;
}

const ProductQuantityType = (props) => {
  let {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    unitOption,
    setFieldValue,
    setFieldTouched,
  } = props;
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
      <div className="col">
        <TextInput
          label="Unit Quantity"
          id="unitQuantity"
          type="text"
          value={values.unitQuantity}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.unitQuantity && touched.unitQuantity
              ? "text-input error"
              : "text-input"
          }
        />
        {errors.unitQuantity && touched.unitQuantity && (
          <div className="input-feedback">{errors.unitQuantity}</div>
        )}
      </div>

      <div className="col">
        <CustomSelect
          options={unitOption}
          placeholder="Unit"
          id="unit"
          name="unit"
          isClearable
          // value={props.values.categoryId}
          onChange={(selectedOption) => {
            selectedOption
              ? setFieldValue("unit", selectedOption.value)
              : setFieldValue("unit", "");
          }}
          onBlur={() => {
            setFieldTouched("unit");
          }}
        />
        {errors.unit}
      </div>

      <div className="col">
        <TextInput
          label="Price (Rs)"
          id="price"
          type="number"
          value={values.price}
          onChange={handleChange}
          onBlur={handleBlur}
          className={
            errors.price && touched.price ? "text-input error" : "text-input"
          }
        />
        {errors.price && touched.price && (
          <div className="input-feedback">{errors.price}</div>
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
          className={
            errors.discount && touched.discount
              ? "text-input error"
              : "text-input"
          }
        />
        {errors.discount && touched.discount && (
          <div className="input-feedback">{errors.discount}</div>
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
          className={
            errors.priceAfterDiscount && touched.priceAfterDiscount
              ? "text-input error"
              : "text-input"
          }
        />
        {errors.priceAfterDiscount && touched.priceAfterDiscount && (
          <div className="input-feedback">{errors.priceAfterDiscount}</div>
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
          className={
            errors.retailProfit && touched.retailProfit
              ? "text-input error"
              : "text-input"
          }
        />
        {errors.retailProfit && touched.retailProfit && (
          <div className="input-feedback">{errors.retailProfit}</div>
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
          className={
            errors.actualPrice && touched.actualPrice
              ? "text-input error"
              : "text-input"
          }
        />
        {errors.actualPrice && touched.actualPrice && (
          <div className="input-feedback">{errors.actualPrice}</div>
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
          className={
            errors.gst && touched.gst ? "text-input error" : "text-input"
          }
        />
        {errors.gst && touched.gst && (
          <div className="input-feedback">{errors.gst}</div>
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
          className={
            errors.franchiseCommision && touched.franchiseCommision
              ? "text-input error"
              : "text-input"
          }
        />
        {errors.franchiseCommision && touched.franchiseCommision && (
          <div className="input-feedback">{errors.franchiseCommision}</div>
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
          className={
            errors.bv && touched.bv ? "text-input error" : "text-input"
          }
        />
        {errors.bv && touched.bv && (
          <div className="input-feedback">{errors.bv}</div>
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
          className={
            errors.vdbc && touched.vdbc ? "text-input error" : "text-input"
          }
        />
        {errors.vdbc && touched.vdbc && (
          <div className="input-feedback">{errors.vdbc}</div>
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
          className={
            errors.vdbd && touched.vdbd ? "text-input error" : "text-input"
          }
        />
        {errors.vdbd && touched.vdbd && (
          <div className="input-feedback">{errors.vdbd}</div>
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
          className={
            errors.vdba && touched.vdba ? "text-input error" : "text-input"
          }
        />
        {errors.vdba && touched.vdba && (
          <div className="input-feedback">{errors.vdba}</div>
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
          className={
            errors.freeCode && touched.freeCode
              ? "text-input error"
              : "text-input"
          }
        />
        {errors.freeCode && touched.freeCode && (
          <div className="input-feedback">{errors.freeCode}</div>
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
          className={
            errors.freeCodeTo && touched.freeCodeTo
              ? "text-input error"
              : "text-input"
          }
        />
        {errors.freeCodeTo && touched.freeCodeTo && (
          <div className="input-feedback">{errors.freeCodeTo}</div>
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
          className={
            errors.freeCodeFrom && touched.freeCodeFrom
              ? "text-input error"
              : "text-input"
          }
        />
        {errors.freeCodeFrom && touched.freeCodeFrom && (
          <div className="input-feedback">{errors.freeCodeFrom}</div>
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
          className={
            errors.quantity && touched.quantity
              ? "text-input error"
              : "text-input"
          }
        />
        {errors.quantity && touched.quantity && (
          <div className="input-feedback">{errors.quantity}</div>
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
          className={
            errors.maxPurchase && touched.maxPurchase
              ? "text-input error"
              : "text-input"
          }
        />
        {errors.maxPurchase && touched.maxPurchase && (
          <div className="input-feedback">{errors.maxPurchase}</div>
        )}
      </div>
    </div>
  );
};

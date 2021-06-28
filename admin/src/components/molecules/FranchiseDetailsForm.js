import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../atoms/TextInput";
import {
  Paper,
  withStyles,
  Button,
  styled,
  FormControlLabel,
} from "@material-ui/core";
import { device } from "../../utils/mediaQueries/device";
import ProductList from "../organisms/ProductList";
import Select from "react-select";
import { apiHandler } from "../../utils/apiConfig";
import Checkbox from "@material-ui/core/Checkbox";

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

  addButton: {
    float: "right",
    marginLeft: "1rem",
    background: "white !important",
    color: "red !important",
    border: "red !important",
  },

  removeButton: {
    float: "right",
    marginLeft: "1rem",
    background: "red !important",
    color: "white !important",
    border: "white !important",
  },

  select: {
    marginTop: "1rem",
  },

  checkboxLabel: {
    marginTop: "1rem",
  },
  editCancel: {
    float: "left",
    background: "red !important",
    color: "white !important",
    marginTop: "-4px",
  }
};

const AddButton = styled(Button)(styles.addButton);
const RemoveButton = styled(Button)(styles.removeButton);
const EditCancel = styled(Button)(styles.editCancel);
const StyledSelect = styled(Select)(styles.select);
const StyledFormControlLabel = styled(FormControlLabel)(styles.checkboxLabel);

class FranchiseDetailsForm extends React.Component {
  state = {
    rows: [{ 1: [] }],
    selectedMainCategory: {},
    franchiseSelectOptions: [],
    selectedFranchiseOption: [],
    cityOptions: [],
    selectedCity: [],
    selectedSampleFranchiseOption: [],
    addedSample: false,
    isSample: false,
    editSampleFranchise: false,
    allSubCategoryOptions: [],
    franchiseRows: [],
    franchiseProducts: [],
  };

  addRow = () => {
    let rows = this.state.rows;
    let maxIndex = 0;
    rows.forEach((elm) => {
      let key = parseInt(Object.keys(elm)[0]);
      if (key > maxIndex) maxIndex = key;
    });
    rows.unshift({ [maxIndex + 1]: [] });
    this.setState({
      rows,
    });
  };

  removeRow = () => {
    let rows = this.state.rows;
    rows.shift();
    this.setState({
      rows,
    });
  };

  updateProductsToRows = (key, list) => {
    let rows = this.state.rows;
    rows &&
      rows.forEach((elm) => {
        if (elm[key]) elm[key] = list;
      });
    this.setState({
      rows,
    });
  };

  handleChangeState = (type, value) => {
    this.setState({
      [type]: value,
    });
  };

  handleCreateFranchise = (formValue) => {
    let { adp_id, createFranchise, productListData } = this.props;
    let {
      franchiseName,
      franchiseAddress,
      franchisePhone,
      franchiseSample,
    } = formValue;
    let {
      selectedCity,
      selectedMainCategory,
      rows,
      selectedFranchiseOption,
      editSampleFranchise,
      selectedSampleFranchiseOption
    } = this.state;
    let productList = [];

    rows &&
      rows.forEach((elm) => {
        let productRowKeys = Object.keys(elm);
        let key = parseInt(productRowKeys);
        productList = productList.concat(elm[key]);
      });

    const body = {
      franchiseName,
      franchiseAddress,
      franchisePhone,
      adp_id,
      city: selectedCity.value,
      category: selectedMainCategory.value,
      productList,
      isSample: franchiseSample,
    
    };

    if (selectedFranchiseOption.id) {
      body.franchise_id = selectedFranchiseOption.id;
    }
    if (editSampleFranchise) {
      body.editFranchise = true;
      body.franchise_id = selectedSampleFranchiseOption.value;
    }
    createFranchise(body);
  };

  componentDidMount = () => {
    let { adp_id } = this.props;
    getFranchiseByAdpId(adp_id).then((response) => {
      this.setState({
        franchiseSelectOptions: getSelectOptions(response.data.results),
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

    getSampleFranchise().then((response) => {
      let sampleFranchiseOptions = [];
      response.data.results &&
        response.data.results.forEach((elm) => {
          let obj = {
            value: elm.id,
            label: elm.franchise_name,
          };
          sampleFranchiseOptions.push(obj);
        });
      this.setState({
        sampleFranchiseOptions,
      });
    });

    this.getAllSubCategoryApi();
  };

  selectCityById = (cityId) => {
    let { cityOptions } = this.state;
    let selectedCity = [];
    cityOptions &&
      cityOptions.forEach((elm) => {
        if (elm.value == cityId) {
          selectedCity = elm;
        }
      });

    this.setState({
      selectedCity,
    });
  };

  handleSelectSampleFranchise = (value) => {
    getProductsByFranchise(value).then((response) => {
      let products = response.data.results;
      let categoryIds = getDistinctCategoryId(products);
      let allSubCategoryOptions = this.state.allSubCategoryOptions;
      let franchiseRows = this.state.franchiseRows;
      let franchiseProducts =  this.state.franchiseProducts;
      let productRows = [];

      categoryIds &&
        categoryIds.forEach((elm, i) => {
          let rowKey = 0;
          if (franchiseRows.length == 0) {
            rowKey = franchiseRows.length + categoryIds.length - i;
          } else {
            rowKey = franchiseRows.length + (i + 1);
          }
          
          
          let row = { [rowKey]: [] };
          
          products &&
            products.forEach((product) => {
              if (product.category_id === elm) {
                if (franchiseProducts.length > 0) {
                  let isDuplicate = false;
                  franchiseProducts.forEach((existingProduct) => {
                    if (existingProduct.product == product.product) {
                      isDuplicate = true
                    }
                  })

                  if (!isDuplicate) {
                    row[rowKey].push(product);
                  }
                } else {
                  row[rowKey].push(product);

                }
                
              }
            });
            if (row[rowKey].length > 0) {
              productRows.push(row);
            } else {
              rowKey = rowKey - 1
            }
          
        });

        productRows = productRows.concat(franchiseRows)

      this.setState(
        {
          rows: productRows,
          addedSample: true,
        },
        () => {
          this.setState({
            rows: productRows,
            addedSample: true,
          }, () => {
            this.setState({
              rows: productRows,
              addedSample: true,
            });
          });
        }
      );
    });
  };

  handleSelectFranchise = (value) => {
    getProductsByFranchise(value).then((response) => {
      let products = response.data.results;
      let categoryIds = getDistinctCategoryId(products);
      let allSubCategoryOptions = this.state.allSubCategoryOptions;
      let productRows = [];

      categoryIds &&
        categoryIds.forEach((elm, i) => {
          let rowKey = categoryIds.length - i;
          let row = { [rowKey]: [] };
          
          products &&
            products.forEach((product) => {
              if (product.category_id === elm) {
                row[rowKey].push(product);
              }
            });
          productRows.push(row);
        });
      this.setState(
        {
          rows: productRows,
          addedSample: true,
          franchiseRows: productRows,
          franchiseProducts: products,
        },
        () => {
          this.setState({
            rows: productRows,
            addedSample: true,
            franchiseRows: productRows,
            franchiseProducts: products,
          });
        }
      );
    });
  };

  unsetAddedSample = () => {
    this.setState({
      addedSample: false,
    });
  };

  handleEditSample = (value) => {
    this.setState({
      isSample: value,
      editSampleFranchise: value,
      franchiseName: value ? this.state.selectedSampleFranchiseOption.label : ""
    })
  }

  getAllSubCategoryApi = () => {

    getAllSubCategory().then((response) => {
      let allSubCategoryOptions = [];

      response.data.results &&
        response.data.results.forEach((elm) => {
          let obj = {
            value: elm.id,
            label: elm.sub_category,
          };
          allSubCategoryOptions.push(obj);
        });
      this.setState({
        allSubCategoryOptions,
      });
    });
  }

  render() {
    const {
      classes,
      className,
      user_type,
      createFranchise,
      firstname,
    } = this.props;

    const {
      rows,
      selectedCity,
      selectedMainCategory,
      franchiseSelectOptions,
      selectedFranchiseOption,
      cityOptions,
      sampleFranchiseOptions,
      selectedSampleFranchiseOption,
      addedSample,
      isSample,
      editSampleFranchise
    } = this.state;
    return (
      <Paper className={classes.paper}>
        <Formik
          enableReinitialize
          initialValues={{
            franchiseName: "",
            franchiseAddress: "",
            franchisePhone: "",
            franchiseSample: false,
          }}
          onSubmit={async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            this.handleCreateFranchise(values);
            //   handleProductAdd({ product: values });
          }}
          validationSchema={Yup.object().shape({
            franchiseName: Yup.string().required("Required"),
            franchiseAddress: isSample || editSampleFranchise
              ? Yup.string()
              : Yup.string().required("Required"),
            franchisePhone: isSample || editSampleFranchise
              ? Yup.string()
              : Yup.string().test(
                  "len",
                  "Must be exactly 10 digit",
                  (val) => val.length === 10
                ),
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
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
                  {
                    !editSampleFranchise && <div className="col">
                    <StyledFormControlLabel
                      control={
                        <Checkbox
                          checked={values.franchiseSample}
                          onChange={(e) => {
                            setFieldValue("franchiseSample", e.target.checked);
                            this.handleChangeState(
                              "isSample",
                              e.target.checked
                            );
                            if (e.target.checked) {
                              setFieldValue("franchiseAddress", "");
                              setFieldValue("franchisePhone", "");
                              this.handleChangeState(
                                "selectedFranchiseOption",
                                []
                              );
                            }
                          }}
                          name="franchiseSample"
                          color="red"
                        />
                      }
                      label="Is Sample"
                    />
                  </div>
                  }
                  

                  {!isSample &&
                    franchiseSelectOptions &&
                    franchiseSelectOptions.length > 0 && (
                      <div className="col">
                        <StyledSelect
                          // className={clsx(classes.formInput, className)}
                          options={franchiseSelectOptions}
                          value={selectedFranchiseOption}
                          isClearable
                          onChange={(value) => {
                            this.handleChangeState(
                              "selectedFranchiseOption",
                              value
                            );
                            if (value) {
                              setFieldValue(
                                "franchiseName",
                                value.franchise_name
                              );
                              setFieldValue(
                                "franchiseAddress",
                                value.franchise_address
                              );
                              setFieldValue(
                                "franchisePhone",
                                value.franchise_number
                              );
                              this.selectCityById(value.franchise_city);
                              this.handleSelectFranchise(value.value);
                              this.handleChangeState(
                                "selectedSampleFranchiseOption",
                                []
                              );
                            } else {
                              setFieldValue("franchiseName", "");
                              setFieldValue("franchiseAddress", "");
                              setFieldValue("franchisePhone", "");
                              this.selectCityById("");
                              this.handleChangeState(
                                "franchiseRows",
                                []
                              );
                            }
                          }}
                        />
                      </div>
                    )}
                  {
                    !editSampleFranchise && <div className="col">
                    <TextInput
                      label="Franchise Name"
                      id="franchiseName"
                      type="text"
                      value={values.franchiseName}
                      onChange={(e) => {
                        handleChange(e);
                        this.unsetAddedSample();
                      }}
                      onBlur={handleBlur}
                      className={
                        errors.franchiseName && touched.franchiseName
                          ? "text-input error"
                          : "text-input"
                      }
                      disabled={
                        selectedFranchiseOption && selectedFranchiseOption.label
                          ? true
                          : false
                      }
                    />
                    {errors.franchiseName && touched.franchiseName && (
                      <div className="input-feedback">
                        {errors.franchiseName}
                      </div>
                    )}
                  </div>
                  }
                  

                  {!isSample && (
                    <>
                      <div className="col">
                        <TextInput
                          label="Franchise Address"
                          id="franchiseAddress"
                          type="text"
                          value={values.franchiseAddress}
                          onChange={(e) => {
                            handleChange(e);
                            this.unsetAddedSample();
                          }}
                          onBlur={handleBlur}
                          className={
                            errors.franchiseAddress && touched.franchiseAddress
                              ? "text-input error"
                              : "text-input"
                          }
                          disabled={
                            selectedFranchiseOption &&
                            selectedFranchiseOption.label
                              ? true
                              : false
                          }
                        />
                        {errors.franchiseAddress &&
                          touched.franchiseAddress && (
                            <div className="input-feedback">
                              {errors.franchiseAddress}
                            </div>
                          )}
                      </div>
                      <div className="col">
                        <TextInput
                          label="Franchise Phone"
                          id="franchisePhone"
                          type="number"
                          value={values.franchisePhone}
                          onChange={(e) => {
                            handleChange(e);
                            this.unsetAddedSample();
                          }}
                          onBlur={handleBlur}
                          className={
                            errors.franchisePhone && touched.franchisePhone
                              ? "text-input error"
                              : "text-input"
                          }
                          disabled={
                            selectedFranchiseOption &&
                            selectedFranchiseOption.label
                              ? true
                              : false
                          }
                        />
                        {errors.franchisePhone && touched.franchisePhone && (
                          <div className="input-feedback">
                            {errors.franchisePhone}
                          </div>
                        )}
                      </div>
                      <div className="col">
                        <StyledSelect
                          options={cityOptions}
                          // isMulti
                          isDisabled={
                            selectedFranchiseOption &&
                            selectedFranchiseOption.label
                              ? true
                              : false
                          }
                          placeholder="City"
                          value={selectedCity}
                          onChange={(value) => {
                            this.handleChangeState("selectedCity", value);
                          }}
                        />
                      </div>
                    </>
                  )}

                  <div className="col">
                    <StyledSelect
                      options={sampleFranchiseOptions}
                      // isMulti
                      isDisabled={editSampleFranchise ? true : (values.franchiseSample ? true : false)}
                      placeholder="Sample Franchise"
                      value={selectedSampleFranchiseOption}
                      onChange={(value) => {
                        this.handleChangeState(
                          "selectedSampleFranchiseOption",
                          value
                        );
                        this.handleSelectSampleFranchise(value.value);
                        this.handleSelectSampleFranchise(value.value);
                      }}
                    />
                    
                    
                    
                  </div>
                  
                  <div className="col">
                  <br></br>
                    {selectedSampleFranchiseOption.value && !editSampleFranchise &&
                      <EditCancel color="primary" onClick={() => { setFieldValue("franchiseName", selectedSampleFranchiseOption.label); this.handleEditSample(true)}}>Edit Sample</EditCancel>
                    }
                    {
                      editSampleFranchise && <EditCancel color="primary" onClick={() => {setFieldValue("franchiseName", "");
                      setFieldValue("franchiseAddress", "");
                      setFieldValue("franchisePhone", "");
                      this.selectCityById("");
                      this.handleChangeState(
                        "franchiseRows",
                        []
                      ); 
                      this.handleChangeState(
                        "selectedFranchiseOption",
                        []
                      ); 
                      this.handleChangeState(
                        "franchiseProducts",
                        []
                      ); 
                      this.handleEditSample(false)}}>Cancel Edit </EditCancel>
                    }
                    </div>
                </div>
                <div className="">
                  <br></br>
                  <AddButton
                    onClick={this.addRow}
                    style={{ float: "right" }}
                    variant="contained"
                    color="primary"
                  >
                    +
                  </AddButton>

                  <RemoveButton
                    onClick={this.removeRow}
                    style={{ float: "right" }}
                    variant="contained"
                    color="primary"
                  >
                    -
                  </RemoveButton>
                </div>
                <br></br>
                {firstname &&
                  rows &&
                  rows.map((elm, i) => {
                    return (
                      <ProductList
                        {...values}
                        createFranchise={createFranchise}
                        key={parseInt(Object.keys(elm)[0])}
                        productListData={elm}
                        updateProductsToRows={this.updateProductsToRows}
                        rowKey={parseInt(Object.keys(elm)[0])}
                        selectedCity={selectedCity}
                        handleChangeState={this.handleChangeState}
                        selectedMainCategory={selectedMainCategory}
                        removeRow={this.removeRow}
                        addedSample={addedSample}
                        franchiseRows={this.state.franchiseRows}
                        franchiseProducts={this.state.franchiseProducts}
                      />
                    );
                  })}
                <br></br>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={
                    editSampleFranchise ? false : 
                    isSample
                      ? values.franchiseName !== "" &&
                        rows &&
                        rows[0] &&
                        rows[0][rows.length] &&
                        rows[0][rows.length].length > 0
                        ? false
                        : true
                      : values.franchiseName !== "" &&
                        values.franchiseAddress !== "" &&
                        selectedCity.value !== undefined &&
                        values.franchisePhone !== "" &&
                        values.franchisePhone.toString() !== "" &&
                        values.franchisePhone.toString().length === 10 &&
                        rows &&
                        rows[0] &&
                        rows[0][rows.length] &&
                        rows[0][rows.length].length > 0
                      ? false
                      : true
                  }
                >
                  {
                    (selectedFranchiseOption &&  selectedFranchiseOption.id ) || editSampleFranchise ? "Update Franchise" : "Add Franchise"
                    
                  }
                  
                </Button>
              </form>
            );
          }}
        </Formik>
      </Paper>
    );
  }
}

export default withStyles(styles)(FranchiseDetailsForm);

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

function getFranchiseByAdpId(adp_id) {
  return apiHandler.get(`/get-franchise`, {
    params: {
      adp_id,
    },
  });
}

const getSelectOptions = (dataArr) => {
  let selectOptions = [];

  dataArr &&
    dataArr.forEach((elm) => {
      let obj = elm;
      obj.label = `${elm.franchise_name} - ${elm.franchise_address} - ${elm.franchise_number}`;
      obj.value = elm.id;
      selectOptions.push(obj);
    });

  return selectOptions;
};

function getCity() {
  return apiHandler.get(`/list-city`);
}

function getSampleFranchise() {
  return apiHandler.get(`/sample-franchise`);
}

function getProductsByFranchise(franchise_id) {
  return apiHandler.get(`/get-products-by-franchise`, {
    params: {
      franchise_id,
    },
  });
}

function getAllSubCategory() {
  return apiHandler.get(`/list-sub-category`);
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

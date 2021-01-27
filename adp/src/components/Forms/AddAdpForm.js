import React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import TextInput from "components/Input/TextInput";
import * as Yup from "yup";

import SelectInput from "components/Input/SelectInput";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateAdpData } from "../../redux/actions/addAdp";
import { withRouter } from "react-router-dom";
import { apiHandler } from "config/apiConfig";

var ifsc = require("ifsc");

const styles = {
  wrapper: {
    padding: "1rem",
  },
};

const Wrapper = styled("div")(styles.wrapper);

const genderOption = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Others",
    label: "Others",
  },
];
class AddAdpForm extends React.Component {
  state = {};

  render() {
    let { updateAdpData, toggleBuyProducts } = this.props;
    let adpData = {
      firstname: "",
      lastname: "",
      sponsor_id: "",
      sponsor_name: "",
      co_sponsor_id: "",
      co_sponsor_name: "",
      dob: "",
      gender: "",
      father_firstname: "",
      father_lastname: "",
      nominee_firstname: "",
      nominee_lastname: "",
      nominee_gender: "",
      nominee_dob: "",
      relation: "",
      pan: "",
      email: "",
      mobile: "",
      address_correspondence: "",
      landmark: "",
      district: "",
      state: "",
      postal_code: null,
      id_proof: "",
      proof_address: "",
      bank_name: "",
      account_no: "",
      branch: "",
      ifs_code: "",
      account_type: "",
    };
    return (
      <Wrapper>
        <Formik
          initialValues={adpData}
          validationSchema={Yup.object().shape({
            firstname: Yup.string().required("Required"),
            sponsor_id: Yup.number()
              .positive("please enter number greater than 0")
              .required("Required"),
            co_sponsor_id: Yup.number()
              .positive("please enter number greater than 0")
              .required("Required"),
            mobile: Yup.number()
              .required("Required")
              .test(
                "len",
                "Must be exactly 10 digits",
                (val) => val && val.toString().length === 10
              ),
            email: Yup.string().email("Invalid email address"),
            dob: Yup.date().nullable(),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              //   alert(JSON.stringify(values, null, 2));
              //   console.log(values);
              setSubmitting(false);
              //   this.props.history.push("/buy-product");
              updateAdpData(values);
              toggleBuyProducts();
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            getFieldProps,
            setFieldValue,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit} className="form-group">
              <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                <div class="col">
                  <TextInput
                    label="Sponsor ID"
                    id="sponsor_id"
                    type="number"
                    value={values.sponsor_id}
                    onChange={handleChange}
                    onBlur={(e) => {
                      // handleBlur(e); this.blurHandle(e);
                      getAdpName(e.target.value)
                        .catch((err) => {
                          if (err.response.status === 404) {
                            alert("Please check Sponsor ID");
                            setFieldValue("sponsor_id", "");
                          }
                        })
                        .then((response) => {
                          response &&
                            response.data &&
                            setFieldValue("sponsor_name", response.data.result);
                        });
                    }}
                    className={
                      errors.sponsor_id && touched.sponsor_id
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.sponsor_id && touched.sponsor_id && (
                            <div className="input-feedback">{errors.sponsor_id}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="Sponsor Name"
                    id="sponsor_name"
                    type="text"
                    value={values.sponsor_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled
                    className={
                      errors.sponsor_name && touched.sponsor_name
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.sponsor_name && touched.sponsor_name && (
                            <div className="input-feedback">{errors.sponsor_name}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="Cosponsor ID"
                    id="co_sponsor_id"
                    type="number"
                    value={values.co_sponsor_id}
                    onChange={handleChange}
                    onBlur={(e) => {
                      // handleBlur(e); this.blurHandle(e);
                      getAdpName(e.target.value)
                        .catch((err) => {
                          if (err.response.status === 404) {
                            alert("Please check Co Sponsor ID");
                            setFieldValue("co_sponsor_id", "");
                          }
                        })
                        .then((response) => {
                          response &&
                            response.data &&
                            setFieldValue(
                              "co_sponsor_name",
                              response.data.result
                            );
                        });
                    }}
                    className={
                      errors.co_sponsor_id && touched.co_sponsor_id
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.co_sponsor_id && touched.co_sponsor_id && (
                            <div className="input-feedback">{errors.co_sponsor_id}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="Co Sponsor Name"
                    id="co_sponsor_name"
                    type="text"
                    value={values.co_sponsor_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled
                    className={
                      errors.co_sponsor_name && touched.co_sponsor_name
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.co_sponsor_name && touched.co_sponsor_name && (
                            <div className="input-feedback">{errors.co_sponsor_name}</div>
                        )} */}
                </div>
                <div class="col">
                  <TextInput
                    label="First Name"
                    id="firstname"
                    type="text"
                    value={values.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.firstname && touched.firstname
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.firstname && touched.firstname && (
                            <div className="input-feedback">{errors.firstname}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="Last Name"
                    id="lastname"
                    type="text"
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.lastname && touched.lastname
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.lastname && touched.lastname && (
                            <div className="input-feedback">{errors.lastname}</div>
                        )} */}
                </div>

                <div class="col">
                  {/* <KeyboardDatePicker
                            id="dob"
                            clearable
                            variant="dialog"
                            format="MM/dd/yyyy"
                            
                            placeholder="DOB"
                            value={values.dob}
                            onChange={value => setFieldValue("dob", value)}
                            helperText={"MM/dd/yyyy"}
                            disableFuture
                            onBlur={handleBlur}
                            className={
                            errors.dob && touched.dob
                                ? "text-input error"
                                : "text-input"
                            }
                            KeyboardButtonProps={{
                            "aria-label": "change date"
                            }}
                        /> */}
                  <TextInput
                    label="DOB"
                    id="dob"
                    type="date"
                    value={values.dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.dob && touched.dob
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.dob && touched.dob && (
                            <div className="input-feedback">{errors.dob}</div>
                        )} */}
                </div>

                <div class="col">
                  <SelectInput
                    label="Gender"
                    id="gender"
                    value={values.gender}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    {...getFieldProps("gender")}
                    className={
                      errors.gender && touched.gender
                        ? "text-input error"
                        : "text-input"
                    }
                    options={genderOption}
                    showLabel
                  />

                  {/* {errors.gender && touched.gender && (
                            <div className="input-feedback">{errors.gender}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="Father First Name"
                    id="father_firstname"
                    type="text"
                    value={values.father_firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.father_firstname && touched.father_firstname
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.father_firstname && touched.father_firstname && (
                            <div className="input-feedback">{errors.father_firstname}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="Father Last Name"
                    id="father_lastname"
                    type="text"
                    value={values.father_lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.father_lastname && touched.father_lastname
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.father_lastname && touched.father_lastname && (
                            <div className="input-feedback">{errors.father_lastname}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="Nominee First Name"
                    id="nominee_firstname"
                    type="text"
                    value={values.nominee_firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.nominee_firstname && touched.nominee_firstname
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.nominee_firstname && touched.nominee_firstname && (
                            <div className="input-feedback">{errors.nominee_firstname}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="Nominee Last Name"
                    id="nominee_lastname"
                    type="text"
                    value={values.nominee_lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.nominee_lastname && touched.nominee_lastname
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.nominee_lastname && touched.nominee_lastname && (
                            <div className="input-feedback">{errors.nominee_lastname}</div>
                        )} */}
                </div>

                <div class="col">
                  <SelectInput
                    label="Nominee Gender"
                    id="nominee_gender"
                    value={values.nominee_gender}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    {...getFieldProps("nominee_gender")}
                    className={
                      errors.nominee_gender && touched.nominee_gender
                        ? "text-input error"
                        : "text-input"
                    }
                    options={genderOption}
                    showLabel
                  />
                  {/* {errors.nominee_gender && touched.nominee_gender && (
                            <div className="input-feedback">{errors.nominee_gender}</div>
                        )} */}
                </div>

                <div class="col">
                  {/* <KeyboardDatePicker
                            id="nominee_dob"
                            clearable
                            variant="dialog"
                            format="MM/dd/yyyy"
                            placeholder="Nominee DOB"
                            value={values.nominee_dob}
                            helperText={"MM/dd/yyyy"}
                            onChange={value => setFieldValue("nominee_dob", value)}
                            disableFuture
                            onBlur={handleBlur}
                            className={
                            errors.nominee_dob && touched.nominee_dob
                                ? "text-input error"
                                : "text-input"
                            }
                            KeyboardButtonProps={{
                            "aria-label": "change date"
                            }}
                        /> */}

                  <TextInput
                    label="Nominee DOB"
                    id="nominee_dob"
                    type="date"
                    value={values.nominee_dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.nominee_dob && touched.nominee_dob
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.nominee_dob && touched.nominee_dob && (
                            <div className="input-feedback">{errors.nominee_dob}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="Nominee Relation"
                    id="relation"
                    type="text"
                    value={values.relation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.relation && touched.relation
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.relation && touched.relation && (
                            <div className="input-feedback">{errors.relation}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="PAN"
                    id="pan"
                    type="text"
                    value={values.pan}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.pan && touched.pan
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.pan && touched.pan && (
                            <div className="input-feedback">{errors.pan}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="Email"
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="Mobile"
                    id="mobile"
                    type="number"
                    value={values.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.mobile && touched.mobile
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.mobile && touched.mobile && (
                            <div className="input-feedback">{errors.mobile}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="Address"
                    id="address_correspondence"
                    type="text"
                    value={values.address_correspondence}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.address_correspondence &&
                      touched.address_correspondence
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.address_correspondence && touched.address_correspondence && (
                            <div className="input-feedback">{errors.address_correspondence}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="Landmark"
                    id="landmark"
                    type="text"
                    value={values.landmark}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.landmark && touched.landmark
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.landmark && touched.landmark && (
                            <div className="input-feedback">{errors.landmark}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="City"
                    id="district"
                    type="text"
                    value={values.district}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.district && touched.district
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.district && touched.district && (
                            <div className="input-feedback">{errors.district}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="State"
                    id="state"
                    type="text"
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.state && touched.state
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.state && touched.state && (
                            <div className="input-feedback">{errors.state}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="Postal Code"
                    id="postal_code"
                    type="number"
                    value={values.postal_code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.postal_code && touched.postal_code
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.postal_code && touched.postal_code && (
                            <div className="input-feedback">{errors.postal_code}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="ID Proof"
                    id="id_proof"
                    type="text"
                    value={values.id_proof}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.id_proof && touched.id_proof
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.id_proof && touched.id_proof && (
                            <div className="input-feedback">{errors.id_proof}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="Proof Address"
                    id="proof_address"
                    type="text"
                    value={values.proof_address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.proof_address && touched.proof_address
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.proof_address && touched.proof_address && (
                            <div className="input-feedback">{errors.proof_address}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="Bank Name"
                    id="bank_name"
                    type="text"
                    value={values.bank_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.bank_name && touched.bank_name
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                    disabled
                  />
                  {/* {errors.bank_name && touched.bank_name && (
                            <div className="input-feedback">{errors.bank_name}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="Account Number"
                    id="account_no"
                    type="text"
                    value={values.account_no}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.account_no && touched.account_no
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.account_no && touched.account_no && (
                            <div className="input-feedback">{errors.account_no}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="Branch"
                    id="branch"
                    type="text"
                    value={values.branch}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.branch && touched.branch
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                    disabled
                  />
                  {/* {errors.branch && touched.branch && (
                            <div className="input-feedback">{errors.branch}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="IFSC"
                    id="ifs_code"
                    type="text"
                    value={values.ifs_code}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                    className={
                      errors.ifs_code && touched.ifs_code
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                    onBlur={(e) => {
                      // handleBlur(e); this.blurHandle(e);
                      let ifscCode = e.target.value;
                      ifsc.validate(ifscCode)
                        ? fetchIfscDetails(ifscCode).then((response) => {
                            let branch = `${response.BANKCODE} - ${response.BRANCH}`;

                            setFieldValue("bank_name", response.BANK);
                            setFieldValue("branch", branch);
                          })
                        : alert("Please Check IFSC");
                    }}
                  />
                  {/* {errors.ifs_code && touched.ifs_code && (
                            <div className="input-feedback">{errors.ifs_code}</div>
                        )} */}
                </div>

                <div class="col">
                  <TextInput
                    label="Account Type"
                    id="account_type"
                    type="text"
                    value={values.account_type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.account_type && touched.account_type
                        ? "text-input error"
                        : "text-input"
                    }
                    showLabel
                  />
                  {/* {errors.account_type && touched.account_type && (
                            <div className="input-feedback">{errors.account_type}</div>
                        )} */}
                </div>
              </div>

              <Button
                color="danger"
                type="submit"
                size="lg"
                className="pull-right"
                disabled={isSubmitting}
              >
                Next
              </Button>
            </form>
          )}
        </Formik>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adpData: state.createAdpReducer.adpData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAdpData: bindActionCreators(updateAdpData, dispatch),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(withRouter(AddAdpForm));

function getAdpName(adp_id) {
  return apiHandler.get("get-adp-name", { params: { adp_id } });
}

// function addAdp(body) {
//   return apiHandler.post("add-adp", body);
// }

function fetchIfscDetails(ifscCode) {
  return ifsc.fetchDetails(ifscCode);
}

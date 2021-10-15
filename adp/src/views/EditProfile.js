import React, { useState, useEffect } from "react";
import PanelHeader from "components/PanelHeader/PanelHeader";
import { apiHandler } from "config/apiConfig";
import { CardHeader, Card, Row, Col } from "reactstrap";
import { styled } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import Button from "reactstrap/lib/Button";
import TextInput from "components/Input/TextInput";
import SelectInput from "components/Input/SelectInput";
import { toast } from "react-toastify";
import { updateLoginSuccess } from "redux/actions/login";
import { useDispatch } from "react-redux";

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

const accountTypeOption = [
  {
    value: "Savings",
    label: "Savings",
  },
  {
    value: "Current",
    label: "Current",
  },
];

const idProofOption = [
  {
    value: "Aadhar card",
    label: "Aadhar card",
  },
  {
    value: "Pan card",
    label: "Pan card",
  },
  {
    value: "Voter card",
    label: "Voter card",
  },
  {
    value: "Driving license",
    label: "Driving license",
  },
  {
    value: "Passport",
    label: "Passport",
  },
];

const addressProofOption = [
  {
    value: "Aadhar card",
    label: "Aadhar card",
  },
  {
    value: "Voter card",
    label: "Voter card",
  },
  {
    value: "Driving license",
    label: "Driving license",
  },
  {
    value: "Passport",
    label: "Passport",
  },
];

const relationOption = [
  {
    value: "Spouse",
    label: "Spouse",
  },
  {
    value: "Father",
    label: "Father",
  },
  {
    value: "Mother",
    label: "Mother",
  },
  {
    value: "Brother",
    label: "Brother",
  },
  {
    value: "Sister",
    label: "Sister",
  },
  {
    value: "Son",
    label: "Son",
  },
  {
    value: "Daughter",
    label: "Daughter",
  },
];

const EditProfile = () => {
  const [adpData, setAdpData] = useState({});

  useEffect(() => {
    fetchAdpDetails();
  }, []);

  const dispatch = useDispatch();

  const fetchAdpDetails = async () => {
    try {
      const res = await apiHandler.get(`/get-adp-details`);
      setAdpData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateAdpDetails = async (details) => {
    try {
      const res = await apiHandler.post(`/update-adp`, details);
      toast("PROFILE UPDATED");
      dispatch(
        updateLoginSuccess({
          authenticated: true,
          name: `${details.firstname} ${details.lastname}`,
          adp_id: details.adp_id,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIfscDetails = (ifscCode) => {
    return ifsc.fetchDetails(ifscCode);
  };

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row style={{ height: "80vh" }}>
          <Col md="12">
            <Card style={{ minHeight: "80%", overflow: "hidden" }}>
              <CardHeader>
                <h5 className="title">EDIT PROFILE</h5>
              </CardHeader>
              <hr />
              <Wrapper>
                {adpData.adp_id && (
                  <Formik
                    initialValues={adpData}
                    validationSchema={Yup.object().shape({
                      firstname: Yup.string().required("Required"),
                      mobile: Yup.number()
                        .required("Required")
                        .test(
                          "len",
                          "Must be exactly 10 digits",
                          (val) => val && val.toString().length === 10
                        ),
                      email: Yup.string()
                        .required()
                        .email("Invalid email address"),
                      dob: Yup.date().nullable(),
                    })}
                    onSubmit={async (values) => updateAdpDetails(values)}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      setFieldValue,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <form onSubmit={handleSubmit} className="form-group">
                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
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
                          </div>
                          <div class="col">
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
                          </div>
                          <div class="col">
                            <SelectInput
                              defaultValue={genderOption.find(
                                (option) =>
                                  values.gender.toUpperCase() ===
                                  option.value.toUpperCase()
                              )}
                              onChange={({ value }) => {
                                setFieldValue("gender", value);
                              }}
                              label="Gender"
                              id="gender"
                              options={genderOption}
                              showLabel
                            />
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
                                errors.father_firstname &&
                                touched.father_firstname
                                  ? "text-input error"
                                  : "text-input"
                              }
                              showLabel
                            />
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
                                errors.father_lastname &&
                                touched.father_lastname
                                  ? "text-input error"
                                  : "text-input"
                              }
                              showLabel
                            />
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
                                errors.nominee_firstname &&
                                touched.nominee_firstname
                                  ? "text-input error"
                                  : "text-input"
                              }
                              showLabel
                            />
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
                                errors.nominee_lastname &&
                                touched.nominee_lastname
                                  ? "text-input error"
                                  : "text-input"
                              }
                              showLabel
                            />
                          </div>
                          <div class="col">
                            <SelectInput
                              defaultValue={genderOption.find(
                                (option) =>
                                  values.nominee_gender.toUpperCase() ===
                                  option.value.toUpperCase()
                              )}
                              onChange={({ value }) => {
                                setFieldValue("nominee_gender", value);
                              }}
                              label="Nominee Gender"
                              id="nominee_gender"
                              options={genderOption}
                              showLabel
                            />
                          </div>
                          <div class="col">
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
                          </div>
                          <div class="col">
                            <SelectInput
                              defaultValue={relationOption.find(
                                (option) =>
                                  values.relation.toUpperCase() ===
                                  option.value.toUpperCase()
                              )}
                              onChange={({ value }) => {
                                setFieldValue("relation", value);
                              }}
                              label="Nominee Relation"
                              id="relation"
                              options={relationOption}
                              showLabel
                            />
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
                          </div>

                          <div class="col">
                            <SelectInput
                              onChange={({ value }) => {
                                setFieldValue("id_proof", value);
                              }}
                              defaultValue={idProofOption.find(
                                (option) =>
                                  values.id_proof.toUpperCase() ===
                                  option.value.toUpperCase()
                              )}
                              label="ID Proof"
                              id="id_proof"
                              options={idProofOption}
                              showLabel
                            />
                          </div>
                          <div class="col">
                            <SelectInput
                              defaultValue={addressProofOption.find(
                                (option) =>
                                  values.proof_address.toUpperCase() ===
                                  option.value.toUpperCase()
                              )}
                              onChange={({ value }) => {
                                setFieldValue("proof_address", value);
                              }}
                              label="Proof Address"
                              id="proof_address"
                              options={addressProofOption}
                              showLabel
                            />
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
                          </div>
                          <div class="col">
                            <TextInput
                              label="IFSC"
                              id="ifs_code"
                              type="text"
                              value={values.ifs_code}
                              onChange={handleChange}
                              className={
                                errors.ifs_code && touched.ifs_code
                                  ? "text-input error"
                                  : "text-input"
                              }
                              showLabel
                              onBlur={(e) => {
                                let ifscCode = e.target.value;
                                ifsc.validate(ifscCode)
                                  ? fetchIfscDetails(ifscCode).then(
                                      (response) => {
                                        let branch = `${response.BANKCODE} - ${response.BRANCH}`;

                                        setFieldValue(
                                          "bank_name",
                                          response.BANK
                                        );
                                        setFieldValue("branch", branch);
                                      }
                                    )
                                  : setFieldValue("ifs_code", "");
                              }}
                            />
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
                          </div>
                          <div class="col">
                            <SelectInput
                              defaultValue={accountTypeOption.find(
                                (option) =>
                                  values.account_type.toUpperCase() ===
                                  option.value.toUpperCase()
                              )}
                              onChange={({ value }) => {
                                setFieldValue("account_type", value);
                              }}
                              label="Account Type"
                              id="account_type"
                              options={accountTypeOption}
                              showLabel
                            />
                          </div>
                        </div>
                        <Button
                          color="danger"
                          type="submit"
                          size="lg"
                          className="pull-right"
                          disabled={isSubmitting}
                        >
                          Save
                        </Button>
                      </form>
                    )}
                  </Formik>
                )}
              </Wrapper>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default EditProfile;

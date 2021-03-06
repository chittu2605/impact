import React from "react";
import { Formik } from "formik";
import { Slate } from "../atoms/Slate";
import TextInput from "../atoms/TextInput";
import { withRouter } from "react-router-dom";
import { Button, InputLabel, Select, MenuItem, FormControl } from "@material-ui/core";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
  } from "@material-ui/pickers";
  import DateFnsUtils from "@date-io/date-fns";
import * as Yup from "yup";
import { apiHandler } from "../../utils/apiConfig";

var ifsc = require('ifsc');
class AddAdp extends React.Component {
    state={
        showBuyProduct: false
    }
     blurHandle = (e) => {
        
    }
  render() {
     
    return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Slate>
        <Formik
          initialValues={{ 
            firstname:"",
            lastname: "",
            sponsor_id: "",
            sponsor_name:"",
            co_sponsor_id:"",
            co_sponsor_name:"",
            dob:"",
            gender:"",
            father_firstname:"",
            father_lastname:"",
            nominee_firstname:"",
            nominee_lastname:"",
            nominee_gender:"",
            nominee_dob:"",
            relation:"",
            pan:"",
            email:"",
            mobile:"",
            address_correspondence:"",
            landmark:"",
            district:"",
            state:"",
            postal_code:null,
            id_proof:"",
            proof_address:"",
            bank_name:"",
            account_no:"",
            branch:"",
            ifs_code:"",
            account_type:""
            }}

            validationSchema={Yup.object().shape({ 
                firstname: Yup.string()
                .required("Required"),
            sponsor_id:Yup.number().positive("please enter number greater than 0")
                .required("Required"),
            co_sponsor_id:Yup.number().positive("please enter number greater than 0")
                .required("Required"),
            mobile:Yup.number()
                .required("Required")
                .test('len', 'Must be exactly 10 digits', val => val && val.toString().length === 10 ),  
            email:Yup.string()
            .email("Invalid email address"),
            dob:Yup.date().nullable()
            })} 
          
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            //   this.props.history.push("/buy-product");
            addAdp({data: values}).then((response) => {
                this.props.history.push(`/buy-product?${response.data.adpId}`);
            })
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
                            label="Sponser ID"
                            id="sponsor_id"
                            type="number"
                            value={values.sponsor_id}
                            onChange={handleChange}
                            onBlur={(e)=>{
                                handleBlur(e); this.blurHandle(e);
                                getAdpName(e.target.value)
                                .catch((err) => {
                                    if (err.response.status === 404) {
                                        alert("Please check Sponser ID")
                                        setFieldValue("sponsor_id", "");
                                    }
                                })
                                .then((response) => {

                                    response && response.data && setFieldValue("sponsor_name", response.data.result)
                                })
                            }}
                            className={
                            errors.sponsor_id && touched.sponsor_id
                                ? "text-input error"
                                : "text-input"
                            }
                        />
                        {errors.sponsor_id && touched.sponsor_id && (
                            <div className="input-feedback">{errors.sponsor_id}</div>
                        )}

                    </div>

                    <div class="col">
                        <TextInput 
                            label="Sponser Name"
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
                        />
                        {errors.sponsor_name && touched.sponsor_name && (
                            <div className="input-feedback">{errors.sponsor_name}</div>
                        )}

                    </div>

                    <div class="col">
                        <TextInput 
                            label="Cosponser ID"
                            id="co_sponsor_id"
                            type="number"
                            value={values.co_sponsor_id}
                            onChange={handleChange}
                            onBlur={(e)=>{
                                handleBlur(e); this.blurHandle(e);
                                getAdpName(e.target.value)
                                .catch((err) => {
                                    if (err.response.status === 404) {
                                        alert("Please check Co Sponser ID");
                                        setFieldValue("co_sponsor_id", "");

                                    }
                                })
                                .then((response) => {

                                    response && response.data && setFieldValue("co_sponsor_name", response.data.result)
                                })
                            }}
                            className={
                            errors.co_sponsor_id && touched.co_sponsor_id
                                ? "text-input error"
                                : "text-input"
                            }
                        />
                        {errors.co_sponsor_id && touched.co_sponsor_id && (
                            <div className="input-feedback">{errors.co_sponsor_id}</div>
                        )}

                    </div>

                    <div class="col">
                        <TextInput 
                            label="Co Sponser Name"
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
                        />
                        {errors.co_sponsor_name && touched.co_sponsor_name && (
                            <div className="input-feedback">{errors.co_sponsor_name}</div>
                        )}

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
                        />
                        {errors.firstname && touched.firstname && (
                            <div className="input-feedback">{errors.firstname}</div>
                        )}

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
                        />
                        {errors.lastname && touched.lastname && (
                            <div className="input-feedback">{errors.lastname}</div>
                        )}

                    </div>

                    

                    <div class="col">
                    <FormControl>
                    <KeyboardDatePicker
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
                        />
                        {errors.dob && touched.dob && (
                            <div className="input-feedback">{errors.dob}</div>
                        )}
                    </FormControl>
                    </div>

                    <div class="col">
                    <FormControl style={{minWidth: 190}}>
                    <InputLabel  >Gender</InputLabel>
                            <Select
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
                            >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        
                        {errors.gender && touched.gender && (
                            <div className="input-feedback">{errors.gender}</div>
                        )}
                    </FormControl>
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
                        />
                        {errors.father_firstname && touched.father_firstname && (
                            <div className="input-feedback">{errors.father_firstname}</div>
                        )}

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
                        />
                        {errors.father_lastname && touched.father_lastname && (
                            <div className="input-feedback">{errors.father_lastname}</div>
                        )}

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
                        />
                        {errors.nominee_firstname && touched.nominee_firstname && (
                            <div className="input-feedback">{errors.nominee_firstname}</div>
                        )}

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
                        />
                        {errors.nominee_lastname && touched.nominee_lastname && (
                            <div className="input-feedback">{errors.nominee_lastname}</div>
                        )}

                    </div>

                    <div class="col">
                    <FormControl style={{minWidth: 190}}>
                    <InputLabel  >Nominee Gender</InputLabel>
                            <Select
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
                            >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        {errors.nominee_gender && touched.nominee_gender && (
                            <div className="input-feedback">{errors.nominee_gender}</div>
                        )}
                    </ FormControl>
                    </div>
                          
                    <div class="col">
                    <FormControl>
                    <KeyboardDatePicker
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
                        />
                        {errors.nominee_dob && touched.nominee_dob && (
                            <div className="input-feedback">{errors.nominee_dob}</div>
                        )}
                    </FormControl>
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
                        />
                        {errors.relation && touched.relation && (
                            <div className="input-feedback">{errors.relation}</div>
                        )}

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
                        />
                        {errors.pan && touched.pan && (
                            <div className="input-feedback">{errors.pan}</div>
                        )}

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
                        />
                        {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                        )}

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
                        />
                        {errors.mobile && touched.mobile && (
                            <div className="input-feedback">{errors.mobile}</div>
                        )}

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
                            errors.address_correspondence && touched.address_correspondence
                                ? "text-input error"
                                : "text-input"
                            }
                        />
                        {errors.address_correspondence && touched.address_correspondence && (
                            <div className="input-feedback">{errors.address_correspondence}</div>
                        )}

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
                        />
                        {errors.landmark && touched.landmark && (
                            <div className="input-feedback">{errors.landmark}</div>
                        )}

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
                        />
                        {errors.district && touched.district && (
                            <div className="input-feedback">{errors.district}</div>
                        )}

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
                        />
                        {errors.state && touched.state && (
                            <div className="input-feedback">{errors.state}</div>
                        )}

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
                        />
                        {errors.postal_code && touched.postal_code && (
                            <div className="input-feedback">{errors.postal_code}</div>
                        )}

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
                        />
                        {errors.id_proof && touched.id_proof && (
                            <div className="input-feedback">{errors.id_proof}</div>
                        )}

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
                        />
                        {errors.proof_address && touched.proof_address && (
                            <div className="input-feedback">{errors.proof_address}</div>
                        )}

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
                            disabled
                        />
                        {errors.bank_name && touched.bank_name && (
                            <div className="input-feedback">{errors.bank_name}</div>
                        )}

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
                        />
                        {errors.account_no && touched.account_no && (
                            <div className="input-feedback">{errors.account_no}</div>
                        )}

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
                            disabled
                        />
                        {errors.branch && touched.branch && (
                            <div className="input-feedback">{errors.branch}</div>
                        )}

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
                            onBlur={(e) => {
                                // handleBlur(e); this.blurHandle(e);
                                let ifscCode = e.target.value;
                                ifsc.validate(ifscCode) ? (
                                    fetchIfscDetails(ifscCode).then((response) => {
                                        let branch = `${response.BANKCODE} - ${response.BRANCH}`;
        
                                        setFieldValue("bank_name", response.BANK);
                                        setFieldValue("branch", branch);
                                    })
                                    
                                ) : alert("Please Check IFSC")
                            
                                  
                              }}
                        />
                        {errors.ifs_code && touched.ifs_code && (
                            <div className="input-feedback">{errors.ifs_code}</div>
                        )}

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
                        />
                        {errors.account_type && touched.account_type && (
                            <div className="input-feedback">{errors.account_type}</div>
                        )}

                    </div>

                    
                </div>

                
              
              <br></br>
              <Button  variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                Next
              </Button>
            </form>
          )}
        </Formik>
      </Slate>
     
    </MuiPickersUtilsProvider>
    );
  }
}

export default withRouter(AddAdp);


function getAdpName (adp_id) {
    return apiHandler.get("/get-adp-name", {params:{adp_id}})
}

function addAdp (body) {
    return apiHandler.post("/add-adp", body)
}

function fetchIfscDetails (ifscCode) {
    return ifsc.fetchDetails(ifscCode)
}
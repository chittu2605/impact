import {
  CREATE_ADP_INITIATE,
  CREATE_ADP_FAILED,
  CREATE_ADP_SUCCESS,
  UPDATE_ADP_DATA,
} from "../constants/adp";

const initialData = {
  adpData: {
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
  },
  status: "",
};

export const createAdpReducer = (state = initialData, action = {}) => {
  switch (action.type) {
    case CREATE_ADP_INITIATE:
      return Object.assign({}, state, {
        status: "waiting",
      });
    case CREATE_ADP_SUCCESS:
      return Object.assign({}, state, {
        status: "success",
      });
    case CREATE_ADP_FAILED:
      return Object.assign({}, state, {
        status: "failed",
      });
    
    case UPDATE_ADP_DATA:
      return Object.assign({}, state, {
        status: "",
        adpData: action.payload,
      });

    default:
      return state;
  }
};

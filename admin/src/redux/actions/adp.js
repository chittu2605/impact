import {
    UPDATE_ADP_INITIATE,
    UPDATE_ADP_FAILED,
    UPDATE_ADP_SUCCESS,
} from "../constants/adp";
import axios from "axios";
import { apiHandler } from "../../utils/apiConfig";

export const updateSelectedAdpInitiate = data => {
    return {
      type: UPDATE_ADP_INITIATE,
    };
  };
  
  export const updateSelectedAdpSuccess = data => {
    return {
      type: UPDATE_ADP_SUCCESS,
      payload: data
    };
  };
  
  export const updateSelectedAdpFailed = data => {
    return {
      type: UPDATE_ADP_FAILED,
    };
  };




  export const getSelectedAdpAction = (body) => {
    return dispatch => {
      dispatch(updateSelectedAdpInitiate());
      return getSelectedAdpApi(body)
        .then(response => {
            if (response) {
                dispatch(updateSelectedAdpSuccess(response));
            } else {
                dispatch(updateSelectedAdpFailed());
            }
        })
        .catch(error => {
          dispatch(updateSelectedAdpFailed());
        });
    };
  };




  
  function getSelectedAdpApi(adp_id) {
    return apiHandler.get(`/adp-name`, {
        params:{
            adp_id: adp_id
        }
    }).catch((err) => {
        console.log(err)
    });
  }
  

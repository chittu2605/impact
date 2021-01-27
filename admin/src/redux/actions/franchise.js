import {
    UPDATE_ADMIN_PRODUCT_LIST_INITIATE,
    UPDATE_ADMIN_PRODUCT_LIST_FAILED,
    UPDATE_ADMIN_PRODUCT_LIST_SUCCESS
} from "../constants/franchise";

import axios from "axios";
import { apiHandler } from "../../utils/apiConfig";

export const updateAdminProductInitiate = data => {
    return {
      type: UPDATE_ADMIN_PRODUCT_LIST_INITIATE,
    };
  };
  
  export const updateAdminProductSuccess = data => {
    return {
      type: UPDATE_ADMIN_PRODUCT_LIST_SUCCESS,
      payload: data
    };
  };
  
  export const updateAdminProductFailed = data => {
    return {
      type: UPDATE_ADMIN_PRODUCT_LIST_FAILED,
    };
  };




  export const getAdminProductAction = (body) => {
    return dispatch => {
      dispatch(updateAdminProductInitiate());
      return getAdminProductApi(body)
        .then(response => {
            if (response) {
                dispatch(updateAdminProductSuccess(response));
            } else {
                dispatch(updateAdminProductFailed());
            }
        })
        .catch(error => {
          dispatch(updateAdminProductFailed());
        });
    };
  };




  
  function getAdminProductApi(body) {
    return apiHandler.get(`/get-products-admin`, body).catch((err) => {
        console.log(err)
    });
  }
  

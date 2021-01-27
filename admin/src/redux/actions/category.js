import {
    UPDATE_CATEGORY_LIST_INITIATE,
    UPDATE_CATEGORY_LIST_FAILED,
    UPDATE_CATEGORY_LIST_SUCCESS,
} from "../constants/category";
import axios from "axios";
import { apiHandler } from "../../utils/apiConfig";

export const updateCategoryListInitiate = data => {
    return {
      type: UPDATE_CATEGORY_LIST_INITIATE,
    };
  };
  
  export const updateCategoryListSuccess = data => {
    return {
      type: UPDATE_CATEGORY_LIST_SUCCESS,
      payload: data
    };
  };
  
  export const updateCategoryListFailed = data => {
    return {
      type: UPDATE_CATEGORY_LIST_FAILED,
    };
  };




  export const getCategoryAction = (body) => {
    return dispatch => {
      dispatch(updateCategoryListInitiate());
      return getCategoryApi(body)
        .then(response => {
            if (response) {
                dispatch(updateCategoryListSuccess(response));
            } else {
                dispatch(updateCategoryListFailed());
            }
        })
        .catch(error => {
          dispatch(updateCategoryListFailed());
        });
    };
  };




  
  function getCategoryApi(body) {
    return apiHandler.get(`/list-category`, body).catch((err) => {
        console.log(err)
    });
  }
  

import {
    UPDATE_SUB_CATEGORY_LIST_INITIATE,
    UPDATE_SUB_CATEGORY_LIST_FAILED,
    UPDATE_SUB_CATEGORY_LIST_SUCCESS,
    UPDATE_SUB_CATEGORY_SELECTED_CATEGORY
} from "../constants/subCategory";
import axios from "axios";
import { apiHandler } from "../../utils/apiConfig";

export const updateSubCategoryListInitiate = data => {
    return {
      type: UPDATE_SUB_CATEGORY_LIST_INITIATE,
    };
  };
  
  export const updateSubCategoryListSuccess = data => {
    return {
      type: UPDATE_SUB_CATEGORY_LIST_SUCCESS,
      payload: data
    };
  };
  
  export const updateSubCategoryListFailed = data => {
    return {
      type: UPDATE_SUB_CATEGORY_LIST_FAILED,
    };
  };

  export const updateSubCategorySelectedCategory = data => {
    return {
      type: UPDATE_SUB_CATEGORY_SELECTED_CATEGORY,
      payload: data
    };
  };



  export const getSubCategoryAction = (body) => {
    return dispatch => {
      dispatch(updateSubCategoryListInitiate());
      return getSubCategoryApi(body)
        .then(response => {
            if (response) {
                dispatch(updateSubCategoryListSuccess(response));
            } else {
                dispatch(updateSubCategoryListFailed());
            }
        })
        .catch(error => {
          dispatch(updateSubCategoryListFailed());
        });
    };
  };




  
  function getSubCategoryApi(categoryId) {
    return apiHandler.get(`/list-sub-category`,
        {
            params: {
                categoryId
            }
        }
    ).catch((err) => {
        console.log(err)
    });
  }
  

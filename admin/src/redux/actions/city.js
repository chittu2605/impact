import {
    UPDATE_CITY_LIST_INITIATE,
    UPDATE_CITY_LIST_FAILED,
    UPDATE_CITY_LIST_SUCCESS,
} from "../constants/city";
import axios from "axios";
import { apiHandler } from "../../utils/apiConfig";

export const updateCityListInitiate = data => {
    return {
      type: UPDATE_CITY_LIST_INITIATE,
    };
  };
  
  export const updateCityListSuccess = data => {
    return {
      type: UPDATE_CITY_LIST_SUCCESS,
      payload: data
    };
  };
  
  export const updateCityListFailed = data => {
    return {
      type: UPDATE_CITY_LIST_FAILED,
    };
  };




  export const getCityAction = (body) => {
    return dispatch => {
      dispatch(updateCityListInitiate());
      return getCityApi(body)
        .then(response => {
            if (response) {
                dispatch(updateCityListSuccess(response));
            } else {
                dispatch(updateCityListFailed());
            }
        })
        .catch(error => {
          dispatch(updateCityListFailed());
        });
    };
  };




  
  function getCityApi(body) {
    return apiHandler.get(`/list-city`, body).catch((err) => {
        console.log(err)
    });
  }
  

import {
  FETCH_SMART_MART_INITIATE,
  FETCH_SMART_MART_FAILED,
  FETCH_SMART_MART_SUCCESS,
} from "../constants/smartMart";
import { apiHandler } from "config/apiConfig";

export const fetchSmartMartInitiate = data => {
  return {
    type: FETCH_SMART_MART_INITIATE,
  };
};

export const fetchSmartMartSuccess = data => {
  return {
    type: FETCH_SMART_MART_SUCCESS,
    payload: data
  };
};

export const fetchSmartMartFailed = data => {
  return {
    type: FETCH_SMART_MART_FAILED,
  };
};

export const fetchSmartMartAction = () => {
  return dispatch => {
    dispatch(fetchSmartMartInitiate());
    return SmartMartApi()
      .then(response => {
          if (response) {
              dispatch(fetchSmartMartSuccess(response));
          } else {
              dispatch(fetchSmartMartFailed());
          }
      })
      .catch(error => {
        dispatch(fetchSmartMartFailed());
      });
  };
};


function SmartMartApi() {
  return apiHandler.get(`/smart-mart-balance`).catch((err) => {
      console.log(err)
  });
}


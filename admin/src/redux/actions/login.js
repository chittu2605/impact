import {
  UPDATE_LOGIN_INITIATE,
  UPDATE_LOGIN_FAILED,
  UPDATE_LOGIN_SUCCESS,
  UPDATE_LOGOUT_SUCCESS,
  UPDATE_OTP_SUCCESS,
  UPDATE_OTP_FAILED,
} from "../constants/login";
import axios from "axios";
import { apiHandler } from "../../utils/apiConfig";

export const updateLoginInitiate = (data) => {
  return {
    type: UPDATE_LOGIN_INITIATE,
  };
};

export const updateLoginSuccess = (data) => {
  return {
    type: UPDATE_LOGIN_SUCCESS,
    payload: data,
  };
};

export const updateOtpFailed = () => {
  return {
    type: UPDATE_OTP_FAILED,
  };
};

export const updateOtpSuccess = (data) => {
  return {
    type: UPDATE_OTP_SUCCESS,
    payload: data,
  };
};

export const updateLoginFailed = (data) => {
  return {
    type: UPDATE_LOGIN_FAILED,
  };
};

export const updateLogoutSuccess = (data) => {
  return {
    type: UPDATE_LOGOUT_SUCCESS,
    payload: data,
  };
};

export const otpAction = (body, cb) => {
  return (dispatch) => {
    return otpApi(body)
      .then((response) => {
        if (response) {
          dispatch(updateOtpSuccess(response));
          cb();
        } else {
          dispatch(updateOtpFailed());
        }
      })
      .catch((error) => {
        dispatch(updateOtpFailed());
      });
  };
};

export const loginAction = (body) => {
  return (dispatch) => {
    dispatch(updateLoginInitiate());
    return loginApi(body)
      .then((response) => {
        if (response) {
          dispatch(updateLoginSuccess(response));
        } else {
          dispatch(updateLoginFailed());
        }
      })
      .catch((error) => {
        dispatch(updateLoginFailed());
      });
  };
};

export const logoutAction = (body) => {
  return (dispatch) => {
    return logoutApi(body)
      .then((response) => {
        dispatch(updateLogoutSuccess(response));
        window.location = window.location.origin;
      })
      .catch((error) => {});
  };
};

function loginApi(body) {
  return apiHandler.post(`/admin/login`, body).catch((err) => {
    console.log(err);
  });
}

function logoutApi(body) {
  return apiHandler.post(`/logout`, body).catch((err) => {
    console.log(err);
  });
}

function otpApi(body) {
  return apiHandler.post(`/admin/validateOtp`, body).catch((err) => {
    console.log(err);
  });
}

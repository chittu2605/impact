import {
  UPDATE_LOGIN_INITIATE,
  UPDATE_LOGIN_FAILED,
  UPDATE_LOGIN_SUCCESS,
  UPDATE_LOGOUT_SUCCESS,
  UPDATE_OTP_SUCCESS,
  UPDATE_OTP_FAILED,
} from "../constants/login";

const initialUserData = {
  status: "logged out",
  authenticated: false,
  otpStatus: "",
  // accessToken: "",
};

export const updateLoginStatus = (state = initialUserData, action = {}) => {
  switch (action.type) {
    case UPDATE_LOGIN_INITIATE:
      return Object.assign({}, state, {
        status: "waiting",
      });
    case UPDATE_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        status: "success",
        authenticated: action.payload.authenticated,
        // accessToken: action.payload.accessToken,
      });
    case UPDATE_LOGIN_FAILED:
      return Object.assign({}, state, {
        status: "failed",
      });
    case UPDATE_LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        status: "logged out",
        authenticated: false,
      });
    case UPDATE_OTP_SUCCESS:
      return Object.assign({}, state, {
        otpStatus: "success",
      });
    case UPDATE_OTP_FAILED:
      return Object.assign({}, state, {
        otpStatus: "failed",
      });
    default:
      return state;
  }
};

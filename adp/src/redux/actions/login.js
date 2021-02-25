import {
  UPDATE_LOGIN_INITIATE,
  UPDATE_LOGIN_FAILED,
  UPDATE_LOGIN_SUCCESS,
  UPDATE_LOGOUT_SUCCESS,
  UPDATE_CHILD_LOGIN_SUCCESS,
  UPDATE_CHILD_LOGOUT_SUCCESS,
} from "../constants/login";
import { apiHandler } from "config/apiConfig";

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

export const updateChildLogin = (data) => {
  return {
    type: UPDATE_CHILD_LOGIN_SUCCESS,
    payload: data,
  };
};

export const updateChildLogout = () => {
  return {
    type: UPDATE_CHILD_LOGOUT_SUCCESS,
  };
};

export const loginAction = (body, cb) => {
  return (dispatch) => {
    dispatch(updateLoginInitiate());
    return loginApi(body)
      .then((response) => {
        if (response) {
          dispatch(updateLoginSuccess(response.data));
          cb();
        } else {
          dispatch(updateLoginFailed());
        }
      })
      .catch((error) => {
        dispatch(updateLoginFailed());
      });
  };
};

export const childLoginAction = (body, cb) => {
  return (dispatch) => {
    dispatch(updateLoginInitiate());
    return childLoginApi(body)
      .then((response) => {
        if (response) {
          dispatch(updateChildLogin(response.data));
          cb(response);
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
        window.location = "/login";
      })
      .catch((error) => {});
  };
};

export const childLogoutAction = (cb) => {
  return async (dispatch) => {
    try {
      const res = await childLogout();
      if (res.status === 205) {
        dispatch(updateChildLogout());
        cb();
      }
    } catch (error) {
      console.log(error);
    }
  };
};

function loginApi(body) {
  return apiHandler.post(`/login`, body).catch((err) => {
    console.log(err);
  });
}

function logoutApi(body) {
  return apiHandler.post(`/logout`, body).catch((err) => {
    console.log(err);
  });
}

function childLoginApi(body) {
  return apiHandler.get(`/child-login`, body).catch((err) => {
    console.log(err);
  });
}

function childLogout() {
  return apiHandler.get(`/child-logout`);
}

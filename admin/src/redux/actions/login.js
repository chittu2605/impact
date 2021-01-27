import {
    UPDATE_LOGIN_INITIATE,
    UPDATE_LOGIN_FAILED,
    UPDATE_LOGIN_SUCCESS,
    UPDATE_LOGOUT_SUCCESS
} from "../constants/login";
import axios from "axios";
import { apiHandler } from "../../utils/apiConfig";

export const updateLoginInitiate = data => {
    return {
      type: UPDATE_LOGIN_INITIATE,
    };
  };
  
  export const updateLoginSuccess = data => {
    return {
      type: UPDATE_LOGIN_SUCCESS,
      payload: data
    };
  };
  
  export const updateLoginFailed = data => {
    return {
      type: UPDATE_LOGIN_FAILED,
    };
  };

  export const updateLogoutSuccess = data => {
    return {
      type: UPDATE_LOGOUT_SUCCESS,
      payload: data
    };
  };
  


  export const loginAction = (body) => {
    return dispatch => {
      dispatch(updateLoginInitiate());
      return loginApi(body)
        .then(response => {
            if (response) {
                dispatch(updateLoginSuccess(response));
            } else {
                dispatch(updateLoginFailed());
            }
        })
        .catch(error => {
          dispatch(updateLoginFailed());
        });
    };
  };


  export const logoutAction = (body) => {
    return dispatch => {
        return logoutApi(body)
        .then(response => {
                dispatch(updateLogoutSuccess(response));
                window.location = window.location.origin
        })
        .catch(error => {
        });
    }
    
};

  
  function loginApi(body) {
    return apiHandler.post(`/admin/login`, body).catch((err) => {
        console.log(err)
    });
  }
  

    
  function logoutApi(body) {
    return apiHandler.post(`/logout`, body).catch((err) => {
        console.log(err)
    });
  }
  
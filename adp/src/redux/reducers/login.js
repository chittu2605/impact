import {
  UPDATE_LOGIN_INITIATE,
  UPDATE_LOGIN_FAILED,
  UPDATE_LOGIN_SUCCESS,
  UPDATE_LOGOUT_SUCCESS,
  UPDATE_CHILD_LOGIN_SUCCESS,
  UPDATE_CHILD_LOGOUT_SUCCESS,
} from "../constants/login";

const initialUserData = {
  status: "logged out",
  authenticated: false,
  adpId: "",
  name: "",
  parentId: "",
  parentName: "",
  // accessToken: "",
};

export const updateLoginStatus = (state = initialUserData, action = {}) => {
  switch (action.type) {
    case UPDATE_LOGIN_INITIATE:
      return Object.assign({}, state, {
        status: "waiting",
      });
    case UPDATE_LOGIN_SUCCESS:
      console.log(action.payload);
      return Object.assign({}, state, {
        status: "success",
        authenticated: action.payload.authenticated,
        adpId: action.payload.adpId,
        name: action.payload.name,
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
    case UPDATE_CHILD_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        adpId: action.payload.childId,
        name: action.payload.childName,
        parentId: state.adpId,
        parentName: state.name,
      });
    case UPDATE_CHILD_LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        adpId: state.parentId != "" ? state.parentId : state.adpId,
        name: state.parentId != "" ? state.parentName : state.name,
        parentId: "",
        parentName: "",
      });
    default:
      return state;
  }
};

import {
    UPDATE_LOGIN_INITIATE,
    UPDATE_LOGIN_FAILED,
    UPDATE_LOGIN_SUCCESS,
    UPDATE_LOGOUT_SUCCESS
 } from "../constants/login";

const initialUserData = {
    status: "logged out",
    authenticated: false,
    // accessToken: "",
}


export const updateLoginStatus = (state = initialUserData, action = {}) => {
	switch (action.type) {
		case UPDATE_LOGIN_INITIATE:
			return Object.assign({}, state, {
				status: "waiting",
            })
        case UPDATE_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                status: "success",
                authenticated: action.payload.authenticated,
                // accessToken: action.payload.accessToken,
            })
        case UPDATE_LOGIN_FAILED:
            return Object.assign({}, state, {
                status: "failed",
            })
        case UPDATE_LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                status: "logged out",
                authenticated: false,
            })
		default:
			return state
	}
}
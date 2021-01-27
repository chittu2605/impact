import {
    UPDATE_CITY_LIST_INITIATE,
    UPDATE_CITY_LIST_FAILED,
    UPDATE_CITY_LIST_SUCCESS,
 } from "../constants/city";

const initialUserData = {
    cityList: [],
    status: "",
}


export const updateCityList = (state = initialUserData, action = {}) => {
	switch (action.type) {
		case UPDATE_CITY_LIST_INITIATE:
			return Object.assign({}, state, {
				status: "waiting",
            })
        case UPDATE_CITY_LIST_SUCCESS:
            return Object.assign({}, state, {
                status: "success",
                cityList: action.payload.data.results,
                // accessToken: action.payload.accessToken,
            })
        case UPDATE_CITY_LIST_FAILED:
            return Object.assign({}, state, {
                status: "failed",
            })
		default:
			return state
	}
}
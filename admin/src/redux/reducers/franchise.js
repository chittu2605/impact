import {
    UPDATE_ADMIN_PRODUCT_LIST_INITIATE,
    UPDATE_ADMIN_PRODUCT_LIST_FAILED,
    UPDATE_ADMIN_PRODUCT_LIST_SUCCESS,
 } from "../constants/franchise";

const initialUserData = {
    productList: [],
    status: "",
    franchiseName: "",
    franchiseAddress: "",
    franchisePhone: "",
    adpId: "",
}


export const updateFranchiseList = (state = initialUserData, action = {}) => {
	switch (action.type) {
		case UPDATE_ADMIN_PRODUCT_LIST_INITIATE:
			return Object.assign({}, state, {
				status: "waiting",
            })
        case UPDATE_ADMIN_PRODUCT_LIST_SUCCESS:
            return Object.assign({}, state, {
                status: action.payload.data.success,
                productList: action.payload.data.results,
                // accessToken: action.payload.accessToken,
            })
        case UPDATE_ADMIN_PRODUCT_LIST_FAILED:
            return Object.assign({}, state, {
                status: "failed",
            })
		default:
			return state
	}
}
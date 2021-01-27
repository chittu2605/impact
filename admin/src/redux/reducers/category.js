import {
    UPDATE_CATEGORY_LIST_INITIATE,
    UPDATE_CATEGORY_LIST_FAILED,
    UPDATE_CATEGORY_LIST_SUCCESS,
 } from "../constants/category";

const initialData = {
    categoryList: [],
    status: "",
}


export const updateCategoryList = (state = initialData, action = {}) => {
	switch (action.type) {
		case UPDATE_CATEGORY_LIST_INITIATE:
			return Object.assign({}, state, {
				status: "waiting",
            })
        case UPDATE_CATEGORY_LIST_SUCCESS:
            return Object.assign({}, state, {
                status: "success",
                categoryList: action.payload.data.results,
                // accessToken: action.payload.accessToken,
            })
        case UPDATE_CATEGORY_LIST_FAILED:
            return Object.assign({}, state, {
                status: "failed",
            })
		default:
			return state
	}
}
import {
    UPDATE_SUB_CATEGORY_LIST_INITIATE,
    UPDATE_SUB_CATEGORY_LIST_FAILED,
    UPDATE_SUB_CATEGORY_LIST_SUCCESS,
    UPDATE_SUB_CATEGORY_SELECTED_CATEGORY
 } from "../constants/subCategory";

const initialData = {
    subCategoryList: [],
    status: "",
    selectedCategoryId: "",
}


export const updateSubCategoryList = (state = initialData, action = {}) => {
	switch (action.type) {
		case UPDATE_SUB_CATEGORY_LIST_INITIATE:
			return Object.assign({}, state, {
				status: "waiting",
            })
        case UPDATE_SUB_CATEGORY_LIST_SUCCESS:
            return Object.assign({}, state, {
                status: "success",
                subCategoryList: action.payload.data.results,
                // accessToken: action.payload.accessToken,
            })
        case UPDATE_SUB_CATEGORY_LIST_FAILED:
            return Object.assign({}, state, {
                status: "failed",
            })
        case UPDATE_SUB_CATEGORY_SELECTED_CATEGORY:
            return Object.assign({}, state, {
                selectedCategoryId: action.payload,
            })
		default:
			return state
	}
}
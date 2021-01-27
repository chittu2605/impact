import {
    UPDATE_ADP_INITIATE,
    UPDATE_ADP_FAILED,
    UPDATE_ADP_SUCCESS,
} from "../constants/adp";

const initialUserData = {
    status: "",
    adp_id: "",
    firstname: "",
    lastname: "",
    user_type: "",
    franchise_name: "",
    franchise_address: "",
    franchise_number: "",
}


export const updateAdpInfo = (state = initialUserData, action = {}) => {
	switch (action.type) {
		case UPDATE_ADP_INITIATE:
			return Object.assign({}, state, {
                status: "waiting",
                adp_id: "",
                firstname: "",
                lastname: "",
            })
        case UPDATE_ADP_SUCCESS:
            if (action.payload.data != undefined && action.payload.data.results.length > 0) {
                return Object.assign({}, state, {
                    status: "success",
                    ...action.payload.data.results[0],
                })
            } else {
                return Object.assign({}, state, {
                    ...initialUserData
                })
            }
            
        case UPDATE_ADP_FAILED:
            return Object.assign({}, state, {
                status: "failed",
            })
		default:
			return state
	}
}
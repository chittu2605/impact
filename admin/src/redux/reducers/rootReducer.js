import { combineReducers } from 'redux';
import { updateLoginStatus } from "./login"
import { updateCityList } from "./city";
import { updateCategoryList } from "./category";
import { updateSubCategoryList } from "./subCategory";
import { updateAdpInfo } from "./adp";
import { updateFranchiseList } from "./franchise";

const rootReducer = combineReducers({
    updateLoginStatus,
    updateCityList,
    updateCategoryList,
    updateSubCategoryList,
    updateAdpInfo,
    updateFranchiseList
});

export default rootReducer;
import { combineReducers } from 'redux';
import { updateLoginStatus } from "./login"
import { fetchWalletStatus } from "./wallet"
import { createAdpReducer } from "./addAdp"
import { updateRepurchaseAdpDetails } from "./rePurchase"
import { fetchSmartMartStatus } from "./smartMart"


const rootReducer = combineReducers({
    updateLoginStatus,
    fetchWalletStatus,
    createAdpReducer,
    updateRepurchaseAdpDetails,
    fetchSmartMartStatus
});

export default rootReducer;
import {
  UPDATE_REPURCHASE_ADP_DETAILS,
} from "../constants/rePurchase";


export const updateRepurchaseAdpDetails = data => {
  return {
    type: UPDATE_REPURCHASE_ADP_DETAILS,
    payload: data,
  };
};
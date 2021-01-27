import {
  UPDATE_REPURCHASE_ADP_DETAILS,
} from "../constants/rePurchase";

const initialData = {
  adpId: "",
  adpName: "",
  sponsorId: "",
  sponsorName: "",
  mobile: "",
  pan: "",
};

export const updateRepurchaseAdpDetails = (state = initialData, action = {}) => {
  switch (action.type) {
    case UPDATE_REPURCHASE_ADP_DETAILS:
      return Object.assign({}, state, {
        ...action.payload
      });

    default:
      return state;
  }
};

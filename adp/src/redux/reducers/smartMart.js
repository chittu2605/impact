import {
  FETCH_SMART_MART_INITIATE,
  FETCH_SMART_MART_FAILED,
  FETCH_SMART_MART_SUCCESS,
} from "../constants/smartMart";

const initialData = {
  balance: 0,
  statement: [],
  status: "",
};

export const fetchSmartMartStatus = (state = initialData, action = {}) => {
  switch (action.type) {
    case FETCH_SMART_MART_INITIATE:
      return Object.assign({}, state, {
        status: "waiting",
      });
    case FETCH_SMART_MART_SUCCESS:
      return Object.assign({}, state, {
        ...action.payload.data,
      });
    case FETCH_SMART_MART_FAILED:
      return Object.assign({}, state, {
        status: "failed",
      });

    default:
      return state;
  }
};

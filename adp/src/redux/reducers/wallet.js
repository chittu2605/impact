import {
  FETCH_WALLET_INITIATE,
  FETCH_WALLET_FAILED,
  FETCH_WALLET_SUCCESS,
} from "../constants/wallet";

const initialData = {
  balance: 0,
  statement: [],
  status: "",
};

export const fetchWalletStatus = (state = initialData, action = {}) => {
  switch (action.type) {
    case FETCH_WALLET_INITIATE:
      return Object.assign({}, state, {
        status: "waiting",
      });
    case FETCH_WALLET_SUCCESS:
      return Object.assign({}, state, {
        ...action.payload.data,
      });
    case FETCH_WALLET_FAILED:
      return Object.assign({}, state, {
        status: "failed",
      });

    default:
      return state;
  }
};

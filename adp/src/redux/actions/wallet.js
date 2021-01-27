import {
  FETCH_WALLET_INITIATE,
  FETCH_WALLET_FAILED,
  FETCH_WALLET_SUCCESS,
} from "../constants/wallet";
import { apiHandler } from "config/apiConfig";

export const fetchWalletInitiate = data => {
  return {
    type: FETCH_WALLET_INITIATE,
  };
};

export const fetchWalletSuccess = data => {
  return {
    type: FETCH_WALLET_SUCCESS,
    payload: data
  };
};

export const fetchWalletFailed = data => {
  return {
    type: FETCH_WALLET_FAILED,
  };
};

export const fetchWalletAction = () => {
  return dispatch => {
    dispatch(fetchWalletInitiate());
    return walletApi()
      .then(response => {
          if (response) {
              dispatch(fetchWalletSuccess(response));
          } else {
              dispatch(fetchWalletFailed());
          }
      })
      .catch(error => {
        dispatch(fetchWalletFailed());
      });
  };
};


function walletApi() {
  return apiHandler.get(`/wallet`).catch((err) => {
      console.log(err)
  });
}


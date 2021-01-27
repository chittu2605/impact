import {
  CREATE_ADP_INITIATE,
  CREATE_ADP_FAILED,
  CREATE_ADP_SUCCESS,
  UPDATE_ADP_DATA,
} from "../constants/adp";
import { apiHandler } from "config/apiConfig";

export const createAdpInitiate = data => {
  return {
    type: CREATE_ADP_INITIATE,
  };
};

export const createAdpSuccess = data => {
  return {
    type: CREATE_ADP_SUCCESS,
    payload: data
  };
};

export const createAdpFailed = data => {
  return {
    type: CREATE_ADP_FAILED,
  };
};

export const updateAdpData = data => {
  return {
    type: UPDATE_ADP_DATA,
    payload: data,
  };
};

// export const fetchWalletAction = () => {
//   return dispatch => {
//     dispatch(fetchWalletInitiate());
//     return walletApi()
//       .then(response => {
//           if (response) {
//               dispatch(fetchWalletSuccess(response));
//           } else {
//               dispatch(fetchWalletFailed());
//           }
//       })
//       .catch(error => {
//         dispatch(fetchWalletFailed());
//       });
//   };
// };


// function walletApi() {
//   return apiHandler.get(`/wallet`).catch((err) => {
//       console.log(err)
//   });
// }


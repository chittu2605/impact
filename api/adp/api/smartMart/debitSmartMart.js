const connection = require("../../../dbConnect");
const { sendSmsByAdpId } = require("../../../utils/sendSMS");
const {
  DEBIT_FROM_SMART_MART_BALANCE,
  GET_SMART_MART_BALANCE,
  CREDIT_SMART_MART_BALANCE,
  INSERT_SMART_MART_BALANCE_STATEMENT,
  CREATE_SMART_MART_BALANCE,
} = require("../../adpQuery/smartMart/smartMart");

const getSmartmartBalance = (adp_id) =>
  new Promise((resolve, reject) =>
    connection.query(
      GET_SMART_MART_BALANCE(adp_id),
      (error, results, fields) => {
        if (!error) {
          resolve(results[0]);
        } else {
          reject(error);
        }
      }
    )
  );

const createSmartMartWallet = async (adpId) =>
  new Promise((resolve, reject) =>
    connection.query(CREATE_SMART_MART_BALANCE(adpId), (error, results) => {
      if (!error) {
        resolve(results[0]);
      } else {
        console.log(error);
        resolve(error);
      }
    })
  );

const debitSmartMart = (adp_id, amount) => {
  connection.query(
    DEBIT_FROM_SMART_MART_BALANCE(adp_id, amount),
    async (error, results, fields) => {
      console.log(DEBIT_FROM_SMART_MART_BALANCE(adp_id, amount));
      if (error) {
        console.log(error);
        return false;
      }
      const balance = await getSmartmartBalance(adp_id);
      let msg = `Your smart mart balance has been debited with ${amount} Rs. Your net balance now is ${balance.balance} Rs. `;
      let debit = amount;
      let credit = 0;
      connection.query(
        INSERT_SMART_MART_BALANCE_STATEMENT(adp_id, msg, credit, debit),
        async (error, results, fields) => {
          if (error) return error;
          sendSmsByAdpId(adp_id, msg);
          return balance;
        }
      );
    }
  );
};

const creditSmartMart = (adp_id, amount) => {
  connection.query(
    CREDIT_SMART_MART_BALANCE(adp_id, amount),
    async (error, results, fields) => {
      if (error) {
        console.log(error);
        return false;
      }
      const balance = await getSmartmartBalance(adp_id);
      let msg = `Your smart mart balance has been credited with ${amount} Rs. Your net balance now is ${balance.balance} Rs. `;
      let debit = 0;
      let credit = amount;
      connection.query(
        INSERT_SMART_MART_BALANCE_STATEMENT(adp_id, msg, credit, debit),
        async (error, results, fields) => {
          if (error) return error;
          sendSmsByAdpId(adp_id, msg);
          return balance;
        }
      );
    }
  );
};

module.exports.debitSmartMart = debitSmartMart;
module.exports.creditSmartMart = creditSmartMart;
module.exports.getSmartmartBalance = getSmartmartBalance;
module.exports.createSmartMartWallet = createSmartMartWallet;

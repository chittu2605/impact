const { GET_VOUCHERS_BY_ADP_ID } = require("../../adpQuery/adp/adp");
const connection = require("../../../dbConnect");
module.exports = (app) => {
  app.get("/adp/get-vouchers", (req, res) => {
    try {
      const adpId = req.user.adp_id;
      connection.query(GET_VOUCHERS_BY_ADP_ID(adpId), (error, results) => {
        if (error) return res.sendStatus("401");
        const returnValue = [];
        results.forEach((voucher) => {
          expDate = voucher.expire_date;
          returnValue.push({
            voucherCode: voucher.voucher_code,
            voucherType: voucher.voucher,
            amount: voucher.amount,
            expiryDate: `${expDate.getDate().toString().padStart(2,0)}-${( expDate.getMonth() + 1).toString().padStart(2,0)}-${expDate.getFullYear()}`
          });
        });
        res.json(returnValue);
      });
    } catch (error) {
      res.sendStatus(400);
    }
  });
};

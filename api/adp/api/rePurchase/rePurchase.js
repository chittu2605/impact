const {
  getBvWeightage,
  getAdpGenratedBv,
} = require("../../../functions/getPbv");

module.exports = (app) => {
  const ADD_ADP = require("../../adpQuery/adp/adp").ADD_ADP;
  const CREATE_ORDER =
    require("../../adpQuery/product/buyProduct").CREATE_ORDER;
  const { updatePvb } = require("../createBvRow");
  const connection = require("../../../dbConnect");
  const bodyParser = require("body-parser");
  const { debitWallet } = require("../wallet/debitWallet");
  const { sendSmsByAdpId } = require("../../../utils/sendSMS");
  const { GET_WALLET } = require("../../adpQuery/wallet/wallet");
  const {
    GET_ADP_SPONSOR_COSPONSOR_BY_ADP_ID,
  } = require("../../adpQuery/adp/adp");
  const {
    SELECT_CO_SPONSOR_ROYALTY_MANAGEMENT,
    INSERT_CO_SPONSOR_ROYALTY,
  } = require("../../../functions/query");
  const {
    GET_SMART_MART_BALANCE,
  } = require("../../adpQuery/smartMart/smartMart");
  const {
    debitSmartMart,
    creditSmartMart,
  } = require("../smartMart/debitSmartMart");
  var moment = require("moment");
  const urlencodedParser = bodyParser.urlencoded({ extended: false });

  app.post("/adp/re-purchase", urlencodedParser, async (req, res) => {
    const products = req.body.products;
    const adp_id = req.body.adp_id;
    const userAdpId = req.user.adp_id;
    let totalAmount = req.body.totalAmount;
    const calculatedBv = req.body.calculatedBv;
    const totalSmartMartDiscount = req.body.totalSmartMartDiscount;
    const prevBv = (await getAdpGenratedBv(adp_id)).generatedBV;
    const currentBv = products.reduce(
      (bv, product) => (bv += product.quantityAdded * product.bv),
      0
    );
    const bvWeightage = await getBvWeightage(currentBv + prevBv);

    let pvbdata = {
      adp_id: adp_id,
      pbv: calculatedBv,
    };
    updatePvb(pvbdata);
    connection.query(
      GET_SMART_MART_BALANCE(adp_id),
      async (error, smartMart, fields) => {
        let smartMartBalance =
          smartMart && smartMart.length > 0 ? smartMart[0].balance : 0;
        totalAmount =
          smartMartBalance >= totalSmartMartDiscount
            ? totalAmount - totalSmartMartDiscount
            : totalAmount;

        connection.query(
          GET_WALLET(userAdpId),
          async (error, wallet, fields) => {
            if (wallet && wallet[0].balance >= totalAmount) {
              products &&
                products.forEach(async (element, i) => {
                  let productCredit = element.vdbc * element.quantityAdded;
                  if (productCredit > 0) {
                    let credit = await creditSmartMart(adp_id, productCredit);
                  }
                  let productDiscount =
                    (element.vdba + element.vdbd) * element.quantityAdded;
                  if (productDiscount > 0) {
                    if (smartMartBalance >= totalSmartMartDiscount) {
                      let debit = await debitSmartMart(adp_id, productDiscount);
                    }
                  }
                  connection.query(
                    CREATE_ORDER(adp_id, element, bvWeightage, "REPURCHASE"),
                    async (error, results, fields) => {
                      console.log(error);
                      if (error) return res.sendStatus("401");
                      if (results.length === 0) return res.sendStatus("404");
                      // let msg = `Congratulations!! You have successfully joined Mission IMPACT. Your ADP ID is ${adp_id}.`
                      // sendSmsByAdpId(adp_id, msg)
                      if (i === products.length - 1) {
                        let balance = await debitWallet(userAdpId, totalAmount);
                        connection.query(
                          GET_ADP_SPONSOR_COSPONSOR_BY_ADP_ID(adp_id),
                          async (error, coSponsor, fields) => {
                            console.log(coSponsor);
                            if (coSponsor && coSponsor.length > 0) {
                              connection.query(
                                SELECT_CO_SPONSOR_ROYALTY_MANAGEMENT(),
                                async (error, planManagement, fields) => {
                                  let co_sponsor_id =
                                    coSponsor[0].co_sponsor_id;
                                  let coSponsorRoyaltyPercentage =
                                    planManagement[0].value;
                                  let coSponsorIncome =
                                    calculatedBv *
                                    (coSponsorRoyaltyPercentage / 100);
                                  let time = moment().format(
                                    "D/MM/YYYY hh:mm:ssa"
                                  );
                                  connection.query(
                                    INSERT_CO_SPONSOR_ROYALTY(
                                      co_sponsor_id,
                                      adp_id,
                                      totalAmount,
                                      coSponsorRoyaltyPercentage,
                                      coSponsorIncome,
                                      time
                                    ),
                                    async (error, coSponserRoyalty, fields) => {
                                      console.log(error);
                                      console.log(
                                        INSERT_CO_SPONSOR_ROYALTY(
                                          co_sponsor_id,
                                          adp_id,
                                          totalAmount,
                                          coSponsorRoyaltyPercentage,
                                          coSponsorIncome,
                                          time
                                        )
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          }
                        );
                        return res.json({
                          status: "success",
                          balance: balance,
                        });
                      }
                    }
                  );
                });
            } else {
              return res.json({
                status: "failed",
                balance: wallet[0].balance,
              });
            }
          }
        );
      }
    );
  });
};

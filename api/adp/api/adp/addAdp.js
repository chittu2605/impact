const {
  ADD_ADP_LINE,
  ADD_ADP_LINE_2,
} = require("../../../admin/dbQuery/adp/adpQuery");
const { passwordEncrypt } = require("../../../utils/passwordEncrypt");
const { generateAdpId } = require("../../../functions/generateAdp");
const { sendMail } = require("../../../utils/emailer");

const connection = require("../../../dbConnect");
const { getBvWeightage } = require("../../../functions/getPbv");

module.exports = (app) => {
  const ADD_ADP = require("../../adpQuery/adp/adp").ADD_ADP;
  const CREATE_ORDER = require("../../adpQuery/product/buyProduct")
    .CREATE_ORDER;
  const { updatePvb } = require("../createBvRow");
  const connection = require("../../../dbConnect");
  const bodyParser = require("body-parser");
  const { debitWallet } = require("../wallet/debitWallet");
  const { sendSmsByAdpId } = require("../../../utils/sendSMS");
  const urlencodedParser = bodyParser.urlencoded({ extended: false });

  app.post("/adp/add-adp", urlencodedParser, async (req, res) => {
    const adpData = req.body.adpData;
    const adpId = await generateAdpId();
    adpData.adpId = adpId;
    const products = req.body.products;
    const userAdpId = req.user.adp_id;
    const totalAmount = req.body.totalAmount;
    const calculatedBv = req.body.calculatedBv;
    const currentBv = products.reduce(
      (bv, product) => (bv += product.quantityAdded * product.bv),
      0
    );
    const bvWeightage = await getBvWeightage(currentBv);
    let password = Math.random().toString().split(".")[1];
    let hashedPassword = await passwordEncrypt(password);
    connection.query(
      ADD_ADP(adpData, hashedPassword),
      async (error, results, fields) => {
        if (error) return res.sendStatus("401");
        // if (results.length === 0) return res.sendStatus("404");
        let adp_id = adpData.adpId;
        let sponsorId = adpData.sponsor_id;
        let name = `${adpData.firstname} ${adpData.lastname}`;
        connection.query(
          ADD_ADP_LINE(sponsorId, adp_id, name),
          async (error, adp_line, fields) => {
            connection.query(
              ADD_ADP_LINE_2(adpId),
              async (error, adp_line2, fields) => {}
            );
          }
        );
        let pvbdata = {
          adp_id: adp_id,
          sponsor_id: adpData.sponsor_id,
          pbv: calculatedBv,
        };

        products &&
          products.forEach(async (element, i) => {
            connection.query(
              CREATE_ORDER(adp_id, element, bvWeightage, "NEW"),
              async (error, newFranchise, fields) => {
                console.log(error);
                if (error) return res.sendStatus("401");
                if (results.length === 0) return res.sendStatus("404");
                sendAddAdpEmail(
                  adpData.firstname,
                  adpData.email,
                  adp_id,
                  password
                );
                // let msg = `Namaste ${adpData.firstname} ji!

                // Welcome to Mission Impact!

                // To view your account you can login from the following link,

                // www.iloveimpact.com/impact

                // Please login with following credentials.

                // ID - ${adp_id}
                // Password - ${password}

                // Wish you success!

                // IMPACT TEAM`;
                // sendSmsByAdpId(adp_id, msg);
                if (i === products.length - 1) {
                  let balance = await debitWallet(userAdpId, totalAmount);
                  updatePvb(pvbdata);
                  return res.json({
                    status: "success",
                    balance: balance,
                  });
                }
              }
            );
          });
      }
    );
  });
};

const sendAddAdpEmail = (name, email, adpId, password) => {
  let options = {
    from: "support@iloveimpact.com",
    to: email,
    subject: "Welcome to Mission Impact!!!",
    text: `Namaste ${name} ji!

      We take this opportunity to welcome you in IMPACT ADP family!
      
      Please login to your ID from the following link, 
      
      www.iloveimpact.com/impact
      
      using these credentials,
      
      ID -  ${adpId}
      Password -  ${password}
      
      Have you browsed our Hindi website yet! Check link below,
      
       www.iloveimpact.com/hindi
      
      
      Take help from your upline leaders and us, whenever you need.
      
      Inside yourself have faith that you have the inner strength, necessary ingredients, the qualities and the power to succeed as an IMPACT ADP. It’s not about money alone, it’s about bringing out the best in YOU and YOUR TEAM.
      
      Wish you Success at IMPACT!!!
      
      IMPACT TEAM`,
  };
  sendMail(options);
};

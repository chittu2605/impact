const {
  SELECT_BV_WEIGHTAGE_PLAN_MANAGEMENT,
} = require("../../adpQuery/planManagement/planManagement");
const connection = require("../../../dbConnect");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const getBvWeightageList = () =>
  new Promise((resolve, reject) =>
    connection.query(
      SELECT_BV_WEIGHTAGE_PLAN_MANAGEMENT(),
      async (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    )
  );

module.exports = (app) => {
  app.get("/adp/bv-weightage", urlencodedParser, async (req, res) => {
    const adpId = req.user.adp_id;
    try {
      const results = await getBvWeightageList();
      res.json({
        status: "success",
        results,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
};

module.exports.getBvWeightageList = getBvWeightageList;

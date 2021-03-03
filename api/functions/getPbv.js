const connection = require("../dbConnect");
const { GET_PBV_BY_ADP_ID, GET_ADP_GBV, IS_CHILD } = require("./query");

const getAdpPbv = (adpId) => {
  return new Promise(async (resolve, reject) => {
    connection.query(
      GET_PBV_BY_ADP_ID(adpId),
      async (error, results, fields) => {
        resolve(results);
      }
    );
  });
};

const checkIfChild = (childId, adpId) =>
  new Promise((resolve, reject) =>
    connection.query(IS_CHILD(childId, adpId), (error, results, fields) => {
      if (error) {
        console.log(error);
        resolve(false);
      } else if (results.length == 0) {
        resolve(false);
      } else {
        resolve(results[0].isChild);
      }
    })
  );

// connection.query(GET_ADP_GBV(adpId), async (error, results, fields) => {
//   if (results && results.length === 0)
//     resolve({
//       gbv,
//       totalGbv,
//     });
// })

const getAdpGbv = (adpId) => {
  return new Promise((resolve, reject) => {
    connection.query(GET_ADP_GBV(adpId), (error, results, fields) => {
      if (results && results.length === 0) {
        resolve({
          gbv,
          totalGbv,
        });
      } else {
        resolve(results[0]);
      }
    });
  });
};

const getAdpBv = (adpId) => {
  return new Promise((resolve, reject) => {
    getAdpPbv(adpId).then((pbvData) => {
      let pbv =
        pbvData && pbvData.length > 0 ? pbvData[0].current_month_pbv : 0;
      let pbvTillDate = pbvData && pbvData.length > 0 ? pbvData[0].pbv : 0;
      getAdpGbv(adpId).then((gbv) => {
        let bv = pbv + gbv.gbv;
        let bvTillDate = pbvTillDate + gbv.totalGbv;

        resolve({ bv, bvTillDate });
      });
    });
  });
};

module.exports = (app) => {
  const connection = require("../dbConnect");
  const jwt = require("jsonwebtoken");
  const bodyParser = require("body-parser");
  const urlencodedParser = bodyParser.urlencoded({ extended: false });

  app.get("/adp/pbv", urlencodedParser, async (req, res) => {
    const adpId = req.user.adp_id;

    getAdpPbv(adpId).then((results) => {
      res.json({
        status: "success",
        results,
      });
    });
  });

  app.get("/adp/gbv", urlencodedParser, async (req, res) => {
    try {
      const adpId = req.user.adp_id;
      getAdpGbv(adpId).then((result) => {
        res.json({
          ...result,
        });
      });
    } catch (error) {
      res.sendStatus(400);
    }
  });

  app.get("/adp/bv", urlencodedParser, async (req, res) => {
    try {
      const adpId = req.user.adp_id;
      getAdpBv(adpId).then((result) => {
        res.json({
          ...result,
        });
      });
    } catch (error) {
      res.sendStatus(400);
    }
  });

  app.get("/adp/adp-bv/:childId", urlencodedParser, async (req, res) => {
    try {
      const adpId = req.user.adp_id;
      const childId = req.params.childId;
      if (!adpId == childId && !(await checkIfChild(childId, adpId))) {
        res.sendStatus(404);
      } else {
        getAdpBv(childId).then((result) => {
          res.json({
            ...result,
          });
        });
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  });
};

module.exports.getAdpPbv = getAdpPbv;
module.exports.getAdpGbv = getAdpGbv;
module.exports.getAdpBv = getAdpBv;

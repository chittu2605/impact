const { GET_PLAN_ZONE, IS_SPRINT_QUALIFIED } = require("./query");
const connection = require("../dbConnect");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { getAdpPbv, getAdpBv } = require("./getPbv");

const getPlanZone = () => {
  return new Promise(async (resolve, reject) => {
    connection.query(GET_PLAN_ZONE(), async (error, results, fields) => {
      resolve(results);
    });
  });
};

const getSprintQualified = (adpId) =>
  new Promise((resolve, reject) => {
    connection.query(IS_SPRINT_QUALIFIED(adpId), (error, results, filelds) => {
      if (!error && results.length > 0) {
        resolve(results[0]);
      }
      resolve(false);
    });
  });

const getAdpZone = (adpId) => {
  return new Promise(async (resolve, reject) => {
    getAdpBv(adpId).then((bvData) => {
      getPlanZone().then((allZone) => {
        let zone = allZone.filter(async (elm, i) => {
          if (bvData.bvTillDate == 0 && elm.min_value == 1) {
            resolve(elm);
          } else if (
            bvData.bvTillDate >= elm.min_value &&
            (bvData.bvTillDate <= elm.max_value || elm.max_value == 0)
          ) {
            if (elm.min_value === 1) {
              try {
                const isSprintQualified = await getSprintQualified(adpId);
                if (isSprintQualified) {
                  elm = allZone[i + 1];
                }
              } catch (error) {
                console.log(error);
              }
            }
            resolve(elm);
          }
        });
      });
    });
  });
};

const getDeficitZone = (adpId) => {
  return new Promise(async (resolve, reject) => {
    getAdpBv(adpId).then((bvData) => {
      getPlanZone().then((allZone) => {
        let zone = allZone.filter(async (elm, i) => {
          if (
            bvData.bvTillDate >= elm.min_value &&
            bvData.bvTillDate <= elm.max_value
          ) {
            const adder =
              elm.min_value === 1 && (await getSprintQualified(adpId)) ? 2 : 1;
            let deficitZone = allZone[i + adder].name;
            let deficitValue = allZone[i + adder].min_value - bvData.bvTillDate;
            resolve({ deficitZone, deficitValue });
          } else if (bvData.bvTillDate >= elm.min_value && elm.max_value == 0) {
            resolve({ deficitZone: false });
          }
        });
      });
    });
  });
};

module.exports.app = (app) => {
  // getAdpZone(90395932).then((result) => {
  //   console.log(result)
  // })

  app.get("/adp/zone", urlencodedParser, async (req, res) => {
    try {
      const adpId = req.user.adp_id;
      getAdpZone(adpId).then((result) => {
        res.json({
          ...result,
        });
      });
    } catch (error) {
      res.send("error");
    }
  });

  app.get("/adp/all-zone", urlencodedParser, async (req, res) => {
    try {
      const adpId = req.user.adp_id;
      getPlanZone(adpId).then((result) => {
        res.json({
          ...result,
        });
      });
    } catch (error) {
      res.sendStatus(400);
    }
  });

  app.get("/adp/deficit-zone", urlencodedParser, async (req, res) => {
    try {
      const adpId = req.user.adp_id;
      getDeficitZone(adpId).then((result) => {
        res.json({
          ...result,
        });
      });
    } catch (error) {
      res.sendStatus(400);
    }
  });
};

module.exports.getAdpZone = getAdpZone;

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
        resolve(results[0].sprint_qualified);
      }
      resolve(false);
    });
  });

const getAdpZone = (adpId) => {
  return new Promise(async (resolve, reject) => {
    getAdpBv(adpId).then((bvData) => {
      getPlanZone().then(async (allZone) => {
        let i=0;
        for(let elm of allZone){
         if (
            bvData.bvTillDate >= elm.min_value &&
            (bvData.bvTillDate <= elm.max_value || elm.max_value == 0)
          ) {
            if (elm.min_value === 0) {
              try {
                const isSprintQualified = await getSprintQualified(adpId);
                if (isSprintQualified == 1) {
                  elm = allZone[i + 1];
                }
              } catch (error) {
                console.log(error);
              }
            }
            resolve(elm);
            break;
          }
          i++;
        }
      });
    });
  });
};

const getDeficitZone = (adpId) => {
  return new Promise(async (resolve, reject) => {
    getAdpBv(adpId).then((bvData) => {
      getPlanZone().then(async (allZone) => {
        let i=0;
        for (let elm of allZone) {
          if (
            bvData.bvTillDate >= elm.min_value &&
            bvData.bvTillDate <= elm.max_value
          ) {
            let adder =1
            if(elm.min_value===0){
              const sprintQualified = await getSprintQualified(adpId)
              if(sprintQualified == 1){
                ++adder;
              }
            }
              const deficitZone = allZone[i + adder].name;
              const deficitValue = allZone[i + adder].min_value - bvData.bvTillDate;
              resolve({ deficitZone, deficitValue })
              break;
          } else if (bvData.bvTillDate >= elm.min_value && elm.max_value == 0) {
            resolve({ deficitZone: false });
            break;
          }
          i++;
        }
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

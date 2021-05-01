const connection = require("../../../dbConnect");
const {
  GET_CYCLES,
  GET_ADP_DETAILS,
  GET_ADP_DETAILS_FOR_CYCLE,
  GET_ADP_PULL_DETAILS_FOR_CYCLE,
  GET_CHILD_DETAILS_FOR_CYCLE,
  GET_ADP_PULL_FROM_DETAILS_FOR_CYCLE,
} = require("../../adpQuery/statement/statement");

const getADPDetailsForCycle = (adpId, cycleId) =>
  new Promise((resolve, reject) =>
    connection.query(
      GET_ADP_DETAILS_FOR_CYCLE(adpId, cycleId),
      (error, results, field) => {
        if (error) {
          reject(error);
        } else if (results.length) {
          resolve(results[0]);
        }
      }
    )
  );

const getADPPullDetailsForCycle = (adpId, cycleId) =>
  new Promise((resolve, reject) =>
    connection.query(
      GET_ADP_PULL_DETAILS_FOR_CYCLE(adpId, cycleId),
      (error, results, field) => {
        if (error) {
          reject(error);
        } else if (results.length) {
          const returnArr = [];
          results.forEach((result) => {
            returnArr.push({
              adpId: result.to,
              name: result.firstname + " " + result.lastname,
              amount: result.amount,
            });
          });
          resolve(returnArr);
        }
      }
    )
  );

const getADPPullFromDetailsForCycle = (adpId, cycleId) =>
  new Promise((resolve, reject) =>
    connection.query(
      GET_ADP_PULL_FROM_DETAILS_FOR_CYCLE(adpId, cycleId),
      (error, results, field) => {
        if (error) {
          reject(error);
        } else if (results.length) {
          const returnArr = [];
          results.forEach((result) => {
            returnArr.push({
              adpId: result.to,
              name: result.firstname + " " + result.lastname,
              amount: result.amount,
            });
          });
          resolve(returnArr);
        }
      }
    )
  );

const getChildDetailsForCycle = (adpId, cycleId) =>
  new Promise((resolve, reject) =>
    connection.query(
      GET_CHILD_DETAILS_FOR_CYCLE(adpId, cycleId),
      (error, results, field) => {
        if (error) {
          reject(error);
        } else if (results.length) {
          resolve(results);
        } else {
          resolve([]);
        }
      }
    )
  );

module.exports = (app) => {
  app.get("/adp/get-cylces", (req, res) => {
    try {
      connection.query(GET_CYCLES(), (error, results) => {
        if (error) return res.sendStatus("401");
        const returnValue = [];
        results.forEach((cycle) => {
          returnValue.push({
            id: cycle.id,
            toDate: cycle.todate,
            pullThreshold: cycle.pull_threshold,
          });
        });
        res.json(returnValue);
      });
    } catch (error) {
      res.sendStatus(400);
    }
  });

  app.get("/adp/details", (req, res) => {
    try {
      const adpId = req.user.adp_id;
      connection.query(GET_ADP_DETAILS(adpId), (error, results) => {
        if (error) return res.sendStatus("401");
        res.json(results[0]);
      });
    } catch (error) {
      res.sendStatus(400);
    }
  });

  app.get("/adp/cycle/:id", async (req, res) => {
    try {
      const adpId = req.user.adp_id;
      const cycleId = req.params.id;
      const adpDetails = await getADPDetailsForCycle(adpId, cycleId);
      const childeDetails = await getChildDetailsForCycle(adpId, cycleId);
      res.json({ adpDetails, childeDetails });
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  });

  app.get("/adp/cyle-pull-data/:id", async (req, res) => {
    try {
      const adpId = req.user.adp_id;
      const cycleId = req.params.id;
      const adpPullDetails = await getADPPullDetailsForCycle(adpId, cycleId);
      res.json(adpPullDetails);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  });

  app.get("/adp/cyle-pull-from-data/:id", async (req, res) => {
    try {
      const adpId = req.user.adp_id;
      const cycleId = req.params.id;
      const adpPullDetails = await getADPPullFromDetailsForCycle(
        adpId,
        cycleId
      );
      res.json(adpPullDetails);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  });
};

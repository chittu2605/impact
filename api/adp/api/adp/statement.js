const connection = require("../../../dbConnect");
const {
  GET_CYCLES,
  GET_ADP_DETAILS,
  GET_ADP_DETAILS_FOR_CYCLE,
  GET_ADP_PULL_DETAILS_FOR_CYCLE,
  GET_CHILD_DETAILS_FOR_CYCLE,
  GET_ADP_PULL_FROM_DETAILS_FOR_CYCLE,
  GET_ALL_CYCLES,
  GET_CYCLE_INCOMES,
  GET_TOTAL_INCOMES,
} = require("../../adpQuery/statement/statement");

const getCycleIncomes = (cycleId, limit, count) =>
  new Promise((resolve, reject) =>
    connection.query(
      GET_CYCLE_INCOMES(cycleId, limit, count),
      (error, results, field) => {
        if (error) {
          reject(error);
        } else if (results.length) {
          resolve(results);
        }
      }
    )
  );

const getTotalIncomes = (cycleId) =>
  new Promise((resolve, reject) =>
    connection.query(GET_TOTAL_INCOMES(cycleId), (error, results, field) => {
      if (error) {
        reject(error);
      } else if (results.length) {
        resolve(results[0]);
      }
    })
  );

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
      connection.query(GET_CYCLES(req.user.adp_id), (error, results) => {
        if (error) return res.sendStatus("401");
        const returnValue = [];
        results.forEach((cycle) => {
          returnValue.push({
            id: cycle.id,
            toDate: cycle.todate.toLocaleString(),
            pullThreshold: cycle.pull_threshold,
          });
        });
        res.json(returnValue);
      });
    } catch (error) {
      res.sendStatus(400);
    }
  });

  app.get("/admin/get-all-cylces", (req, res) => {
    try {
      connection.query(GET_ALL_CYCLES(), (error, results) => {
        if (error) return res.sendStatus("401");
        const returnValue = [];
        results.forEach((cycle) => {
          returnValue.push({
            id: cycle.id,
            toDate: cycle.todate.toLocaleString(),
            pullThreshold: cycle.pull_threshold,
          });
        });
        res.json(returnValue);
      });
    } catch (error) {
      res.sendStatus(400);
    }
  });

  app.get("/admin/get-total-incomes/:cycle_id", async (req, res) => {
    try {
      const cycleId = req.params.cycle_id;
      const totalIncomes = await getTotalIncomes(cycleId);
      res.json(totalIncomes);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  });

  app.get(
    "/admin/get-cycle-incomes/:cycle_id/:page/:count",
    async (req, res) => {
      try {
        const cycleId = req.params.cycle_id;
        const page = req.params.page;
        const count = req.params.count;
        const incomeDetails = await getCycleIncomes(
          cycleId,
          page * count,
          count
        );
        res.json(incomeDetails);
      } catch (error) {
        console.log(error);
        res.sendStatus(400);
      }
    }
  );

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

  app.get(
    "/admin/adp-statement-details/:adp_id/:cycle_id",
    async (req, res) => {
      try {
        const adpId = req.params.adp_id;
        const cycleId = req.params.cycle_id;
        const adpDetails = await getADPDetailsForCycle(adpId, cycleId);
        const childeDetails = await getChildDetailsForCycle(adpId, cycleId);
        res.json({ adpDetails, childeDetails });
      } catch (error) {
        console.log(error);
        res.sendStatus(400);
      }
    }
  );

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

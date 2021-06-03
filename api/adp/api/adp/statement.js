const connection = require("../../../dbConnect");
const excel = require("exceljs");
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

const getCycleIncomes = (includeZero, cycleId, limit, count) =>
  new Promise((resolve, reject) =>
    connection.query(
      GET_CYCLE_INCOMES(includeZero, cycleId, limit, count),
      (error, results, field) => {
        if (error) {
          reject(error);
        } else if (results.length) {
          resolve(results);
        }
      }
    )
  );

const getTotalIncomes = (cycleId, includeZero) =>
  new Promise((resolve, reject) =>
    connection.query(
      GET_TOTAL_INCOMES(cycleId, includeZero),
      (error, results, field) => {
        if (error) {
          reject(error);
        } else if (results.length) {
          resolve(results[0]);
        }
      }
    )
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

  app.get(
    "/admin/get-total-incomes/:cycle_id/:includeZero",
    async (req, res) => {
      try {
        const cycleId = req.params.cycle_id;
        const includeZero = req.params.includeZero;
        const totalIncomes = await getTotalIncomes(cycleId, includeZero);
        res.json(totalIncomes);
      } catch (error) {
        console.log(error);
        res.sendStatus(400);
      }
    }
  );

  app.get(
    "/admin/get-cycle-incomes/:cycle_id/:includeZero/:page/:count",
    async (req, res) => {
      try {
        const cycleId = req.params.cycle_id;
        const page = req.params.page;
        const count = req.params.count;
        const includeZero = req.params.includeZero;
        const incomeDetails = await getCycleIncomes(
          includeZero,
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

  app.get("/admin/download-statement/:cycleId", async (req, res) => {
    try {
      const cycleId = req.params.cycleId;
      const cycleIncomes = await getCycleIncomes(false, cycleId, -1);
      var workbook1 = new excel.Workbook();
      workbook1.creator = "Admin";
      workbook1.lastModifiedBy = "Admin";
      workbook1.created = new Date();
      workbook1.modified = new Date();
      var sheet1 = workbook1.addWorksheet("Income Statement");
      sheet1.columns = [
        { header: "ADP Name", key: "name", width: 32 },
        { header: "Mobile", key: "mobile", width: 12 },
        { header: "Bank Name", key: "bank", width: 32 },
        { header: "Account Number", key: "account", width: 20 },
        { header: "Branch", key: "branch", width: 60 },
        { header: "IFSC Code", key: "ifsc", width: 10 },
        { header: "Commision", key: "commision", width: 10 },
      ];
      cycleIncomes.forEach((income) => {
        sheet1.addRow({
          name: `${income.firstname} ${income.lastname}`,
          mobile: income.mobile,
          bank: income.bank_name,
          account: income.account_no,
          branch: income.branch,
          ifsc: income.ifs_code,
          commision:
            income.total_income +
            income.co_sponsor_royality +
            income.prev_cycle_income,
        });
      });
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "Report.xlsx"
      );
      await workbook1.xlsx.write(res);
      res.end();
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  });
};

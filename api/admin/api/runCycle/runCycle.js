const {
  GET_PREV_CYCLE,
  UPDATE_CURRENT_PBV,
  UPDATE_SPRINT_QUALIFIED,
  ADD_VOUCHER,
} = require("../../dbQuery/adp/adpQuery");

const connection = require("../../../dbConnect");
const {
  getEligibleSprinters,
  getEligibleSprintIDs,
  getADPMissingSPrint,
} = require("../../../functions/sprinter");
const {
  generateVoucher,
  updateCycleHistory,
  expireCards,
  getAdpCount,
  getTotalOverflowRecords,
  getOnePlusAdpCount,
  adjustPull,
} = require("../../../functions/runCycleHelper");

const {
  getMonthlyMoney,
  getChampionPoints,
  getChampionFundPercent,
  getOnePlusFundPercent,
  getTotalOnePlusCards,
  getLeadersPoints,
  getLeadersFundPercent,
} = require("../stats/stats");
const { getAdpZone } = require("../../../functions/zone");
const { getAdpPbv, getAdpBv } = require("../../../functions/getPbv");
const {
  copyAdpToHistory,
  adjustOverflow,
  adjustLeadersClub,
  adjustChampionsClub,
  createOnePlusEarnings,
  adjustOnePlusEarnings,
} = require("./threadManager");

const getPrevRunCycle = () => {
  return new Promise((resolve, reject) => {
    connection.query(GET_PREV_CYCLE(), (error, result, fields) => {
      if (!error) {
        if (result[0]) {
          resolve(result[0]);
        }
        resolve("");
      } else {
        reject(error);
      }
    });
  });
};

const createVouchers = (eligibleSprinterIDs, voucherType) => {
  eligibleSprinterIDs.forEach(async (adpId) => {
    const coupon = await generateVoucher();
    connection.query(
      ADD_VOUCHER(adpId, coupon, voucherType, null),
      (error, results, fields) => {
        if (error) {
          console.log(error);
        }
      }
    );
  });
};

const generateSprinterVouchers = (sprinters) =>
  sprinters.forEach((sprinter) => {
    for (let i = 0; i < sprinter.noVouchers; i++) {
      createVouchers([sprinter.sprinterId], "SPRINTER");
    }
  });

const updateSprintQualifiedFlag = (adpIds) => {
  if (adpIds && adpIds.length) {
    connection.query(
      UPDATE_SPRINT_QUALIFIED(adpIds),
      adpIds,
      (error, results, flag) => console.log(error)
    );
  }
};

const updateCurrentPbv = () => {
  connection.query(UPDATE_CURRENT_PBV(), (error, results, flag) =>
    console.log(error)
  );
};

module.exports = (app) => {
  app.post("/admin/run-cycle", async (req, res) => {
    try {
      if (eligibleSprintIDs) {
        createVouchers(eligibleSprintIDs, "SPRINT");
      }
      if (eligibleSprinters) {
        generateSprinterVouchers(eligibleSprinters);
      }
      if (eligibleSprintIDs || adpMissingSprint) {
        updateSprintQualifiedFlag([...eligibleSprintIDs, ...adpMissingSprint]);
      }
      const prevCycleId = (await getPrevRunCycle()).id;
      const cycleId = await updateCycleHistory();
      const totalRecords = await getAdpCount();
      console.log("start at", new Date());
      await copyAdpToHistory(cycleId, totalRecords);
      const totalOverFlowRecords = await getTotalOverflowRecords(prevCycleId);
      await adjustOverflow(prevCycleId, cycleId, totalOverFlowRecords);
      const monthMoney = await getMonthlyMoney();
      const leaderPoints = await getLeadersPoints();
      const leadersPercent = await getLeadersFundPercent();
      await adjustLeadersClub(
        cycleId,
        monthMoney,
        leaderPoints,
        leadersPercent
      );
      const championPoints = await getChampionPoints(1);
      const championPercent = await getChampionFundPercent();
      await adjustChampionsClub(
        cycleId,
        monthMoney,
        championPoints,
        championPercent
      );
      const onePlusPercent = await getOnePlusFundPercent();
      const onePlusCardsTotal = await getTotalOnePlusCards();
      await createOnePlusEarnings(
        cycleId,
        monthMoney,
        onePlusCardsTotal,
        onePlusPercent
      );
      const totalOnePlusAdp = await getOnePlusAdpCount(cycleId);
      await adjustOnePlusEarnings(cycleId, totalOnePlusAdp);
      await expireCards(cycleId);
      await adjustPull(cycleId);
      const eligibleSprintIDs = await getEligibleSprintIDs();
      const eligibleSprinters = await getEligibleSprinters(eligibleSprintIDs);
      const adpMissingSprint = await getADPMissingSPrint();
      await updateCurrentPbv();
      console.log("end at", new Date());
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get("/admin/prev-cycle-end-date", async (req, res) => {
    const prevCycle = await getPrevRunCycle();
    res.status(200);
    if (prevCycle.todate) {
      res.send(
        `${prevCycle.todate.getFullYear()}-${
          prevCycle.todate.getMonth() + 1
        }-${prevCycle.todate.getDate()}`
      );
    } else {
      res.send("Not Available");
    }
  });
};

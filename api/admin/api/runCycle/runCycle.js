const {
  GET_PREV_CYCLE_DATE,
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
  getAllADP,
  getCoSponsorRoyality,
  getChampionEarnings,
  generateVoucher,
  getOnePlusEarnings,
  updateCycleHistory,
  insertCycleRows,
  expireCards,
  getCoSponsoredNo,
  getLeadersEarnings,
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
const { getAdpBv, getAdpGbv } = require("../../../functions/getPbv");
const updateCycleData = async () => {
  const monthMoney = await getMonthlyMoney();
  const championPoints = await getChampionPoints();
  const chapionPercent = await getChampionFundPercent();
  const onePlusPercent = await getOnePlusFundPercent();
  const onePlusCardsTotal = await getTotalOnePlusCards();
  const leadersPoints = await getLeadersPoints();
  const leadersPercent = await getLeadersFundPercent();
  const adpList = await getAllADP();
  const cycleId = await updateCycleHistory(8, 11000, 11000, 25000, 60);
  const dbRows = [];
  await Promise.all(
    adpList.map(async (adp, index) => {
      const adpZone = await getAdpZone(adp);
      const zoneValue = adpZone.value;
      const bv = await getAdpBv(adp);
      const gbv = await getAdpGbv(adp);
      const coSponsoredNo = await getCoSponsoredNo(adp);
      const coSponsorRoyality = await getCoSponsorRoyality(adp);
      const championEarnings = await getChampionEarnings(
        monthMoney,
        adp,
        championPoints,
        chapionPercent
      );
      const onePlusEarnings =
        coSponsoredNo > 2
          ? await getOnePlusEarnings(
              monthMoney,
              adp,
              onePlusPercent,
              onePlusCardsTotal
            )
          : 0;
      const leadersEarnings = await getLeadersEarnings(
        monthMoney,
        adp,
        leadersPoints,
        leadersPercent
      );
      dbRows.push([
        adp,
        zoneValue,
        bv.bv,
        coSponsorRoyality,
        championEarnings,
        onePlusEarnings,
        leadersEarnings,
        cycleId,
        coSponsoredNo,
      ]);
    })
  );
  insertCycleRows(dbRows);
  await expireCards(cycleId);
  await updateCurrentPbv();
};
const getPrevRunCycleDate = () => {
  return new Promise((resolve, reject) => {
    connection.query(GET_PREV_CYCLE_DATE(), (error, result, fields) => {
      if (!error) {
        if (result[0]) {
          resolve(result[0].todate);
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
    connection.query(ADD_VOUCHER(adpId, coupon, voucherType, null));
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
    const eligibleSprintIDs = await getEligibleSprintIDs();
    const eligibleSprinters = await getEligibleSprinters(eligibleSprintIDs);
    const adpMissingSprint = await getADPMissingSPrint();
    if (eligibleSprintIDs) {
      createVouchers(eligibleSprintIDs, "SPRINT");
    }
    if (eligibleSprinters) {
      generateSprinterVouchers(eligibleSprinters);
    }
    if (eligibleSprintIDs || adpMissingSprint) {
      updateSprintQualifiedFlag([...eligibleSprintIDs, ...adpMissingSprint]);
    }
    await updateCycleData();
    res.status(200);
    res.send("success");
  });

  app.get("/admin/prev-cycle-end-date", async (req, res) => {
    const endDate = await getPrevRunCycleDate();
    res.status(200);
    if (endDate) {
      res.send(
        `${endDate.getFullYear()}-${
          endDate.getMonth() + 1
        }-${endDate.getDate()}`
      );
    } else {
      res.send("Not Available");
    }
  });
};

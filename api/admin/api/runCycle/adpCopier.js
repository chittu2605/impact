const { parentPort, workerData } = require("worker_threads");
const { getAdpPbv, getAdpBv } = require("../../../functions/getPbv");
const {
  getAllADP,
  insertCycleRows,
  getCoSponsorRoyality,
  getCoSponsoredNo,
  getIncomeFromChild,
} = require("../../../functions/runCycleHelper");
const { getAdpZone } = require("../../../functions/zone");
const offSet = workerData.offset;
const copyAdp = async () => {
  try {
    const allAdp = await getAllADP(offSet, workerData.rowCount);
    const dbRows = [];
    for (adp of allAdp) {
      const zoneValue = (await getAdpZone(adp)).value;
      const pbv = await getAdpPbv(adp);
      let currMonthPbv = pbv && pbv.length > 0 ? pbv[0].current_month_pbv : 0;
      const bv = (await getAdpBv(adp)).bv;
      let overflow = 0;
      if (currMonthPbv < 500) {
        overflow = currMonthPbv;
      }
      const coSponsoredNo = await getCoSponsoredNo(adp);
      const coSponsorRoyality = await getCoSponsorRoyality(adp);
      const incomeFromChildBv = await getIncomeFromChild(adp, zoneValue);
      dbRows.push([
        adp,
        workerData.cycleId,
        zoneValue,
        currMonthPbv,
        bv,
        overflow,
        coSponsoredNo,
        coSponsorRoyality,
        incomeFromChildBv,
        Math.round((currMonthPbv * zoneValue) / 100) + incomeFromChildBv,
      ]);
    }
    if (dbRows.length > 0) {
      await insertCycleRows(dbRows);
    }
  } catch (error) {
    console.log(error);
  }
  parentPort.postMessage(offSet);
};
copyAdp();

const { parentPort, workerData } = require("worker_threads");
const { UPDATE_CYCLE_RECORD } = require("../../../functions/query");
const {
  getCycleItem,
  updateCycleRecords,
} = require("../../../functions/runCycleHelper");
const { getChampionQualifiers } = require("../stats/stats");
const offSet = workerData.offset;
const calculateChampionClubEarnings = async () => {
  try {
    const qualifiers = await getChampionQualifiers(
      offSet,
      workerData.rowCount,
      1
    );
    const dbStatements = [];
    for (qualifier of qualifiers) {
      const cycleRecord = await getCycleItem(
        workerData.cycleId,
        qualifier.adp_id
      );
      const availableAmount =
        workerData.monthMoney * (workerData.championPercent / 100);
      const amtPerPoint = availableAmount / workerData.championPoints;

      let adpPoints =
        qualifier.current_month_pbv >= 5000 ? qualifier.current_month_pbv : 0;
      adpPoints +=
        qualifier.current_month_gbv >= 12000 && qualifier.new_co_sponsored > 4
          ? qualifier.current_month_gbv
          : 0;
      const championEarnings = Math.round(amtPerPoint * adpPoints);
      const updateStatement = UPDATE_CYCLE_RECORD(
        cycleRecord.id,
        ["champion_earnings", "total_income"],
        [championEarnings, cycleRecord.total_income + championEarnings]
      );
      dbStatements.push(updateStatement);
    }
    if (dbStatements.length > 0) {
      await updateCycleRecords(dbStatements);
    }
  } catch (error) {
    console.log(error);
  }
  parentPort.postMessage(offSet);
};
calculateChampionClubEarnings();

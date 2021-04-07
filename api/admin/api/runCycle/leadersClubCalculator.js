const { parentPort, workerData } = require("worker_threads");
const { UPDATE_CYCLE_RECORD } = require("../../../functions/query");
const {
  getCycleItem,
  updateCycleRecords,
} = require("../../../functions/runCycleHelper");
const { getLeadersQualifiers } = require("../stats/stats");

const offSet = workerData.offset;

const calculateLeadersClubEarnings = async () => {
  try {
    const qualifiers = await getLeadersQualifiers(offSet, workerData.rowCount);
    const dbStatements = [];
    for (qualifier of qualifiers) {
      const cycleRecord = await getCycleItem(
        workerData.cycleId,
        qualifier.adp_id
      );
      const availableAmount =
        workerData.monthMoney * (workerData.leadersPercent / 100);
      const amtPerPoint = availableAmount / workerData.leadersPoints;
      const leadersEarnings = Math.round(amtPerPoint * qualifier.line1_bv);
      const updateStatement = UPDATE_CYCLE_RECORD(
        cycleRecord.id,
        ["leaders_earnings", "total_income"],
        [leadersEarnings, cycleRecord.total_income + leadersEarnings]
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
calculateLeadersClubEarnings();

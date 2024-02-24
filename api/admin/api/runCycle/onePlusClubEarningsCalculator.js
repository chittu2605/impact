const { parentPort, workerData } = require("worker_threads");
const { UPDATE_CYCLE_RECORD } = require("../../../functions/query");
const {
  getCycleItem,
  updateCycleRecords,
  getCardEarnings,
} = require("../../../functions/runCycleHelper");

const offSet = workerData.offset;
const cycleId = workerData.cycleId;

const calculateOnePlusClubEarnings = async () => {
  try {
    const qualifiers = await getCardEarnings(
      cycleId,
      offSet,
      workerData.rowCount
    );
    const dbStatements = [];
    for (qualifier of qualifiers) {
      const cycleRecord = await getCycleItem(cycleId, qualifier.adp_id);
      const updateStatement = UPDATE_CYCLE_RECORD(
        cycleRecord.id,
        ["oneplus_earnings", "total_income"],
        [
          qualifier.earnings,
          cycleRecord.total_income + Number(qualifier.earnings),
        ]
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
calculateOnePlusClubEarnings();

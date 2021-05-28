const { parentPort, workerData } = require("worker_threads");
const { UPDATE_CYCLE_RECORD } = require("../../../functions/query");
const {
  getOverflowItems,
  getCycleItem,
  updateCycleRecords,
} = require("../../../functions/runCycleHelper");

const offSet = workerData.offset;

const calculateOverflow = async () => {
  try {
    const overFlowItems = await getOverflowItems(
      workerData.prevCycleId,
      offSet,
      workerData.rowCount
    );
    const dbStatements = [];
    for (overFlowItem of overFlowItems) {
      const cycleRecord = await getCycleItem(
        workerData.cycleId,
        overFlowItem.adp_id
      );
      let totalOverflow = cycleRecord.pbv + overFlowItem.overflow;
      if (totalOverflow >= 500) {
        totalOverflow = 0;
      }
      const prevCycleIncome =
        overFlowItem.total_income +
        overFlowItem.prev_cycle_income +
        overFlowItem.co_sponsor_royality;
      const updateStatement = UPDATE_CYCLE_RECORD(
        cycleRecord.id,
        ["prev_cycle_income", "overflow"],
        [prevCycleIncome, totalOverflow]
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
calculateOverflow();

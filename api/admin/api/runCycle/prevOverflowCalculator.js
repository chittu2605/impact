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
      let totalPbv =
        cycleRecord.pbv + cycleRecord.overflow + overFlowItem.overflow;
      let overFlow = 0;
      if (totalPbv < 500) {
        overFlow = totalPbv;
        totalPbv = 0;
      }
      const updateStatement = UPDATE_CYCLE_RECORD(
        cycleRecord.id,
        ["pbv", "overflow", "total_income"],
        [
          totalPbv,
          overFlow,
          cycleRecord.income_from_child +
            Math.round((totalPbv * cycleRecord.zone_value) / 100),
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
calculateOverflow();

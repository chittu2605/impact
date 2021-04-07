const { Worker } = require("worker_threads");

const runThread = (totalRecords, fileLoc, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const recordsPerThread = 100;
      let recordsTracker = 0;
      for (
        let initialCount = 0;
        initialCount <= totalRecords;
        initialCount += recordsPerThread
      ) {
        const worker = new Worker(fileLoc, {
          workerData: {
            offset: initialCount,
            rowCount: recordsPerThread,
            ...data,
          },
        });
        recordsTracker++;
        worker.on("message", () => {
          recordsTracker--;
          if (recordsTracker == 0) {
            resolve(true);
          }
        });
      }
    } catch (error) {
      reject(error);
    }
  });

const copyAdpToHistory = async (cycleId, totalRecords) => {
  await runThread(totalRecords, "./admin/api/runCycle/adpCopier.js", {
    cycleId,
  });
};

const adjustOverflow = async (prevCycleId, cycleId, totalRecords) => {
  await runThread(
    totalRecords,
    "./admin/api/runCycle/prevOverflowCalculator.js",
    { prevCycleId, cycleId }
  );
};

const adjustLeadersClub = async (
  cycleId,
  monthMoney,
  leadersPoints,
  leadersPercent
) => {
  await runThread(
    leadersPoints.total_count,
    "./admin/api/runCycle/leadersClubCalculator.js",
    {
      cycleId,
      monthMoney,
      leadersPoints: leadersPoints.total_points,
      leadersPercent,
    }
  );
};

const adjustChampionsClub = async (
  cycleId,
  monthMoney,
  championPoints,
  championPercent
) => {
  await runThread(
    championPoints.total_count,
    "./admin/api/runCycle/championClubCalculator.js",
    {
      cycleId,
      monthMoney,
      championPoints: championPoints.total_points,
      championPercent,
    }
  );
};

const createOnePlusEarnings = async (
  cycleId,
  monthMoney,
  onePlusCardsTotal,
  onePlusPercent
) => {
  await runThread(
    onePlusCardsTotal.no_rows,
    "./admin/api/runCycle/onePlusClubEarningsCreator.js",
    {
      cycleId,
      monthMoney,
      onePlusCardsTotal,
      onePlusPercent,
    }
  );
};

const adjustOnePlusEarnings = async (cycleId, totalOnePlusAdp) => {
  await runThread(
    totalOnePlusAdp,
    "./admin/api/runCycle/onePlusClubEarningsCalculator.js",
    {
      cycleId,
    }
  );
};

exports.copyAdpToHistory = copyAdpToHistory;
exports.adjustOverflow = adjustOverflow;
exports.adjustLeadersClub = adjustLeadersClub;
exports.adjustChampionsClub = adjustChampionsClub;
exports.createOnePlusEarnings = createOnePlusEarnings;
exports.adjustOnePlusEarnings = adjustOnePlusEarnings;

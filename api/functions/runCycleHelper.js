const e = require("express");
const { GET_CHILD_ADP } = require("../adp/adpQuery/adp/adp");
const connection = require("../dbConnect");
const { getAdpBv } = require("./getPbv");
const {
  GET_ALL_ADP,
  GET_CO_SPONSOR_ROYALITY,
  IS_COUPON_EXISTS,
  ADD_VOUCHER,
  INSERT_CYCLE_ROWS,
  INSERT_CYCLE_DATE,
  EXPIRE_CARDS,
  GET_COSPONSORED_NO,
  GET_LEADERS_DATA_FOR_ADP,
  GET_ADP_COUNT,
  GET_CYCLE_ITEM,
  GET_TOTAL_OVERFLOW_RECORDS,
  GET_PBV_OVERFLOW_ITEMS,
  GET_ONE_PLUS_ADP_COUNT,
  GET_CARD_EARNINGS,
  UPDATE_CYCLE_RECORD,
  GET_MAX_PULL_ADP_EARNING,
  GET_ADP_WITH_PULL,
  GET_ADP_CHILD_FOR_PULL,
  GET_CYCLE_DATE_RECORD,
  UPDATE_CYCLE_PULL_OVERFLOW,
  INSERT_UPDATE_PULL,
} = require("./query");
const { getAdpZone } = require("./zone");

const getAllADP = (offset, rowCount) =>
  new Promise((resolve, reject) =>
    connection.query(
      GET_ALL_ADP(offset, rowCount),
      async (error, results, fields) => {
        if (!error && results.length > 0) {
          let adpIds = [];
          await results.forEach((result) => adpIds.push(result.adp_id));
          resolve(adpIds);
        } else {
          reject(error);
        }
      }
    )
  );

const getCycleReport = (offset, rowCount, cycleId) =>
  new Promise((resolve, reject) =>
    connection.query(
      GET_CYCLE_REPORT(offset, rowCount, cycleId),
      async (error, results, fields) => {
        if (!error && results.length > 0) {
          resolve(results);
        } else {
          reject(error);
        }
      }
    )
  );

const getCoSponsoredNo = (adpId) =>
  new Promise((resolve, rejsct) =>
    connection.query(
      GET_COSPONSORED_NO(adpId),
      async (error, results, fields) => {
        if (!error && results.length > 0) {
          resolve(results[0].co_sponsored_no);
        } else {
          reject(error);
        }
      }
    )
  );

const getCoSponsorRoyality = (adpId) =>
  new Promise((resolve, reject) =>
    connection.query(
      GET_CO_SPONSOR_ROYALITY(adpId),
      (error, results, fields) => {
        if (!error && results.length > 0) {
          resolve(Math.round((results[0].co_sponsor_royality * 8) / 100));
        } else {
          reject(error);
        }
      }
    )
  );

const generateVoucher = () =>
  new Promise(async (resolve, reject) => {
    const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    let coupon;
    do {
      coupon = "";
      for (var i = 0; i < 8; i++) {
        coupon += possible.charAt(Math.floor(Math.random() * possible.length));
      }
    } while (await isCouponExists(coupon));
    resolve(coupon);
  });

const addBlueCardVoucher = (adpId, amount) =>
  new Promise(async (resolve, reject) => {
    const coupon = await generateVoucher();
    connection.query(
      ADD_VOUCHER(adpId, coupon, "BLUE_CARD", amount),
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.insertId);
        }
      }
    );
  });

const getOnePlusAdpCount = (cycleId) =>
  new Promise(async (resolve, reject) => {
    connection.query(GET_ONE_PLUS_ADP_COUNT(cycleId), (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].count);
      }
    });
  });

const getCardEarnings = (cycleId, limit, rowCount) =>
  new Promise(async (resolve, reject) => {
    connection.query(
      GET_CARD_EARNINGS(cycleId, limit, rowCount),
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });

const isCouponExists = (coupon) => {
  return new Promise((resolve, reject) => {
    connection.query(IS_COUPON_EXISTS(coupon), (error, result) => {
      if (!error) {
        resolve(result[0].isExists);
      } else {
        reject(error);
      }
    });
  });
};

const getLeadersDataForAdp = (adpId) =>
  new Promise((resolve, reject) =>
    connection.query(
      GET_LEADERS_DATA_FOR_ADP(adpId),
      (error, results, fields) => {
        if (!error && results.length > 0) {
          resolve(results);
        } else if (!error) {
          resolve(null);
        } else {
          reject(error);
        }
      }
    )
  );
const getFrontLines = (adpId) =>
  new Promise((resolve, reject) =>
    connection.query(GET_CHILD_ADP(adpId), (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    })
  );

const getIncomeFromChild = async (adpId, zoneValue) => {
  let income = 0;
  const children = await getFrontLines(adpId);
  for (child of children) {
    const childZone = (await getAdpZone(child.adp_id)).value;
    const bv = (await getAdpBv(child.adp_id)).bv;
    income += Math.round(
      zoneValue > childZone ? bv * ((zoneValue - childZone) / 100) : 0
    );
  }
  return income;
};

const insertCycleRows = (rows) =>
  new Promise((resolve, reject) =>
    connection.query(INSERT_CYCLE_ROWS(), [rows], (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    })
  );

const updateCycleHistory = () =>
  new Promise((resolve, reject) =>
    connection.query(INSERT_CYCLE_DATE(), (error, result, flag) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.insertId);
      }
    })
  );

const expireCards = (cycleId) =>
  new Promise((resolve, reject) =>
    connection.query(EXPIRE_CARDS(cycleId), (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    })
  );

const getAdpCount = () =>
  new Promise((resolve, reject) => {
    connection.query(GET_ADP_COUNT(), (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].count);
      }
    });
  });

const getOverflowItems = (prevCycleId, offset, rowCount) =>
  new Promise((resolve, reject) => {
    connection.query(
      GET_PBV_OVERFLOW_ITEMS(prevCycleId, offset, rowCount),
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });

const getCycleItem = (cycleId, adpId) =>
  new Promise((resolve, reject) => {
    connection.query(GET_CYCLE_ITEM(cycleId, adpId), (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });

const updateCycleRecords = (rows) =>
  new Promise((resolve, reject) => {
    connection.query(rows.join(";") + ";", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });

const getTotalOverflowRecords = (prevCycleId) =>
  new Promise((resolve, reject) =>
    connection.query(
      GET_TOTAL_OVERFLOW_RECORDS(prevCycleId),
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0].count);
        }
      }
    )
  );

const adjustPull = (cycleId) =>
  new Promise(async (resolve, reject) => {
    try {
      const maxAdpEarning = await getMaxAdpEarningForPull();
      const cycleDateRecord = await getCycleDateRecord(cycleId);
      let adpWithPullIncome = await getAdpWithPullIncome(cycleId);
      while (adpWithPullIncome.length != 0) {
        const dbStatements = [];
        for (adp of adpWithPullIncome) {
          const adpRecord = await getCycleItem(cycleId, adp.adp_id);
          const eligibleChilds = await getPullEligibelChilds(adp.adp_id, 1, 10);
          const pullAmt = adpRecord.total_income - maxAdpEarning;
          let remainigAmt = pullAmt;
          for (let [index, child] of eligibleChilds.entries()) {
            const cycleRecord = await getCycleItem(cycleId, child.adp_id);
            const percent = getPullPrecentForIndex(index);
            const childPullIncome = Math.round(pullAmt * (percent / 100));
            const updateStatement = UPDATE_CYCLE_RECORD(
              cycleRecord.id,
              ["pull_income", "total_income"],
              [
                cycleRecord.pull_income + childPullIncome,
                cycleRecord.total_income + childPullIncome,
              ]
            );
            const isnertUpdatePull = INSERT_UPDATE_PULL(
              cycleId,
              adp.adp_id,
              child.adp_id,
              childPullIncome
            );
            await updateCycleRecords([updateStatement, isnertUpdatePull]);
            remainigAmt -= childPullIncome;
          }
          if (remainigAmt > 1) {
            await updateCyclePullOverflow(
              cycleDateRecord.pull_overflow + remainigAmt,
              cycleId
            );
          }
          const updateStatement = UPDATE_CYCLE_RECORD(
            adpRecord.id,
            ["total_income"],
            [maxAdpEarning]
          );
          dbStatements.push(updateStatement);
        }
        if (dbStatements.length > 0) {
          await updateCycleRecords(dbStatements);
        }
        adpWithPullIncome = await getAdpWithPullIncome(cycleId);
      }
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

const getCycleDateRecord = (cycleId) =>
  new Promise((resolve, reject) =>
    connection.query(GET_CYCLE_DATE_RECORD(cycleId), (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    })
  );

const getMaxAdpEarningForPull = () =>
  new Promise((resolve, reject) =>
    connection.query(GET_MAX_PULL_ADP_EARNING(), (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].max_value);
      }
    })
  );

const getAdpWithPullIncome = (cycleId) =>
  new Promise((resolve, reject) =>
    connection.query(GET_ADP_WITH_PULL(cycleId), (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    })
  );

const getPullEligibelChilds = (adpId, cycleOffset, noRecords) =>
  new Promise((resolve, reject) =>
    connection.query(
      GET_ADP_CHILD_FOR_PULL(adpId, cycleOffset, noRecords),
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    )
  );

const updateCyclePullOverflow = (amount, cycleId) =>
  new Promise((resolve, reject) =>
    connection.query(
      UPDATE_CYCLE_PULL_OVERFLOW(amount, cycleId),
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      }
    )
  );

const getPullPrecentForIndex = (index) => {
  if (index === 0) return 20;
  else if (index < 3) return 15;
  else if (index < 5) return 10;
  else if (index < 7) return 7.5;
  else if (index < 10) return 5;
};

module.exports.getAllADP = getAllADP;
module.exports.getCoSponsorRoyality = getCoSponsorRoyality;
module.exports.generateVoucher = generateVoucher;
module.exports.insertCycleRows = insertCycleRows;
module.exports.updateCycleHistory = updateCycleHistory;
module.exports.expireCards = expireCards;
module.exports.getCoSponsoredNo = getCoSponsoredNo;
module.exports.getLeadersDataForAdp = getLeadersDataForAdp;
module.exports.getAdpCount = getAdpCount;
module.exports.getCycleReport = getCycleReport;
module.exports.getTotalOverflowRecords = getTotalOverflowRecords;
module.exports.getOverflowItems = getOverflowItems;
module.exports.getCycleItem = getCycleItem;
module.exports.updateCycleRecords = updateCycleRecords;
module.exports.addBlueCardVoucher = addBlueCardVoucher;
module.exports.getOnePlusAdpCount = getOnePlusAdpCount;
module.exports.getCardEarnings = getCardEarnings;
module.exports.getIncomeFromChild = getIncomeFromChild;
module.exports.adjustPull = adjustPull;
module.exports.getPullEligibelChilds = getPullEligibelChilds;

const connection = require("../dbConnect");
const {
  GET_ALL_ADP,
  GET_CO_SPONSOR_ROYALITY,
  GET_CHAMPION_DATA_FOR_ADP,
  IS_COUPON_EXISTS,
  ADD_VOUCHER,
  GET_TOTAL_CARDS_FOR_ADP,
  GET_BLUE_CARDS_FOR_ADP,
  INSERT_CYCLE_ROWS,
  INSERT_CYCLE_DATE,
  EXPIRE_CARDS,
  GET_COSPONSORED_NO,
  GET_LEADERS_DATA_FOR_ADP,
} = require("./query");

const getAllADP = () =>
  new Promise((resolve, rejsct) =>
    connection.query(GET_ALL_ADP(), async (error, results, fields) => {
      if (!error && results.length > 0) {
        let adpIds = [];
        await results.forEach((result) => adpIds.push(result.adp_id));
        resolve(adpIds);
      } else {
        reject(error);
      }
    })
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
          resolve(results[0].co_sponsor_royality);
        } else {
          reject(error);
        }
      }
    )
  );

const getChampionEarnings = (
  monthMoney,
  adpId,
  championPoints,
  chapionPercent
) =>
  new Promise(async (resolve, reject) => {
    const championData = await getChampionDataForAdp(adpId);
    if (championData) {
      const availableAmount = monthMoney * (chapionPercent / 100);
      const amtPerPoint = availableAmount / championPoints;
      let adpPoints =
        championData.current_month_pbv >= 5000
          ? championData.current_month_pbv
          : 0;
      adpPoints += championData.bv >= 8000 ? championData.bv : 0;
      resolve(Math.round(amtPerPoint * adpPoints));
    } else {
      resolve(0);
    }
  });

const getLeadersEarnings = (
  monthMoney,
  adpId,
  leadersPoints,
  leadersPercent,
  gbv
) =>
  new Promise(async (resolve, reject) => {
    const leadersData = await getLeadersDataForAdp(adpId);
    let leadersAmount = 0;
    if (leadersData && leadersData.length > 2) {
      const l1 = leadersData[0].bv;
      const l2 = leadersData[1].bv;
      const l3 = leadersData[2].bv;
      if (l1 > 40000 && l2 >= (70 * l1) / 100 && l3 >= (40 * l1) / 100) {
        const availableAmount = monthMoney * (leadersPercent / 100);
        const amtPerPoint = availableAmount / leadersPoints;
        resolve(Math.round(amtPerPoint * gbv.gbv));
      }
    }
    resolve(leadersAmount);
  });

const getOnePlusEarnings = async (
  monthMoney,
  adpId,
  onePlusPercent,
  onePlusCardsTotal
) =>
  new Promise(async (resolve, reject) => {
    const totalCards = await getTotalCardsForADP(adpId);
    if (totalCards) {
      const blueCards = await getBlueCardsForADP(adpId);
      const fullPercentCards = totalCards - blueCards;
      const availableAmount = monthMoney * (onePlusPercent / 100);
      const amtPerPoint = availableAmount / onePlusCardsTotal;
      const fullCardsTotal = amtPerPoint * fullPercentCards;
      const blueCardsAmt = amtPerPoint * blueCards * (60 / 100);
      const blueCardVoucherAmt = amtPerPoint * blueCards * (40 / 100);
      if (blueCardVoucherAmt) {
        const coupon = await generateVoucher();
        connection.query(
          ADD_VOUCHER(adpId, coupon, "BLUE_CARD", blueCardVoucherAmt)
        );
      }
      resolve(Math.round(fullCardsTotal + blueCardsAmt));
    } else {
      resolve(0);
    }
  });

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

const getTotalCardsForADP = (adpId) =>
  new Promise((resolve, reject) =>
    connection.query(
      GET_TOTAL_CARDS_FOR_ADP(adpId),
      (error, results, fields) => {
        if (!error && results.length > 0) {
          resolve(results[0].no_cards);
        } else if (!error) {
          resolve(0);
        } else {
          reject(error);
        }
      }
    )
  );

const getBlueCardsForADP = (adpId) =>
  new Promise((resolve, reject) =>
    connection.query(
      GET_BLUE_CARDS_FOR_ADP(adpId),
      (error, results, fields) => {
        if (!error && results.length > 0) {
          resolve(results[0].no_cards);
        } else if (!error) {
          resolve(0);
        } else {
          reject(error);
        }
      }
    )
  );

const getChampionDataForAdp = (adpId) =>
  new Promise((resolve, reject) =>
    connection.query(
      GET_CHAMPION_DATA_FOR_ADP(adpId),
      (error, results, fields) => {
        if (!error && results.length > 0) {
          resolve(results[0]);
        } else if (!error) {
          resolve(null);
        } else {
          reject(error);
        }
      }
    )
  );

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

const updateCycleHistory = (
  coSponsorRoyality,
  blueCardLimit,
  yellowCardLimit,
  greenCardLimit,
  blueCardPercent
) =>
  new Promise((resolve, reject) =>
    connection.query(
      INSERT_CYCLE_DATE(
        coSponsorRoyality,
        blueCardLimit,
        yellowCardLimit,
        greenCardLimit,
        blueCardPercent
      ),
      (error, result, flag) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.insertId);
        }
      }
    )
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

module.exports.getAllADP = getAllADP;
module.exports.getCoSponsorRoyality = getCoSponsorRoyality;
module.exports.getChampionEarnings = getChampionEarnings;
module.exports.generateVoucher = generateVoucher;
module.exports.getOnePlusEarnings = getOnePlusEarnings;
module.exports.insertCycleRows = insertCycleRows;
module.exports.updateCycleHistory = updateCycleHistory;
module.exports.expireCards = expireCards;
module.exports.getCoSponsoredNo = getCoSponsoredNo;
module.exports.getLeadersEarnings = getLeadersEarnings;
module.exports.getLeadersDataForAdp = getLeadersDataForAdp;

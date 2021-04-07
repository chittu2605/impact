const {
  GET_ELIGIBLE_ONE_PLUS_CARDS,
} = require("../../admin/dbQuery/stats/stats");
const connection = require("../../dbConnect");
const { GET_PVB } = require("../adpQuery/bv/bv");
const {
  CREATE_CARD,
  CARD_GENERATION_TIMES,
  GET_CARDS,
  GET_CYCLE_DETAILS_FOR_CARD,
  TOTAL_CARDS_FOR_MONTH,
} = require("../adpQuery/cards/cards");

const createCards = async (data) => {
  let remainingPbv = data.pbv;
  if (remainingPbv >= 25000) {
    const tempCount = Math.floor(remainingPbv / 25000);
    const noGreenCards = tempCount * 3;
    await createCard(data.adp_id, "green", noGreenCards, 3, 6);
    remainingPbv -= 25000 * tempCount;
  }
  if (remainingPbv >= 11000) {
    const noYellowCards = Math.floor(remainingPbv / 11000);
    await createCard(data.adp_id, "yellow", noYellowCards, 1, 3);
  }
  const overflow = await getCardsOverflow(data.adp_id);
  if (overflow >= 11000) {
    createCard(data.adp_id, "blue", 1, 1, 3);
  }
};

const createCard = (adp_id, type, noCards, multiplesOf, validity) =>
  new Promise((resolve, reject) =>
    connection.query(
      CREATE_CARD(adp_id, type, noCards, multiplesOf, validity),
      (error, results, fields) => {
        if (!error) {
          resolve(true);
        } else {
          reject(error);
        }
      }
    )
  );

const getCardsOverflow = (adp_id) =>
  new Promise((resolve, reject) =>
    connection.query(GET_PVB(adp_id), async (error, results, fields) => {
      if (!error && results.length > 0) {
        const totalPbv = results[0].pbv;
        const greenCardsNo = await getCardGenarationTimes(adp_id, "green");
        const blueCardsCardsNo = await getCardGenarationTimes(adp_id, "blue");
        const yellowCardsNo = await getCardGenarationTimes(adp_id, "yellow");
        const balAfterCards =
          totalPbv -
          (25000 * greenCardsNo +
            11000 * blueCardsCardsNo +
            11000 * yellowCardsNo);
        resolve(balAfterCards);
      } else {
        resolve(0);
      }
    })
  );

const getCardGenarationTimes = (adp_id, type) =>
  new Promise((resolve, reject) =>
    connection.query(
      CARD_GENERATION_TIMES(adp_id, type),
      (error, results, fields) => {
        if (!error && results.length > 0) {
          resolve(results[0].no_cards);
        } else {
          resolve(0);
        }
      }
    )
  );

const getCardsOfADP = (adpId) =>
  new Promise((resolve, reject) =>
    connection.query(GET_CARDS(adpId), (error, results, fields) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    })
  );

const getTotalCardsOfADPForMonth = (adpId) =>
  new Promise(async (resolve, reject) => {
    connection.query(TOTAL_CARDS_FOR_MONTH(adpId), (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });

const getCycleDetailsForCard = (cardId) =>
  new Promise(async (resolve, reject) => {
    connection.query(
      GET_CYCLE_DETAILS_FOR_CARD(cardId),
      (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });

const getEligibleOnePlusCards = (offset, rowCount) =>
  new Promise(async (resolve, reject) => {
    connection.query(
      GET_ELIGIBLE_ONE_PLUS_CARDS(offset, rowCount),
      (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });

module.exports.createCards = createCards;
module.exports.getCardsOverflow = getCardsOverflow;
module.exports.getCardsOfADP = getCardsOfADP;
module.exports.getCycleDetailsForCard = getCycleDetailsForCard;
module.exports.getTotalCardsOfADPForMonth = getTotalCardsOfADPForMonth;
module.exports.getEligibleOnePlusCards = getEligibleOnePlusCards;

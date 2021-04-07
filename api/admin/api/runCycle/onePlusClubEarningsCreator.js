const { parentPort, workerData } = require("worker_threads");
const { getEligibleOnePlusCards } = require("../../../adp/api/cardUtils");

const { INSERT_CARD_EARNINGS } = require("../../../functions/query");
const {
  updateCycleRecords,
  addBlueCardVoucher,
} = require("../../../functions/runCycleHelper");

const offSet = workerData.offset;
const cycleId = workerData.cycleId;
const createOnePlusClubEarnings = async () => {
  try {
    const cards = await getEligibleOnePlusCards(offSet, workerData.rowCount);
    const dbStatements = [];
    for (card of cards) {
      const availableAmount =
        workerData.monthMoney * (workerData.onePlusPercent / 100);
      const amtPerCard =
        availableAmount / workerData.onePlusCardsTotal.no_cards;
      let onePlusAmt = 0;
      let voucherId = null;
      if (card.card_type !== "blue") {
        onePlusAmt = Math.round(amtPerCard * card.qty);
      } else {
        onePlusAmt = Math.round(amtPerCard * card.qty * (60 / 100));
        const voucherAmt = Math.round(amtPerCard * card.qty * (40 / 100));
        voucherId = await addBlueCardVoucher(card.adp_id, voucherAmt);
      }
      const insertStatement = INSERT_CARD_EARNINGS(
        card.id,
        card.adp_id,
        cycleId,
        onePlusAmt,
        voucherId
      );
      dbStatements.push(insertStatement);
    }
    if (dbStatements.length > 0) {
      await updateCycleRecords(dbStatements);
    }
  } catch (error) {
    console.log(error);
  }
  parentPort.postMessage(offSet);
};
createOnePlusClubEarnings();

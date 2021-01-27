const { getCardsOfADP, getCycleDetailsForCard } = require("../cardUtils");
module.exports = (app) => {
  app.get("/adp/get-cards", async (req, res) => {
    try {
      const adpId = req.user.adp_id;
      const cards = await getCardsOfADP(adpId);
      const resArr = [];
      for (card of cards) {
        resArr.push({
          ...card,
          created_on: card.created_on
            ? card.created_on.getTime()
            : card.created_on,
          expired_on: card.expiry_date
            ? card.expiry_date.getTime()
            : card.expiry_date,
        });
      }
      res.json(resArr);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  });

  app.get("/adp/get-card-cycles/:id", async (req, res) => {
    try {
      const cardId = req.params.id;
      const cycleDetails = await getCycleDetailsForCard(cardId);
      const resArr = [];
      for (cycle of cycleDetails) {
        let cardIncome = 0;
        if (cycle.no_co_sponsored > 2) {
          const totalCardIncome = cycle.oneplus_earnings;
          const tatalCards = cycle.total_cards;
          const totalBlueCards = cycle.total_blue_cards;
          const blueCardPercent = cycle.blue_card_percent;
          const relTotalCards =
            tatalCards -
            totalBlueCards +
            (totalBlueCards * blueCardPercent) / 100;
          const pointValue = totalCardIncome / relTotalCards;
          cardIncome =
            cycle.card_type === "blue"
              ? (pointValue * cycle.card_qty * blueCardPercent) / 100
              : pointValue * cycle.card_qty;
        }
        resArr.push({
          cycleId: cycle.id,
          cardIncome: cardIncome,
          date: cycle.todate.getTime(),
        });
      }
      res.json(resArr);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  });
};

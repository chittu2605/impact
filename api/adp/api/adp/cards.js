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
        resArr.push({
          cycleId: cycle.card_id,
          cardIncome: cycle.amount,
          date: cycle.toDate.getTime(),
        });
      }
      res.json(resArr);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  });
};

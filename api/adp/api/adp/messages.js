const connection = require("../../../dbConnect");
const { GET_ADP_BY_ID } = require("../../adpQuery/adp/adp");
const {
  GET_MESSAGES_BY_TYPE,
  GET_REFERRAL_LINKS,
} = require("../../adpQuery/messages/messages");

const getAdpDetails = (adpId) =>
  new Promise((resolve, reject) =>
    connection.query(GET_ADP_BY_ID(adpId), (error, results) => {
      if (!error && results.length) {
        resolve(results[0]);
      } else {
        reject(error);
      }
    })
  );

const getMessagesByType = (type) =>
  new Promise((resolve, reject) =>
    connection.query(GET_MESSAGES_BY_TYPE(type), (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    })
  );

const getReferralLinks = (adpId) =>
  new Promise((resolve, reject) =>
    connection.query(GET_REFERRAL_LINKS(adpId), (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    })
  );

module.exports = (app) => {
  app.get("/adp/get-messages/:type", async (req, res) => {
    try {
      const retArr = [];
      const type = req.params.type;
      const adpId = req.user.adp_id;
      let adpDetails = await getAdpDetails(adpId);
      if (adpDetails.show_messages) {
        const messages = await getMessagesByType(type);
        for (message of messages) {
          const links = await getReferralLinks(adpId);
          let messageBody = message.template.replace(
            /\[\[([^\[]*)\]\]/g,
            (match, group) =>
              links[group - 1] ? links[group - 1].referral_url : ""
          );
          messageBody = messageBody.replace(/{{([^{]*)}}/g, (match, group) =>
            adpDetails[group] ? adpDetails[group] : ""
          );
          retArr.push(messageBody);
        }
        res.json(retArr);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  });
};

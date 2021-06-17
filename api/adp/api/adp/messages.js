const connection = require("../../../dbConnect");
const {
  GET_MESSAGES_BY_TYPE,
  GET_MESSAGE_LIB_DETAILS,
  UPDATE_MESSAGE_LIBRARY,
  UPDATE_MESSAGE_DETAILS,
  GET_WHATSAPP_GROUPS,
  GET_MESSAGE_LIB_DEFAULTS,
} = require("../../adpQuery/messages/messages");
const { getAdpDetails } = require("./addAdp");

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

const getMessageLibDetails = (adpId) =>
  new Promise((resolve, reject) =>
    connection.query(GET_MESSAGE_LIB_DETAILS(adpId), (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    })
  );

const getMessageLibDefaults = () =>
  new Promise((resolve, reject) =>
    connection.query(GET_MESSAGE_LIB_DEFAULTS(), (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    })
  );
const updateMessageLibrary = (adpId, value) =>
  new Promise((resolve, reject) =>
    connection.query(UPDATE_MESSAGE_LIBRARY(adpId, value), (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    })
  );

const updateMessageDetails = (messageDetails) =>
  new Promise((resolve, reject) =>
    connection.query(
      UPDATE_MESSAGE_DETAILS(messageDetails),
      (error, results) => {
        if (!error) {
          resolve(results);
        } else {
          reject(error);
        }
      }
    )
  );

const getWhatsappGroups = () =>
  new Promise((resolve, reject) =>
    connection.query(GET_WHATSAPP_GROUPS(), (error, results) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    })
  );

const getWhatsAppLink = (groups, name) =>
  groups.find((group) => group.name === name).link;

module.exports = (app) => {
  app.get("/adp/get-messages/:type", async (req, res) => {
    try {
      const retArr = [];
      const type = req.params.type;
      const adpId = req.user.adp_id;
      let adpDetails = await getAdpDetails(adpId);
      let whatsappGrps = await getWhatsappGroups();
      if (adpDetails.show_messages) {
        const messages = await getMessagesByType(type);
        for (message of messages) {
          const messageDetails = (await getMessageLibDetails(adpId))[0];
          let messageBody = message.template.replace(
            /\[\[([^\[]*)\]\]/g,
            (match, group) =>
              group.toUpperCase() === "WHATSAPP"
                ? getWhatsAppLink(whatsappGrps, messageDetails.whatsapp_grp)
                : messageDetails[group]
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

  app.get("/admin/get-whatsapp-groups", async (req, res) => {
    try {
      const groups = await getWhatsappGroups();
      res.json(groups);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  });

  app.get("/admin/get-message-lib-details/:adpId", async (req, res) => {
    try {
      const details = await getMessageLibDetails(req.params.adpId);
      res.json(details.length ? details[0] : null);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  });

  app.get("/admin/get-message-lib-defaults", async (req, res) => {
    try {
      const defaults = await getMessageLibDefaults();
      res.json(defaults);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  });

  app.post(
    "/admin/update-message-library/:adpId/:isEnable",
    async (req, res) => {
      try {
        const adpId = req.params.adpId;
        const isEnable = JSON.parse(req.params.isEnable);
        if (isEnable) {
          await updateMessageDetails(req.body);
          await updateMessageLibrary(adpId, 1);
        } else {
          await updateMessageLibrary(adpId, 0);
        }
        res.sendStatus(200);
      } catch (error) {
        console.log(error);
        res.sendStatus(400);
      }
    }
  );
};

module.exports = (app) => {
  const getADP = require("./getAdp")(app);
  const addADP = require("./addAdp")(app);
  const vouchers = require("./vouchers")(app);
  const statement = require("./statement")(app);
  const cards = require("./cards")(app);
  const messages = require("./messages")(app);
};

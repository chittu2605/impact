const { IS_ADP_EXISTS } = require("./query");
const connection = require("../dbConnect");

const generateAdpId = () =>
  new Promise(async (resolve, reject) => {
    let adpId;
    do {
      adpId = Math.floor(Math.random() * 10000000) + 10000000;
    } while (await isAdpExists(adpId));
    resolve(adpId);
  });

const isAdpExists = (adpId) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(IS_ADP_EXISTS(adpId), (error, result) => {
        if (!error) {
          resolve(result[0].isExists);
        } else {
          reject(error);
        }
      });
    } catch (e) {
      console.log(e);
    }
  });
};

module.exports.generateAdpId = generateAdpId;
module.exports.isAdpExists = isAdpExists;

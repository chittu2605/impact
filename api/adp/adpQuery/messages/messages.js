const GET_MESSAGES_BY_TYPE = (type) =>
  `SELECT * FROM tbl_messages WHERE type = '${type}'`;

const GET_REFERRAL_LINKS = (id) =>
  `SELECT * FROM referral_links WHERE referral_sponsor_id = ${id}`;

module.exports.GET_MESSAGES_BY_TYPE = GET_MESSAGES_BY_TYPE;
module.exports.GET_REFERRAL_LINKS = GET_REFERRAL_LINKS;

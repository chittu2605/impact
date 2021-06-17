const LOGIN_ADP1 = (adp_id) => {
  return `SELECT * FROM tbl_adp A
  WHERE A.adp_id = "${adp_id}";`;
};

const GET_CHILD_DETAILS = (adpId, sponsorId) => `WITH RECURSIVE link AS(
  SELECT ta.adp_id, ta.sponsor_id, ta.firstname, ta.lastname FROM tbl_adp ta  
  UNION ALL 
  SELECT t.adp_id, l.sponsor_id, t.firstname, t.lastname FROM tbl_adp t JOIN link l ON t.sponsor_id = l.adp_id
)
SELECT adp_id, firstname, lastname FROM link WHERE adp_id = ${adpId} AND sponsor_id = ${sponsorId}`;

const UPDATE_PASSWORD = (adpId, password) =>
  `UPDATE tbl_adp SET password = '${password}' WHERE adp_id = ${adpId}`;

const GET_ID_FOR_EMAIL = (email) =>
  `SELECT adp_id FROM tbl_adp WHERE email = '${email}'`;

const GET_ACCOUNT_ON_ID_EMAIL = (adpId, email) =>
  `SELECT count(adp_id) AS count FROM tbl_adp WHERE adp_id ='${adpId}' AND email = '${email}'`;

const INSERT_OTP = (adpId, otp) =>
  `UPDATE tbl_adp SET otp= ${otp}, otp_time = now() WHERE adp_id = '${adpId}'`;

const GET_ADP_OTP = (adpId) =>
  `SELECT otp, otp_time  FROM tbl_adp ta WHERE adp_id = ${adpId}`;

module.exports.LOGIN_ADP = LOGIN_ADP1;
module.exports.GET_CHILD_DETAILS = GET_CHILD_DETAILS;
module.exports.UPDATE_PASSWORD = UPDATE_PASSWORD;
module.exports.GET_ID_FOR_EMAIL = GET_ID_FOR_EMAIL;
module.exports.GET_ACCOUNT_ON_ID_EMAIL = GET_ACCOUNT_ON_ID_EMAIL;
module.exports.INSERT_OTP = INSERT_OTP;
module.exports.GET_ADP_OTP = GET_ADP_OTP;

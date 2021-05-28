const GET_MESSAGES_BY_TYPE = (type) =>
  `SELECT * FROM tbl_messages WHERE type = '${type}'`;

const GET_MESSAGE_LIB_DETAILS = (adpId) =>
  `SELECT id, adp_id, first_name, last_name, mobile, referral_link, 
  video_link1, video_link2, video_link3, whatsapp_grp
  FROM tbl_msg_details WHERE adp_id = ${adpId}`;

const UPDATE_MESSAGE_LIBRARY = (adpId, value) =>
  `UPDATE tbl_adp SET show_messages=${value} WHERE adp_id=${adpId}`;

const UPDATE_MESSAGE_DETAILS = (
  adpMessageDetails
) => `INSERT INTO tbl_msg_details
(adp_id, first_name, last_name, mobile, referral_link, video_link1, video_link2, video_link3, whatsapp_grp)
VALUES( ${adpMessageDetails.adpId}, '${adpMessageDetails.firstName}', '${adpMessageDetails.lastName}', 
'${adpMessageDetails.mobile}', '${adpMessageDetails.refLink}', 
'${adpMessageDetails.link1}', '${adpMessageDetails.link2}', '${adpMessageDetails.link3}', '${adpMessageDetails.whatsappGrp}')
ON DUPLICATE KEY UPDATE    
first_name="${adpMessageDetails.firstName}", last_name="${adpMessageDetails.lastName}", 
mobile="${adpMessageDetails.mobile}", referral_link="${adpMessageDetails.refLink}",
video_link1="${adpMessageDetails.link1}", video_link2="${adpMessageDetails.link2}", 
video_link3="${adpMessageDetails.link3}", whatsapp_grp="${adpMessageDetails.whatsappGrp}"`;

const GET_WHATSAPP_GROUPS = () => `SELECT id, name, link
FROM tbl_whatsapp_groups;`;

const GET_MESSAGE_LIB_DEFAULTS = () => `SELECT id, name, value
FROM impact_prod.tbl_message_constants`;

module.exports.GET_MESSAGES_BY_TYPE = GET_MESSAGES_BY_TYPE;
module.exports.GET_MESSAGE_LIB_DETAILS = GET_MESSAGE_LIB_DETAILS;
module.exports.UPDATE_MESSAGE_LIBRARY = UPDATE_MESSAGE_LIBRARY;
module.exports.UPDATE_MESSAGE_DETAILS = UPDATE_MESSAGE_DETAILS;
module.exports.GET_WHATSAPP_GROUPS = GET_WHATSAPP_GROUPS;
module.exports.GET_MESSAGE_LIB_DEFAULTS = GET_MESSAGE_LIB_DEFAULTS;

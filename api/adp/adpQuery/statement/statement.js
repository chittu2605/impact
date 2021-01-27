const GET_CYCLES = () =>
  `SELECT id, todate FROM tbl_cycledate ORDER BY todate desc`;

const GET_ADP_DETAILS = (adpId) =>
  `SELECT firstname, lastname, mobile, sponsor_id, pan, bank_name, branch, ifs_code FROM tbl_adp WHERE adp_id = ${adpId}`;

const GET_ADP_DETAILS_FOR_CYCLE = (adpId, cycleId) =>
  `SELECT * FROM tbl_cycle_report WHERE adp_id= ${adpId} and cycle_id = ${cycleId}`;

const GET_CHILD_DETAILS_FOR_CYCLE = (
  adpId,
  cycleId
) => `SELECT tcr.adp_id, tcr.zone_value, tcr.bv, ta.firstname, ta.lastname FROM tbl_cycle_report tcr
JOIN tbl_adp ta USING (adp_id)
WHERE ta.sponsor_id = ${adpId} AND tcr.cycle_id = ${cycleId}`;

module.exports.GET_CYCLES = GET_CYCLES;
module.exports.GET_ADP_DETAILS = GET_ADP_DETAILS;
module.exports.GET_ADP_DETAILS_FOR_CYCLE = GET_ADP_DETAILS_FOR_CYCLE;
module.exports.GET_CHILD_DETAILS_FOR_CYCLE = GET_CHILD_DETAILS_FOR_CYCLE;

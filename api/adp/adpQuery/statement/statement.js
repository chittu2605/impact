const GET_CYCLES = (adpId) =>
  `SELECT tc.id, tc.todate, tc.pull_threshold FROM tbl_cycledate tc
  WHERE EXISTS (SELECT tcr.id FROM tbl_cycle_report tcr WHERE tcr.cycle_id = tc.id AND tcr.adp_id = ${adpId})
  ORDER BY tc.todate desc`;

const GET_ALL_CYCLES = () =>
  `SELECT tc.id, tc.todate, tc.pull_threshold FROM tbl_cycledate tc ORDER BY tc.todate desc`;

const GET_ADP_DETAILS = (adpId) =>
  `SELECT firstname, lastname, mobile, sponsor_id, pan, bank_name, branch, ifs_code FROM tbl_adp WHERE adp_id = ${adpId}`;

const GET_ADP_DETAILS_FOR_CYCLE = (adpId, cycleId) =>
  `SELECT * FROM tbl_cycle_report WHERE adp_id= ${adpId} and cycle_id = ${cycleId}`;

const GET_ADP_PULL_DETAILS_FOR_CYCLE = (adpId, cycleId) =>
  `SELECT tcp.cycle_id, tcp.from, tcp.to, ta.firstname,ta.lastname, tcp.amount 
  FROM tbl_cycle_pull_data tcp JOIN tbl_adp ta ON ta.adp_id = tcp.to 
  WHERE tcp.from = ${adpId} AND tcp.cycle_id = ${cycleId}`;

const GET_ADP_PULL_FROM_DETAILS_FOR_CYCLE = (adpId, cycleId) =>
  `SELECT tcp.cycle_id, tcp.from, tcp.to, ta.firstname,ta.lastname, tcp.amount 
  FROM tbl_cycle_pull_data tcp JOIN tbl_adp ta ON ta.adp_id = tcp.from 
  WHERE tcp.to = ${adpId} AND tcp.cycle_id = ${cycleId}`;

const GET_CHILD_DETAILS_FOR_CYCLE = (
  adpId,
  cycleId
) => `SELECT tcr.adp_id, tcr.zone_value, tcr.bv, ta.firstname, ta.lastname FROM tbl_cycle_report tcr
JOIN tbl_adp ta USING (adp_id)
WHERE ta.sponsor_id = ${adpId} AND tcr.cycle_id = ${cycleId}`;

const GET_CYCLE_INCOMES = (
  cycleId,
  limit,
  count
) => `SELECT tcr.cycle_id, tcr.adp_id, ta.firstname, ta.lastname, tcr.total_income, 
tcr.prev_cycle_income, tcr.co_sponsor_royality, tcr.overflow FROM tbl_cycle_report tcr
JOIN tbl_adp ta ON tcr.adp_id = ta.adp_id 
WHERE tcr.cycle_id = ${cycleId}  LIMIT ${limit},${count}`;

const GET_TOTAL_INCOMES = (cycleId) =>
  `SELECT count(tcr.cycle_id) AS total FROM tbl_cycle_report tcr WHERE tcr.cycle_id = ${cycleId}`;

module.exports.GET_CYCLES = GET_CYCLES;
module.exports.GET_ADP_DETAILS = GET_ADP_DETAILS;
module.exports.GET_ADP_DETAILS_FOR_CYCLE = GET_ADP_DETAILS_FOR_CYCLE;
module.exports.GET_ADP_PULL_DETAILS_FOR_CYCLE = GET_ADP_PULL_DETAILS_FOR_CYCLE;
module.exports.GET_ADP_PULL_FROM_DETAILS_FOR_CYCLE =
  GET_ADP_PULL_FROM_DETAILS_FOR_CYCLE;
module.exports.GET_CHILD_DETAILS_FOR_CYCLE = GET_CHILD_DETAILS_FOR_CYCLE;
module.exports.GET_ALL_CYCLES = GET_ALL_CYCLES;
module.exports.GET_CYCLE_INCOMES = GET_CYCLE_INCOMES;
module.exports.GET_TOTAL_INCOMES = GET_TOTAL_INCOMES;

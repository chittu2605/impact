const GET_CARDS = (adpId) =>
  `SELECT tc.*,(
    valid_cycles - (SELECT count(id) FROM tbl_cycledate WHERE todate > created_on)
  )AS valid_till, cd.todate AS expiry_date FROM tbl_card tc
  LEFT JOIN tbl_cycledate cd ON tc.expiry_cycle = cd.id
  WHERE adp_id = ${adpId} ORDER BY created_on DESC`;

const CARD_GENERATION_TIMES = (adp_id, type) =>
  `SELECT IFNULL(sum(qty/multiple_of), 0) AS no_cards FROM tbl_card WHERE adp_id = ${adp_id} and card_type='${type}'`;

const CREATE_CARD = (
  adp_id,
  type,
  qty,
  multipleOf,
  vaidity
) => `INSERT INTO tbl_card
(adp_id, card_type, qty, multiple_of, valid_cycles)
VALUES(${adp_id}, '${type}', ${qty}, ${multipleOf}, ${vaidity})`;

const GET_CYCLE_DETAILS_FOR_CARD = (cardId) =>
  `SELECT tce.card_id, tce.amount, tce.cyle_id, tc.todate AS toDate FROM tbl_card_earnings tce 
  JOIN tbl_cycledate tc ON tc.id = tce.cyle_id 
  WHERE card_id = ${cardId}`;

const TOTAL_CARDS_FOR_MONTH = (adpId) =>
  `SELECT sum(qty) AS noCards FROM tbl_card WHERE adp_id = ${adpId} AND expiry_cycle IS NULL`;

const GET_VALID_CARDS = () =>
  `SELECT * FROM tbl_card WHERE AND expiry_cycle IS NULL`;

module.exports.GET_CARDS = GET_CARDS;
module.exports.CARD_GENERATION_TIMES = CARD_GENERATION_TIMES;
module.exports.CREATE_CARD = CREATE_CARD;
module.exports.GET_CYCLE_DETAILS_FOR_CARD = GET_CYCLE_DETAILS_FOR_CARD;
module.exports.TOTAL_CARDS_FOR_MONTH = TOTAL_CARDS_FOR_MONTH;

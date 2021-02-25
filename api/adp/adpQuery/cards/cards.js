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

const GET_CYCLE_DETAILS_FOR_CARD = (
  cardId
) => `SELECT cd.*,tcr.no_co_sponsored,tcr.oneplus_earnings,
(SELECT qty FROM tbl_card WHERE id = ${cardId}) AS card_qty,
(SELECT card_type FROM tbl_card WHERE id = ${cardId}) AS card_type,
(SELECT IFNULL(sum(tc.qty),0) FROM tbl_card tc 
WHERE tc.adp_id = tcr.adp_id AND tc.created_on < cd.todate 
AND (SELECT count(id) FROM tbl_cycledate cd2
WHERE cd2.todate BETWEEN tc.created_on AND cd.todate 
) <= tc.valid_cycles 
) AS total_cards,
(SELECT IFNULL(sum(tc.qty),0) FROM tbl_card tc 
WHERE tc.adp_id = tcr.adp_id AND tc.card_type = 'blue'
AND tc.created_on < cd.todate 
AND (SELECT count(id) FROM tbl_cycledate cd2
WHERE cd2.todate BETWEEN tc.created_on AND cd.todate 
) <= tc.valid_cycles 
) AS total_blue_cards
FROM tbl_cycledate cd
JOIN tbl_cycle_report tcr ON cd.id = tcr.cycle_id 
AND tcr.adp_id = (SELECT adp_id FROM tbl_card WHERE id = ${cardId})
WHERE cd.todate > (SELECT created_on FROM tbl_card WHERE id = ${cardId}) AND 
((SELECT expiry_cycle FROM tbl_card WHERE id = ${cardId}) IS NULL OR
cd.id <= (SELECT expiry_cycle FROM tbl_card WHERE id = ${cardId}))
`;

const TOTAL_CARDS_FOR_MONTH = (adpId) =>
  `SELECT count(id) AS noCards FROM tbl_card WHERE adp_id = ${adpId} AND expiry_cycle IS NULL`;

module.exports.GET_CARDS = GET_CARDS;
module.exports.CARD_GENERATION_TIMES = CARD_GENERATION_TIMES;
module.exports.CREATE_CARD = CREATE_CARD;
module.exports.GET_CYCLE_DETAILS_FOR_CARD = GET_CYCLE_DETAILS_FOR_CARD;
module.exports.TOTAL_CARDS_FOR_MONTH = TOTAL_CARDS_FOR_MONTH;

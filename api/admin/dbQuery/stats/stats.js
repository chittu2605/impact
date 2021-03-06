const TOTAL_TURNOVER = () =>
  `SELECT sum(after_discount * qty) AS ttv FROM tbl_order`;
const MONTHLY_TURNOVER =
  () => `SELECT sum(after_discount * qty) AS mtv FROM tbl_order
WHERE 
order_date > 
IFNULL((SELECT todate FROM tbl_cycledate ORDER BY id DESC LIMIT 1),0)`;
const TOTAL_MONEY = () => `SELECT IFNULL(sum(pbv),0) AS tm FROM tbl_pbv`;
const MONTHLY_MONEY = () =>
  `SELECT IFNULL(sum(current_month_pbv),0) AS mm FROM tbl_pbv`;
const TOTAL_ADP = () => `SELECT count(adp_id) AS ta FROM tbl_adp`;
const NEW_ADP = () => `SELECT count(adp_id) AS na FROM tbl_adp
WHERE 
date_created > 
IFNULL((SELECT todate FROM tbl_cycledate ORDER BY id DESC LIMIT 1),0)`;
const NEW_ADP_GBV = () => `SELECT sum(pbv) AS njbv FROM tbl_pbv
JOIN tbl_adp AS ta USING (adp_id) 
WHERE 
ta.date_created > 
IFNULL((SELECT todate FROM tbl_cycledate ORDER BY id DESC LIMIT 1),0)`;

const GET_CHAMPION_POINTS = (prevCycleLimit = 0) => `WITH RECURSIVE link AS(
  SELECT tp.adp_id, tp.sponsor_id, tp.pbv, tp.current_month_pbv, ta.date_created 
  FROM 
    tbl_pbv tp 
    JOIN tbl_adp ta ON tp.adp_id = ta.adp_id 
  UNION ALL 
  SELECT t.adp_id, l.sponsor_id, t.pbv, t.current_month_pbv, ta.date_created
  FROM 
    tbl_pbv t 
    JOIN link l ON t.sponsor_id = l.adp_id
    JOIN tbl_adp ta ON t.adp_id = ta.adp_id 
), 
gbv AS (SELECT sponsor_id, SUM(pbv) AS gbv FROM link GROUP BY sponsor_id),
champion_details AS (SELECT tp.adp_id, tp.pbv, tp.current_month_pbv, IFNULL(g.gbv,0) AS gbv,
(SELECT IFNULL(SUM(tp2.current_month_pbv),0) FROM tbl_pbv tp2 JOIN tbl_adp ta USING (adp_id) 
  WHERE ta.co_sponsor_id = tp.adp_id AND ta.date_created > IFNULL((SELECT todate FROM tbl_cycledate
  ORDER BY id DESC LIMIT ${prevCycleLimit},1),0)) AS current_month_gbv,
(SELECT count(ta.adp_id) FROM tbl_adp ta WHERE ta.co_sponsor_id = tp.adp_id 
AND ta.date_created > IFNULL((SELECT todate FROM tbl_cycledate ORDER BY id DESC LIMIT ${prevCycleLimit},1),0)) AS new_co_sponsored,
(SELECT count(ta.adp_id) FROM tbl_adp ta WHERE ta.sponsor_id = tp.adp_id) AS no_of_frontlines 
FROM tbl_pbv tp LEFT JOIN gbv AS g ON tp.adp_id = g.sponsor_id)
SELECT SUM((CASE WHEN current_month_pbv >=5000 THEN current_month_pbv ELSE 0 END) + (CASE WHEN current_month_gbv >= 12000
AND new_co_sponsored > 4 THEN current_month_gbv ELSE 0 END)) AS total_points, count(*) AS total_count
FROM champion_details WHERE gbv>20000 AND no_of_frontlines>1 AND (current_month_pbv >=5000 
OR (current_month_gbv >= 12000 AND new_co_sponsored > 4))`;

const GET_CHAMPION_PERCENT = () =>
  ` SELECT value FROM tbl_planmanagement WHERE plan_name = "champion_club"`;

const GET_CHAMPION_QUALIFIERS = (offset, rowCount, prevCycleLimit = 0) =>
  `WITH RECURSIVE link AS(
    SELECT tp.adp_id, tp.sponsor_id, tp.pbv, tp.current_month_pbv, ta.date_created
    FROM 
      tbl_pbv tp 
      JOIN tbl_adp ta ON tp.adp_id = ta.adp_id 
    UNION ALL 
    SELECT t.adp_id, l.sponsor_id, t.pbv, t.current_month_pbv, ta.date_created 
    FROM 
      tbl_pbv t 
      JOIN link l ON t.sponsor_id = l.adp_id
      JOIN tbl_adp ta ON t.adp_id = ta.adp_id
  ), 
  gbv AS (
  SELECT sponsor_id, SUM(pbv) AS gbv, SUM(current_month_pbv) AS current_month_gbv FROM link 
    GROUP BY sponsor_id),
  champion_details AS (SELECT tp.adp_id, tp.pbv, tp.current_month_pbv, IFNULL(g.gbv,0) AS gbv,
  (SELECT IFNULL(SUM(tp2.current_month_pbv),0) FROM tbl_pbv tp2 JOIN tbl_adp ta USING (adp_id) 
  WHERE ta.co_sponsor_id = tp.adp_id AND ta.date_created > IFNULL((SELECT todate FROM tbl_cycledate
  ORDER BY id DESC LIMIT ${prevCycleLimit},1),0)) AS current_month_gbv, (SELECT count(ta.adp_id) FROM tbl_adp ta 
  WHERE ta.co_sponsor_id = tp.adp_id AND ta.date_created > IFNULL((SELECT todate FROM tbl_cycledate
  ORDER BY id DESC LIMIT ${prevCycleLimit},1),0)) AS new_co_sponsored, (SELECT count(ta.adp_id) FROM tbl_adp ta
  WHERE ta.sponsor_id = tp.adp_id) AS no_of_frontlines FROM tbl_pbv tp 
  LEFT JOIN gbv AS g ON tp.adp_id = g.sponsor_id)
  SELECT ta.adp_id, ta.firstname, ta.lastname, c.current_month_pbv, c.current_month_gbv, c.new_co_sponsored
  FROM tbl_adp ta JOIN champion_details c USING (adp_id)
  WHERE (c.gbv >= 20000 AND c.no_of_frontlines > 1) AND (c.current_month_pbv >= 5000 OR (
  c.current_month_gbv >= 12000 AND c.new_co_sponsored > 4))` +
  (offset ? ` LIMIT ${offset},${rowCount}` : "");

const GET_ONE_PLUS_PERCENT = () =>
  ` SELECT value FROM tbl_planmanagement WHERE plan_name = "one_plus_one_club" and name="per"`;

const GET_TOTAL_ONE_PLUS_CARDS = () =>
  `SELECT IFNULL(sum(tc.qty),0) as no_cards, COUNT(*) AS no_rows FROM tbl_card tc WHERE expiry_cycle IS NULL AND (
    SELECT count(adp_id) FROM tbl_adp ta WHERE ta.co_sponsor_id = tc.adp_id ) > 2`;

const GET_ELIGIBLE_ONE_PLUS_CARDS = (offset, rowCount) =>
  `SELECT * FROM tbl_card tc WHERE expiry_cycle IS NULL AND (
      SELECT count(adp_id) FROM tbl_adp ta WHERE ta.co_sponsor_id = tc.adp_id ) > 2 LIMIT ${offset},${rowCount}`;

const GET_ONE_PLUS_CARD_DETAILS = () =>
  `SELECT tc.*,ta.firstname, ta.lastname FROM tbl_card tc JOIN tbl_adp ta USING (adp_id) 
  WHERE expiry_cycle IS NULL  AND (
  SELECT count(adp_id) FROM tbl_adp ta WHERE ta.co_sponsor_id = tc.adp_id ) > 2 ORDER BY adp_id`;

const GET_LEADERS_CLUB_QUALIFIERS = (offset, rowCount) =>
  `WITH RECURSIVE link AS (
	SELECT adp_id,sponsor_id,current_month_pbv FROM tbl_pbv
	UNION ALL
	SELECT tp.adp_id,l.sponsor_id,tp.current_month_pbv FROM tbl_pbv tp JOIN link l ON tp.sponsor_id = l.adp_id
),
gbv AS (SELECT sponsor_id, ifnull(sum(current_month_pbv),0) AS gbv FROM link GROUP BY sponsor_id),
bv AS ( SELECT tp.adp_id, ifnull(tp.current_month_pbv + ifnull(g.gbv,0), 0) AS bv FROM tbl_pbv tp 
LEFT JOIN gbv g ON tp.adp_id = g.sponsor_id WHERE tp.sponsor_id != ''),
line1 AS (
SELECT tp.sponsor_id AS adp_id, min(tp.adp_id) AS line1_adp, max_line1.bv AS line1_bv FROM tbl_pbv tp
JOIN bv b USING (adp_id)
JOIN (SELECT tp.sponsor_id,  max(b.bv) AS bv FROM tbl_pbv tp JOIN bv b USING (adp_id) GROUP BY sponsor_id
HAVING bv >= 40000) AS max_line1 ON tp.sponsor_id = max_line1.sponsor_id AND max_line1.bv = b.bv GROUP BY tp.sponsor_id),
line2 AS (SELECT tp.sponsor_id AS adp_id, l1.line1_adp, l1.line1_bv, min(tp.adp_id) AS line2_adp, max_line2.bv AS line2_bv 
FROM tbl_pbv tp JOIN bv b USING (adp_id) JOIN line1 l1 ON tp.sponsor_id = l1.adp_id
JOIN(SELECT tp.sponsor_id,  max(b.bv) AS bv FROM tbl_pbv tp JOIN bv b USING (adp_id) 
JOIN line1 l1 ON tp.sponsor_id = l1.adp_id WHERE tp.adp_id != l1.line1_adp
AND b.bv >= (l1.line1_bv * 70/100) GROUP BY sponsor_id
) max_line2 ON tp.sponsor_id = max_line2.sponsor_id 
AND max_line2.bv = b.bv GROUP BY tp.sponsor_id),
line3 AS (SELECT tp.sponsor_id AS adp_id, l2.line1_adp, l2.line1_bv,l2.line2_adp, l2.line2_bv, min(tp.adp_id) AS line3_adp, max_line3.bv AS line3_bv 
FROM tbl_pbv tp JOIN bv b USING (adp_id) JOIN line2 l2 ON tp.sponsor_id = l2.adp_id
JOIN(SELECT tp.sponsor_id,  max(b.bv) AS bv FROM tbl_pbv tp JOIN bv b USING (adp_id) 
JOIN line2 l2 ON tp.sponsor_id = l2.adp_id WHERE tp.adp_id != l2.line1_adp
AND tp.adp_id != l2.line2_adp AND b.bv >= (l2.line1_bv * 40/100) GROUP BY tp.sponsor_id)max_line3 ON tp.sponsor_id = max_line3.sponsor_id 
AND max_line3.bv = b.bv GROUP BY tp.sponsor_id)
SELECT l.adp_id, g.gbv, ta.firstname, ta.lastname, l.line1_adp, l.line1_bv, l.line2_adp, l.line2_bv, l.line3_adp,
l.line3_bv FROM line3 l JOIN tbl_adp ta USING (adp_id) JOIN gbv g ON g.sponsor_id = l.adp_id` +
  (offset ? ` LIMIT ${offset},${rowCount}` : "");

const GET_LEADERS_CLUB_POINTS = () => `WITH RECURSIVE link AS (
	SELECT adp_id,sponsor_id,current_month_pbv FROM tbl_pbv
	UNION ALL
	SELECT tp.adp_id,l.sponsor_id,tp.current_month_pbv FROM tbl_pbv tp JOIN link l ON tp.sponsor_id = l.adp_id
),
gbv AS (SELECT sponsor_id, ifnull(sum(current_month_pbv),0) AS gbv FROM link GROUP BY sponsor_id),
bv AS ( SELECT tp.adp_id, ifnull(tp.current_month_pbv + ifnull(g.gbv,0), 0) AS bv FROM tbl_pbv tp 
LEFT JOIN gbv g ON tp.adp_id = g.sponsor_id WHERE tp.sponsor_id != ''),
line1 AS (
SELECT tp.sponsor_id AS adp_id, min(tp.adp_id) AS line1_adp, max_line1.bv AS line1_bv FROM tbl_pbv tp
JOIN bv b USING (adp_id)
JOIN (SELECT tp.sponsor_id,  max(b.bv) AS bv FROM tbl_pbv tp JOIN bv b USING (adp_id) GROUP BY sponsor_id
HAVING bv >= 40000) AS max_line1 ON tp.sponsor_id = max_line1.sponsor_id AND max_line1.bv = b.bv GROUP BY tp.sponsor_id),
line2 AS (SELECT tp.sponsor_id AS adp_id, l1.line1_adp, l1.line1_bv, min(tp.adp_id) AS line2_adp, max_line2.bv AS line2_bv 
FROM tbl_pbv tp JOIN bv b USING (adp_id) JOIN line1 l1 ON tp.sponsor_id = l1.adp_id
JOIN(SELECT tp.sponsor_id,  max(b.bv) AS bv FROM tbl_pbv tp JOIN bv b USING (adp_id) 
JOIN line1 l1 ON tp.sponsor_id = l1.adp_id WHERE tp.adp_id != l1.line1_adp
AND b.bv >= (l1.line1_bv * 70/100) GROUP BY sponsor_id
) max_line2 ON tp.sponsor_id = max_line2.sponsor_id 
AND max_line2.bv = b.bv GROUP BY tp.sponsor_id),
line3 AS (SELECT tp.sponsor_id AS adp_id, l2.line1_adp, l2.line1_bv,l2.line2_adp, l2.line2_bv, min(tp.adp_id) AS line3_adp, max_line3.bv AS line3_bv 
FROM tbl_pbv tp JOIN bv b USING (adp_id) JOIN line2 l2 ON tp.sponsor_id = l2.adp_id
JOIN(SELECT tp.sponsor_id,  max(b.bv) AS bv FROM tbl_pbv tp JOIN bv b USING (adp_id) 
JOIN line2 l2 ON tp.sponsor_id = l2.adp_id WHERE tp.adp_id != l2.line1_adp
AND tp.adp_id != l2.line2_adp AND b.bv >= (l2.line1_bv * 40/100) GROUP BY tp.sponsor_id)max_line3 ON tp.sponsor_id = max_line3.sponsor_id 
AND max_line3.bv = b.bv GROUP BY tp.sponsor_id)
select IFNULL(SUM(line1_BV),0) AS total_points, count(*) AS total_count from line3`;

const GET_LEADERS_FUND_PERCENT = () =>
  `SELECT value FROM tbl_planmanagement WHERE plan_name = "leaders_club"`;

const GET_TOTAL_ORDERS = () =>
  `SELECT COUNT(oid) AS total_orders FROM tbl_order`;

const GET_ORDERS_DATA = (limit, count) =>
  `SELECT tor.oid, tor.adp_id, ta.firstname, ta.lastname, tor.qty, tor.after_discount, tor.bv, tor.bv_weightage, tor.type
  FROM tbl_order tor JOIN tbl_adp ta ON ta.adp_id = tor.adp_id ORDER BY order_date DESC LIMIT ${limit},${count}`;

module.exports.TOTAL_TURNOVER = TOTAL_TURNOVER;
module.exports.MONTHLY_TURNOVER = MONTHLY_TURNOVER;
module.exports.TOTAL_MONEY = TOTAL_MONEY;
module.exports.MONTHLY_MONEY = MONTHLY_MONEY;
module.exports.TOTAL_ADP = TOTAL_ADP;
module.exports.NEW_ADP = NEW_ADP;
module.exports.NEW_ADP_GBV = NEW_ADP_GBV;
module.exports.GET_CHAMPION_POINTS = GET_CHAMPION_POINTS;
module.exports.GET_CHAMPION_PERCENT = GET_CHAMPION_PERCENT;
module.exports.GET_CHAMPION_QUALIFIERS = GET_CHAMPION_QUALIFIERS;
module.exports.GET_ONE_PLUS_PERCENT = GET_ONE_PLUS_PERCENT;
module.exports.GET_TOTAL_ONE_PLUS_CARDS = GET_TOTAL_ONE_PLUS_CARDS;
module.exports.GET_ONE_PLUS_CARD_DETAILS = GET_ONE_PLUS_CARD_DETAILS;
module.exports.GET_LEADERS_CLUB_QUALIFIERS = GET_LEADERS_CLUB_QUALIFIERS;
module.exports.GET_LEADERS_CLUB_POINTS = GET_LEADERS_CLUB_POINTS;
module.exports.GET_LEADERS_FUND_PERCENT = GET_LEADERS_FUND_PERCENT;
module.exports.GET_ELIGIBLE_ONE_PLUS_CARDS = GET_ELIGIBLE_ONE_PLUS_CARDS;
module.exports.GET_TOTAL_ORDERS = GET_TOTAL_ORDERS;
module.exports.GET_ORDERS_DATA = GET_ORDERS_DATA;

const GET_PBV_BY_ADP_ID = (adp_id) => {
  return `SELECT * FROM tbl_pbv
  WHERE adp_id = "${adp_id}";`;
};

// const GET_ALL_CHILD = (adp_id) => {
//   return `with recursive cte (adp_id, firstname, lastname, sponsor_id) as (
//     select     adp_id,
//                firstname,
//                lastname,
//                sponsor_id
//     from       tbl_adp
//     where      adp_id = "${adp_id}"
//     union all
//     select     p.adp_id,
//                p.firstname,
//                p.lastname,
//                p.sponsor_id
//     from       tbl_adp p
//     inner join cte
//             on p.sponsor_id = cte.adp_id
//   )
//   select * from cte;`
// }

const GET_ALL_CHILD = (adp_id) => {
  return `  Select Distinct adp_id, firstname, lastname, sponsor_id from tbl_adp
  where adp_id IN (
  SELECT adp_id FROM tbl_adp_line
  WHERE main_adp = "${adp_id}");`;
};

const INSERT_CO_SPONSOR_ROYALTY = (
  co_sponsor_id,
  client_id,
  client_pad,
  per,
  co_sponsor_income,
  date
) => {
  return `INSERT INTO tbl_co_sponsor_royality
  (
  co_sponsor_id,
  client_id,
  client_pad,
  per,
  co_sponsor_income
  
  )
  VALUES
  (
  "${co_sponsor_id}",
  "${client_id}",
  "${client_pad}",
  "${per}",
  "${co_sponsor_income}");`;
};

const SELECT_CO_SPONSOR_ROYALTY_MANAGEMENT = () => {
  return `SELECT * FROM tbl_planmanagement
  WHERE plan_name = "co_sponsor_royalty";`;
};

const SELECT_PZI_MANAGEMENT = () => {
  return `SELECT * FROM tbl_planmanagement
  WHERE plan_name = "zone";`;
};

const GET_CO_SPONSOR_INCOME = (adp_id) => {
  return `SELECT sum(co_sponsor_income) as co_sponsor_income
  FROM tbl_co_sponsor_royality
  WHERE co_sponsor_id = "${adp_id}"
  AND MONTH(date) = MONTH(CURRENT_DATE())
  AND YEAR(date) = YEAR(CURRENT_DATE())
  GROUP BY co_sponsor_id;`;
};

const GET_RETAIL_PROFIT = (adp_id) => {
  return `SELECT sum(retail_profit) as total_retail_profit
  FROM tbl_order
  WHERE adp_id = "${adp_id}"
  AND order_date > IFNULL((SELECT todate FROM tbl_cycledate ORDER BY id DESC LIMIT 1),0)`;
};

const GENERATE_STATEMENT_BY_ADP_ID = (adp_id) => {
  return `INSERT INTO tbl_adp_statement
  (
  adp_id,
  adp_name,
  sponsor_id,
  pan_card,
  mobile,
  cycle_date,
  retail_profit,
  co_sponsor_royality,
  champion_club,
  leader_club,
  one_plus_one_club,
  super_income_club,
  meb_club,
  pull,
  total,
  pzi_income,
  net_commission,
  pull_fund,
  pool_fund,
  tds,
  tds_cut,
  commission_paid,
  final_paid
  )
  (
  SELECT 
  a.adp_id, 
  c.adp_name, 
  c.sponsor_id, 
  c.pan, 
  c.mobile, 
  CURRENT_TIMESTAMP AS cycle_date, 
  b.total_retail_profit, 
  d.co_sponsor_royalty, 
  0 as champion_club,
  0 as leader_club,
  0 as one_plus_one_club,
  0 as super_income_club,
  0 as meb_club,
  0 as pull,
  0 as total,
  0 as pzi_income,
  (b.total_retail_profit+d.co_sponsor_royalty) as net_commission,
  0 as pull_fund,
  0 as pool_fund,
  (SELECT value FROM tbl_planmanagement where plan_name = 'tds') as tds,
  (b.total_retail_profit+d.co_sponsor_royalty)*(((SELECT value FROM tbl_planmanagement where plan_name = 'tds'))/100) as tds_cut,
  ((b.total_retail_profit+d.co_sponsor_royalty))- ((b.total_retail_profit+d.co_sponsor_royalty)*(((SELECT value FROM tbl_planmanagement where plan_name = 'tds'))/100)) as commission_paid,
  (b.total_retail_profit+d.co_sponsor_royalty) as final_pay
  FROM tbl_adp a
  LEFT JOIN 
  (
  select adp_id, sum(retail_profit) as total_retail_profit from
  (
  SELECT adp_id, retail_profit
  FROM tbl_order
  where MONTH(order_date) = MONTH(CURRENT_DATE())
  AND YEAR(order_date) = YEAR(CURRENT_DATE())
  and adp_id = "${adp_id}"
  ) sa
  group by adp_id
  ) b
  ON a.adp_id = b.adp_id
  left join 
  (
  SELECT adp_id, sponsor_id, pan, mobile, concat(firstname, ' ' ,lastname) as adp_name FROM tbl_adp
  )c
  on a.adp_id = c.adp_id
  left join
  (
  select co_sponsor_id, sum(co_sponsor_income) as co_sponsor_royalty from
  (
  SELECT co_sponsor_id, co_sponsor_income as co_sponsor_income
  FROM tbl_co_sponsor_royality
  where MONTH(date) = MONTH(CURRENT_DATE())
  AND YEAR(date) = YEAR(CURRENT_DATE())
  AND co_sponsor_id = "${adp_id}"
  ) df
  group by co_sponsor_id
  )d
  on a.adp_id = d.co_sponsor_id
  where a.adp_id = "${adp_id}" 
  );
  `;
};

const GET_ALL_ADP_ID = () => {
  return `SELECT adp_id 
  FROM tbl_adp;`;
};

const GET_ALL_ADP_PBV_BY_CO_SPONSOR = (co_sponsor_id) => {
  return `SELECT a.adp_id, sum(b.current_month_pbv) as totalPbv, a.co_sponsor_id FROM tbl_adp a
  INNER JOIN tbl_pbv b
  ON a.adp_id = b.adp_id
  WHERE co_sponsor_id = "${co_sponsor_id}"
  GROUP BY a.co_sponsor_id;`;
};

const GET_CO_SPONSOR_PLAN_VALUE = () => {
  return `SELECT value FROM tbl_planmanagement
  WHERE plan_name = "co_sponsor_royalty";`;
};

const GET_PLAN_ZONE = () => {
  return `SELECT * FROM tbl_planmanagement
  WHERE plan_name = "zone";`;
};

const GET_CO_OR_SPONSORED_ADP_LIST = (adp_id) => {
  return `SELECT DISTINCT adp_id FROM tbl_adp
  WHERE sponsor_id = "${adp_id}";`;
};

const GET_ADP_NAME_AND_SPONSOR_ID = (adp_id) => {
  return `SELECT adp_id, sponsor_id, firstname, lastname, pan, mobile  FROM tbl_adp
  WHERE adp_id = "${adp_id}";`;
};

const GET_PLAN_TDS = () => {
  return `SELECT * FROM tbl_planmanagement
  WHERE plan_name = "tds";`;
};

const GET_ADP_GBV = (adp_id) => `
WITH RECURSIVE link AS(
  SELECT tp.adp_id, tp.pbv, tp.current_month_pbv FROM tbl_pbv tp WHERE tp.sponsor_id = ${adp_id}
  UNION ALL 
  SELECT tp2.adp_id, tp2.pbv, tp2.current_month_pbv FROM tbl_pbv tp2 JOIN link l ON tp2.sponsor_id = l.adp_id)
  SELECT IFNULL(SUM(pbv),0) AS totalGbv, IFNULL(SUM(current_month_pbv),0) AS gbv FROM link
`;

const GET_ELIGIBLE_SPRINTS = () => `WITH RECURSIVE link
AS(
	SELECT tp.adp_id,tp.sponsor_id,tp.pbv,tp.current_month_pbv FROM tbl_pbv tp
	JOIN tbl_adp ta ON tp.adp_id = ta.adp_id 
	WHERE ta.sprint_qualified = false
	UNION ALL
	SELECT t.adp_id,l.sponsor_id,t.pbv,t.current_month_pbv FROM tbl_pbv t JOIN link l ON t.sponsor_id = l.adp_id 
),
gbv AS (SELECT sponsor_id,SUM(pbv) AS gbv,SUM(current_month_pbv) AS current_month_gbv FROM link GROUP BY sponsor_id)
SELECT tp.adp_id FROM tbl_pbv tp 
JOIN tbl_adp AS ta USING (adp_id)
LEFT JOIN gbv ON gbv.sponsor_id = tp.adp_id 
WHERE ta.sprint_qualified = FALSE AND  tp.current_month_pbv + IFNULL(gbv.current_month_gbv,0) >= 8000
AND NOT EXISTS (
	SELECT * FROM  link l
	JOIN tbl_pbv tp USING (adp_id)
	LEFT JOIN gbv ON tp.adp_id = gbv.sponsor_id 
	WHERE tp.pbv + IFNULL(gbv.gbv,0) >= 8000 
	AND l.sponsor_id = ta.adp_id 
)`;

const GET_ADP_MISSING_SPRINT = () => `WITH RECURSIVE link
AS(
	SELECT tp.adp_id,tp.sponsor_id,tp.pbv,tp.current_month_pbv FROM tbl_pbv tp
	JOIN tbl_adp ta ON tp.adp_id = ta.adp_id 
	WHERE ta.sprint_qualified = false
	UNION ALL
	SELECT t.adp_id,l.sponsor_id,t.pbv,t.current_month_pbv FROM tbl_pbv t JOIN link l ON t.sponsor_id = l.adp_id 
),
gbv AS (SELECT sponsor_id,SUM(pbv) AS gbv,SUM(current_month_pbv) AS current_month_gbv FROM link GROUP BY sponsor_id)
SELECT tp.adp_id FROM tbl_pbv tp 
JOIN tbl_adp AS ta USING (adp_id)
LEFT JOIN gbv ON gbv.sponsor_id = tp.adp_id 
WHERE ta.sprint_qualified = FALSE AND  tp.current_month_pbv + IFNULL(gbv.current_month_gbv,0) >= 8000
AND EXISTS (
	SELECT * FROM  link l
	JOIN tbl_pbv tp USING (adp_id)
	LEFT JOIN gbv ON tp.adp_id = gbv.sponsor_id 
	WHERE tp.pbv + IFNULL(gbv.gbv,0) >= 8000 
	AND l.sponsor_id = ta.adp_id 
)`;

const GET_SPRINTERS = () => `WITH RECURSIVE link
AS(
	SELECT tp.adp_id,tp.sponsor_id,tp.pbv,tp.current_month_pbv FROM tbl_pbv tp
	JOIN tbl_adp ta ON tp.adp_id = ta.adp_id 
	UNION ALL
	SELECT t.adp_id,l.sponsor_id,t.pbv,t.current_month_pbv FROM tbl_pbv t JOIN link l ON t.sponsor_id = l.adp_id 
),
gbv AS (SELECT sponsor_id,SUM(pbv) AS gbv,SUM(current_month_pbv) AS current_month_gbv FROM link GROUP BY sponsor_id),
sprint_parents_rel AS (SELECT tp.adp_id, tp.sponsor_id FROM tbl_pbv tp 
	JOIN tbl_adp AS ta USING (adp_id)
	LEFT JOIN gbv ON gbv.sponsor_id = tp.adp_id 
	WHERE ta.sprint_qualified = FALSE AND tp.current_month_pbv + IFNULL(gbv.current_month_gbv,0) >= 8000 
	AND NOT EXISTS (
		SELECT * FROM  link l
		JOIN tbl_pbv tp USING (adp_id)
		LEFT JOIN gbv ON tp.adp_id = gbv.sponsor_id 
		WHERE tp.pbv + IFNULL(gbv.gbv,0) >= 8000 
		AND l.sponsor_id = ta.adp_id 
	)
	UNION ALL
	SELECT sp.adp_id,tp2.sponsor_id FROM tbl_pbv tp2 JOIN sprint_parents_rel AS sp ON tp2.adp_id = sp.sponsor_id AND tp2.sponsor_id <> ""
),
sprint_parents AS (SELECT DISTINCT sponsor_id AS adp_id FROM sprint_parents_rel) 
SELECT sp.adp_id, (
	SELECT count(tp.adp_id) FROM sprint_parents_rel spr 
	RIGHT JOIN tbl_pbv tp ON spr.sponsor_id = tp.adp_id 
	WHERE tp.sponsor_id  = sp.adp_id AND 
	(EXISTS (SELECT spr2.adp_id FROM sprint_parents_rel spr2 WHERE spr2.adp_id = tp.adp_id)
	OR (SELECT count(sp3.adp_id) FROM sprint_parents_rel sp3 WHERE sp3.sponsor_id = tp.adp_id) BETWEEN 1 AND 2)
) AS sprint_lines FROM sprint_parents sp HAVING sprint_lines > 2`;

const GET_PARENTS = (adpId) => `WITH RECURSIVE parents AS(
  SELECT tp.adp_id,tp.sponsor_id FROM tbl_pbv tp WHERE tp.adp_id = ${adpId}
  UNION ALL
  SELECT tp2.adp_id,tp2.sponsor_id FROM tbl_pbv tp2 JOIN parents p ON p.sponsor_id = tp2.adp_id )
  SELECT adp_id FROM parents WHERE adp_id != ${adpId}`;

const GET_CHILDREN = (adpId) => `WITH RECURSIVE children AS(
  SELECT tp.adp_id,tp.sponsor_id FROM tbl_pbv tp WHERE tp.sponsor_id=${adpId}
  UNION ALL
  SELECT tp2.adp_id, tp2.sponsor_id FROM tbl_pbv tp2 JOIN children c ON c.adp_id = tp2.sponsor_id)
  SELECT adp_id FROM children`;

const GET_FRONTLINE_CHILDREN = (adpId) =>
  `SELECT tp.adp_id FROM tbl_pbv tp WHERE tp.sponsor_id=${adpId}`;

const IS_SPRINT_QUALIFIED = (adpId) =>
  `SELECT ta.sprint_qualified FROM tbl_adp ta WHERE ta.adp_id=${adpId}`;

const GET_ALL_ADP = () => `SELECT adp_id from tbl_adp`;

const GET_CO_SPONSOR_ROYALITY = (adpId) =>
  `SELECT IFNULL(SUM(tp.current_month_pbv),0) AS co_sponsor_royality FROM tbl_pbv tp JOIN tbl_adp ta USING (adp_id)
WHERE ta.co_sponsor_id = ${adpId}`;

const GET_CHAMPION_DATA_FOR_ADP = (adpId) => `WITH RECURSIVE link AS(
  SELECT tp.adp_id, tp.sponsor_id, tp.pbv, tp.current_month_pbv 
  FROM 
    tbl_pbv tp 
    JOIN tbl_adp ta ON tp.adp_id = ta.adp_id 
  UNION ALL 
  SELECT t.adp_id, l.sponsor_id, t.pbv, t.current_month_pbv 
  FROM 
    tbl_pbv t 
    JOIN link l ON t.sponsor_id = l.adp_id
), 
gbv AS (
SELECT sponsor_id, SUM(pbv) AS gbv, SUM(current_month_pbv) AS current_month_gbv FROM link 
  GROUP BY sponsor_id),
champion_details AS (SELECT tp.adp_id, tp.pbv, tp.current_month_pbv, IFNULL(g.gbv,0) AS gbv,
IFNULL(g.current_month_gbv,0) AS current_month_gbv, (SELECT count(ta.adp_id) FROM tbl_adp ta 
WHERE ta.co_sponsor_id = tp.adp_id AND ta.date_created > IFNULL((SELECT todate FROM tbl_cycledate
ORDER BY id DESC LIMIT 1,1),0)) AS new_co_sponsored, (SELECT count(ta.adp_id) FROM tbl_adp ta
WHERE ta.co_sponsor_id = tp.adp_id) AS no_of_frontlines FROM tbl_pbv tp JOIN gbv AS g ON tp.adp_id = g.sponsor_id)
SELECT * FROM champion_details WHERE adp_id = ${adpId}`;

const IS_COUPON_EXISTS = (coupon) => `SELECT EXISTS(
        SELECT * FROM tbl_voucher 
        WHERE voucher_code = '${coupon}' 
        AND used_on is null 
        AND expire_date <= CURDATE()) 
        AS isExists`;

const ADD_VOUCHER = (
  adp_id,
  coupon,
  voucherType,
  amt
) => `INSERT INTO tbl_voucher
      (adp_id, voucher, voucher_code, \`date\`, expire_date, amount)
      VALUES(${adp_id}, '${voucherType}', '${coupon}', CURDATE(), ADDDATE(CURDATE(), INTERVAL 1 YEAR), ${amt})`;

const GET_TOTAL_CARDS_FOR_ADP = (adpId) =>
  `SELECT IFNULL(sum(qty),0) as no_cards FROM tbl_card WHERE expiry_cycle IS NULL and adp_id = ${adpId}`;

const GET_BLUE_CARDS_FOR_ADP = (adpId) =>
  `SELECT IFNULL(sum(qty),0) as no_cards FROM tbl_card WHERE expiry_cycle IS NULL and adp_id = ${adpId} and card_type='blue'`;

const INSERT_CYCLE_DATE = (
  coSponsorRoyality,
  blueCardLimit,
  yellowCardLimit,
  greenCardLimit,
  blueCardPercent
) => `INSERT INTO tbl_cycledate
  (fromdate, co_sponsor_royality, blue_card_limit, yellow_card_limit, green_card_limit, blue_card_percent)
  VALUES(
  (SELECT todate FROM 
  (SELECT todate  FROM tbl_cycledate cd
  ORDER BY id DESC LIMIT 1) AS fd)
  , ${coSponsorRoyality}, ${blueCardLimit}, ${yellowCardLimit}, ${greenCardLimit}, ${blueCardPercent})`;

const INSERT_CYCLE_ROWS = () => `INSERT INTO impact_prod.tbl_cycle_report
(adp_id, zone_value, bv, pbv, co_sponsor_royality, champion_earnings, oneplus_earnings, leaders_earnings, cycle_id, no_co_sponsored)
VALUES ?`;

const EXPIRE_CARDS = (cycleId) =>
  `UPDATE tbl_card tc SET tc.expiry_cycle=${cycleId} WHERE 
  tc.expiry_cycle IS NULL AND valid_cycles <= 
  (SELECT count(id) FROM tbl_cycledate WHERE todate >= tc.created_on)`;

const GET_COSPONSORED_NO = (adpId) =>
  `SELECT count(adp_id) as co_sponsored_no FROM tbl_adp WHERE co_sponsor_id= ${adpId}`;

const GET_LEADERS_DATA_FOR_ADP = (adpId) =>
  `WITH RECURSIVE link 
  AS (SELECT adp_id, sponsor_id, current_month_pbv FROM tbl_pbv 
  UNION ALL
  SELECT tp.adp_id, l.sponsor_id, tp.current_month_pbv FROM tbl_pbv tp JOIN link l ON tp.sponsor_id = l.adp_id
  ),
  gbv AS (SELECT sponsor_id,SUM(current_month_pbv) AS gbv FROM link GROUP BY sponsor_id),
  bv AS ( SELECT tp.adp_id, tp.sponsor_id, ifnull(tp.current_month_pbv + ifnull(g.gbv,0), 0) AS bv FROM tbl_pbv tp 
  LEFT JOIN gbv g ON tp.adp_id = g.sponsor_id WHERE tp.sponsor_id != '')
SELECT adp_id, bv FROM bv WHERE sponsor_id = ${adpId} ORDER BY bv DESC LIMIT 3`;

const IS_ADP_EXISTS = (adpId) => `SELECT EXISTS(
  SELECT adp_id FROM tbl_adp 
  WHERE adp_id = '${adpId}') 
  AS isExists`;

module.exports.GET_PBV_BY_ADP_ID = GET_PBV_BY_ADP_ID;
module.exports.GET_ALL_CHILD = GET_ALL_CHILD;
module.exports.INSERT_CO_SPONSOR_ROYALTY = INSERT_CO_SPONSOR_ROYALTY;
module.exports.SELECT_CO_SPONSOR_ROYALTY_MANAGEMENT = SELECT_CO_SPONSOR_ROYALTY_MANAGEMENT;
module.exports.GET_CO_SPONSOR_INCOME = GET_CO_SPONSOR_INCOME;
module.exports.GET_RETAIL_PROFIT = GET_RETAIL_PROFIT;
module.exports.SELECT_PZI_MANAGEMENT = SELECT_PZI_MANAGEMENT;
module.exports.GENERATE_STATEMENT_BY_ADP_ID = GENERATE_STATEMENT_BY_ADP_ID;
module.exports.GET_ALL_ADP_ID = GET_ALL_ADP_ID;
module.exports.GET_ALL_ADP_PBV_BY_CO_SPONSOR = GET_ALL_ADP_PBV_BY_CO_SPONSOR;
module.exports.GET_CO_SPONSOR_PLAN_VALUE = GET_CO_SPONSOR_PLAN_VALUE;
module.exports.GET_PLAN_ZONE = GET_PLAN_ZONE;
module.exports.GET_CO_OR_SPONSORED_ADP_LIST = GET_CO_OR_SPONSORED_ADP_LIST;
module.exports.GET_ADP_NAME_AND_SPONSOR_ID = GET_ADP_NAME_AND_SPONSOR_ID;
module.exports.GET_ADP_GBV = GET_ADP_GBV;
module.exports.GET_PLAN_TDS = GET_PLAN_TDS;
module.exports.GET_ELIGIBLE_SPRINTS = GET_ELIGIBLE_SPRINTS;
module.exports.GET_ADP_MISSING_SPRINT = GET_ADP_MISSING_SPRINT;
module.exports.GET_SPRINTERS = GET_SPRINTERS;
module.exports.GET_PARENTS = GET_PARENTS;
module.exports.GET_CHILDREN = GET_CHILDREN;
module.exports.GET_FRONTLINE_CHILDREN = GET_FRONTLINE_CHILDREN;
module.exports.IS_SPRINT_QUALIFIED = IS_SPRINT_QUALIFIED;
module.exports.GET_ALL_ADP = GET_ALL_ADP;
module.exports.GET_CO_SPONSOR_ROYALITY = GET_CO_SPONSOR_ROYALITY;
module.exports.GET_CHAMPION_DATA_FOR_ADP = GET_CHAMPION_DATA_FOR_ADP;
module.exports.IS_COUPON_EXISTS = IS_COUPON_EXISTS;
module.exports.ADD_VOUCHER = ADD_VOUCHER;
module.exports.GET_TOTAL_CARDS_FOR_ADP = GET_TOTAL_CARDS_FOR_ADP;
module.exports.GET_BLUE_CARDS_FOR_ADP = GET_BLUE_CARDS_FOR_ADP;
module.exports.INSERT_CYCLE_ROWS = INSERT_CYCLE_ROWS;
module.exports.INSERT_CYCLE_DATE = INSERT_CYCLE_DATE;
module.exports.EXPIRE_CARDS = EXPIRE_CARDS;
module.exports.GET_COSPONSORED_NO = GET_COSPONSORED_NO;
module.exports.GET_LEADERS_DATA_FOR_ADP = GET_LEADERS_DATA_FOR_ADP;
module.exports.IS_ADP_EXISTS = IS_ADP_EXISTS;

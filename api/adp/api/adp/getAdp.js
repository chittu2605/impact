const {
  GET_ADP_BY_PHONE,
  GET_CHILD_ADP,
  GET_NO_FRONT_LINES,
  GET_PERSONAL_NEW_JOININGS,
  GET_TOTAL_NEW_JOININGS,
  GET_TEAM_SIZE,
  GET_NO_CO_SPONSORED,
  GET_NEW_CO_SPONSORED,
  SEARCH_ADP,
} = require("../../adpQuery/adp/adp");
const { getSprinterData } = require("../../../functions/sprinter");
const {
  getLeadersDataForAdp,
  getPullEligibelChilds,
} = require("../../../functions/runCycleHelper");
const {
  getCardsOverflow,
  getTotalCardsOfADPForMonth,
} = require("../cardUtils");
const connection = require("../../../dbConnect");

const searchAdp = (adpId, term, field) =>
  new Promise((resolve, reject) =>
    connection.query(SEARCH_ADP(adpId, term, field), (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    })
  );

module.exports = (app) => {
  // const SELECT_ADP_BY_ADP_ID = require("../../dbQuery/adp/adpQuery").SELECT_ADP_BY_ADP_ID;
  // const SELECT_ADP_NAME_BY_ADP_ID = require("../../dbQuery/adp/adpQuery").SELECT_ADP_NAME_BY_ADP_ID;
  const GET_ADP_NAME_BY_ADP_ID = require("../../adpQuery/adp/adp")
    .GET_ADP_NAME_BY_ADP_ID;
  const connection = require("../../../dbConnect");
  const bodyParser = require("body-parser");
  const urlencodedParser = bodyParser.urlencoded({ extended: false });

  // app.get("/list-adp", urlencodedParser, async (req, res) => {
  //     const adp_subset = req.query.adp_subset;
  //     connection.query(SELECT_ADP_BY_ADP_ID(adp_subset), async (error, results, fields) => {
  //         if (error) return res.sendStatus("401");
  //         // if (results.length === 0) return res.sendStatus("404");

  //         return res.json({
  //             results
  //         });

  //     })

  // })

  // app.get("/adp-name", urlencodedParser, async (req, res) => {
  //     const adp_id = req.query.adp_id;
  //     connection.query(SELECT_ADP_NAME_BY_ADP_ID(adp_id), async (error, results, fields) => {
  //         if (error) return res.sendStatus("401");
  //         // if (results.length === 0) return res.sendStatus("404");

  //         return res.json({
  //             results
  //         });

  //     })

  // })

  app.get("/adp/get-adp-name", urlencodedParser, async (req, res) => {
    console.log(req.query);
    const adp_id = req.query.adp_id;
    connection.query(
      GET_ADP_NAME_BY_ADP_ID(adp_id),
      async (error, results, fields) => {
        console.log(error);
        if (error) return res.sendStatus("401");
        if (results.length === 0) return res.sendStatus("404");

        return res.json({
          result: `${results[0].firstname} ${results[0].lastname}`,
        });
      }
    );
  });

  app.get("/adp/check-line_adp", urlencodedParser, async (req, res) => {
    const sponsorId = req.user.adp_id;
    const adp_id = req.query.adp_id;
    connection.query(
      CHECK_CHILD_LINE(sponsorId, adp_id),
      async (error, results, fields) => {
        console.log(error);
        if (error) return res.sendStatus("401");
        // if (results.length === 0) return res.sendStatus("404");

        return res.json({
          result: results,
        });
      }
    );
  });

  app.get("/adp/get-front-line_adp", urlencodedParser, async (req, res) => {
    const sponsorId = req.query.sponsorId;
    connection.query(
      GET_CHILD_ADP(sponsorId),
      async (error, results, fields) => {
        console.log(error);
        if (error) return res.sendStatus("401");
        if (results.length === 0) return res.sendStatus("404");
        return res.json({
          result: results,
        });
      }
    );
  });

  app.get("/adp/get-sprinter-data", async (req, res) => {
    const adpId = req.user.adp_id;
    const sprinterData = await getSprinterData(adpId);
    res.json(sprinterData);
  });

  app.get("/adp/no-front-lines", async (req, res) => {
    const adpId = req.user.adp_id;
    connection.query(GET_NO_FRONT_LINES(adpId), (error, results, fields) => {
      if (!error && results.length) {
        res.json({ frontLines: results[0].frontLines });
      }
    });
  });

  app.get("/adp/no-co-sponsored", async (req, res) => {
    const adpId = req.user.adp_id;
    connection.query(GET_NO_CO_SPONSORED(adpId), (error, results, fields) => {
      if (!error && results.length) {
        res.json({ noCoSponsored: results[0].no_co_sponsored });
      }
    });
  });

  app.get("/adp/personal-new-joining", async (req, res) => {
    const adpId = req.user.adp_id;
    connection.query(
      GET_PERSONAL_NEW_JOININGS(adpId),
      (error, results, fields) => {
        if (!error && results.length) {
          res.json({ personalNewJoining: results[0].personal_new_joining });
        }
      }
    );
  });

  app.get("/adp/team-new-joining", async (req, res) => {
    const adpId = req.user.adp_id;
    connection.query(
      GET_TOTAL_NEW_JOININGS(adpId),
      (error, results, fields) => {
        if (!error && results.length) {
          res.json({ teamNewJoin: results[0].team_new_joining });
        }
      }
    );
  });

  app.get("/adp/new-co-sponsored", async (req, res) => {
    const adpId = req.user.adp_id;
    connection.query(GET_NEW_CO_SPONSORED(adpId), (error, results, fields) => {
      if (!error && results.length) {
        res.json({ newCosponsored: results[0].new_co_sponsored });
      }
    });
  });

  app.get("/adp/team-size", async (req, res) => {
    const adpId = req.user.adp_id;
    connection.query(GET_TEAM_SIZE(adpId), (error, results, fields) => {
      if (!error && results.length) {
        res.json({ teamSize: results[0].team_size });
      }
    });
  });

  app.get("/adp/get-cards-overflow", async (req, res) => {
    const adpId = req.user.adp_id;
    const overflow = await getCardsOverflow(adpId);
    res.json({ overflow });
  });

  app.get("/adp/total_one_plus_cards", async (req, res) => {
    const adpId = req.user.adp_id;
    const noCards = await getTotalCardsOfADPForMonth(adpId);
    res.json(noCards);
  });

  app.get("/adp/get-top3-frontline-bv", async (req, res) => {
    const adpId = req.user.adp_id;
    const topFrontlines = await getLeadersDataForAdp(adpId);
    res.json(topFrontlines);
  });

  app.get("/adp/get-pull-qualifiers", async (req, res) => {
    const adpId = req.user.adp_id;
    const pullQualifiers = await getPullEligibelChilds(adpId, 0, 20);
    res.json(pullQualifiers);
  });

  app.get("/adp/search-adp/:term", async (req, res) => {
    const adpId = req.user.adp_id;
    const term = req.params.term;
    const type = req.query.type ? req.query.type : "firstname";
    const adpDetails = await searchAdp(adpId, term, type);
    if (!adpDetails) {
      res.sendStatus(404);
    } else {
      res.json(adpDetails);
    }
  });
};

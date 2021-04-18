const connection = require("../../../dbConnect");
const {
  TOTAL_TURNOVER,
  MONTHLY_TURNOVER,
  TOTAL_MONEY,
  MONTHLY_MONEY,
  TOTAL_ADP,
  NEW_ADP,
  NEW_ADP_GBV,
  GET_CHAMPION_POINTS,
  GET_CHAMPION_PERCENT,
  GET_CHAMPION_QUALIFIERS,
  GET_ONE_PLUS_PERCENT,
  GET_TOTAL_ONE_PLUS_CARDS,
  GET_ONE_PLUS_CARD_DETAILS,
  GET_LEADERS_CLUB_POINTS,
  GET_LEADERS_CLUB_QUALIFIERS,
  GET_LEADERS_FUND_PERCENT,
  GET_TOTAL_ORDERS,
  GET_ORDERS_DATA,
} = require("../../dbQuery/stats/stats");

const getTotalTurnover = () => {
  return new Promise((resolve, reject) => {
    connection.query(TOTAL_TURNOVER(), (error, result, fields) => {
      if (!error) {
        if (result[0]) {
          resolve(result[0].ttv);
        }
        resolve("");
      } else {
        reject(error);
      }
    });
  });
};

const getMonthlyTurnover = () => {
  return new Promise((resolve, reject) => {
    connection.query(MONTHLY_TURNOVER(), (error, result, fields) => {
      if (!error) {
        if (result[0]) {
          resolve(result[0].mtv);
        }
        resolve("");
      } else {
        reject(error);
      }
    });
  });
};

const getTotalMoney = () => {
  return new Promise((resolve, reject) => {
    connection.query(TOTAL_MONEY(), (error, result, fields) => {
      if (!error) {
        if (result[0]) {
          resolve(result[0].tm);
        }
        resolve("");
      } else {
        reject(error);
      }
    });
  });
};

const getMonthlyMoney = () => {
  return new Promise((resolve, reject) => {
    connection.query(MONTHLY_MONEY(), (error, result, fields) => {
      if (!error) {
        if (result[0]) {
          resolve(result[0].mm);
        }
        resolve("");
      } else {
        reject(error);
      }
    });
  });
};

const getTotalADP = () => {
  return new Promise((resolve, reject) => {
    connection.query(TOTAL_ADP(), (error, result, fields) => {
      if (!error) {
        if (result[0]) {
          resolve(result[0].ta);
        }
        resolve("");
      } else {
        reject(error);
      }
    });
  });
};

const getNewAdp = () => {
  return new Promise((resolve, reject) => {
    connection.query(NEW_ADP(), (error, result, fields) => {
      if (!error) {
        if (result[0]) {
          resolve(result[0].na);
        }
        resolve("");
      } else {
        reject(error);
      }
    });
  });
};

const getNewJoiningBV = () => {
  return new Promise((resolve, reject) => {
    connection.query(NEW_ADP_GBV(), (error, result, fields) => {
      if (!error) {
        if (result[0]) {
          resolve(result[0].njbv);
        }
        resolve("");
      } else {
        reject(error);
      }
    });
  });
};

const getChampionPoints = (prevCycleLimit) => {
  return new Promise((resolve, reject) => {
    connection.query(
      GET_CHAMPION_POINTS(prevCycleLimit),
      (error, result, fields) => {
        if (!error) {
          if (result[0]) {
            resolve(result[0]);
          }
          resolve("");
        } else {
          reject(error);
        }
      }
    );
  });
};

const getChampionFundPercent = () => {
  return new Promise((resolve, reject) => {
    connection.query(GET_CHAMPION_PERCENT(), (error, result, fields) => {
      if (!error) {
        if (result[0]) {
          resolve(result[0].value);
        }
        resolve("");
      } else {
        reject(error);
      }
    });
  });
};

const getChampionQualifiers = (offset, rowCount, prevCycleLimit) => {
  return new Promise((resolve, reject) => {
    connection.query(
      GET_CHAMPION_QUALIFIERS(offset, rowCount, prevCycleLimit),
      (error, results, fields) => {
        if (!error && results.length > 0) {
          resolve(results);
        } else {
          resolve([]);
        }
      }
    );
  });
};

const getOnePlusFundPercent = () => {
  return new Promise((resolve, reject) => {
    connection.query(GET_ONE_PLUS_PERCENT(), (error, result, fields) => {
      if (!error) {
        if (result[0]) {
          resolve(result[0].value);
        }
        resolve("");
      } else {
        reject(error);
      }
    });
  });
};

const getTotalOnePlusCards = () => {
  return new Promise((resolve, reject) => {
    connection.query(GET_TOTAL_ONE_PLUS_CARDS(), (error, result, fields) => {
      if (!error) {
        if (result[0]) {
          resolve(result[0]);
        }
        resolve("");
      } else {
        reject(error);
      }
    });
  });
};

const getOnePlusCardDetails = () => {
  return new Promise((resolve, reject) => {
    connection.query(GET_ONE_PLUS_CARD_DETAILS(), (error, results, fields) => {
      if (!error && results.length > 0) {
        resolve(results);
      } else {
        resolve([]);
      }
    });
  });
};

const getLeadersPoints = () => {
  return new Promise((resolve, reject) => {
    connection.query(GET_LEADERS_CLUB_POINTS(), (error, result, fields) => {
      if (!error) {
        if (result[0]) {
          resolve(result[0]);
        }
        resolve("");
      } else {
        reject(error);
      }
    });
  });
};

const getLeadersFundPercent = () => {
  return new Promise((resolve, reject) => {
    connection.query(GET_LEADERS_FUND_PERCENT(), (error, result, fields) => {
      if (!error) {
        if (result[0]) {
          resolve(result[0].value);
        }
        resolve("");
      } else {
        reject(error);
      }
    });
  });
};

const getTotalOrders = () => {
  return new Promise((resolve, reject) => {
    connection.query(GET_TOTAL_ORDERS(), (error, result, fields) => {
      if (!error) {
        if (result[0]) {
          resolve({ totalOrders: result[0].total_orders });
        }
        resolve("");
      } else {
        reject(error);
      }
    });
  });
};

const getOrdersData = (limit, count) => {
  return new Promise((resolve, reject) => {
    connection.query(GET_ORDERS_DATA(limit, count), (error, result, fields) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const getLeadersQualifiers = (offset, rowCount) => {
  return new Promise((resolve, reject) => {
    connection.query(
      GET_LEADERS_CLUB_QUALIFIERS(offset, rowCount),
      (error, results, fields) => {
        if (!error && results.length > 0) {
          resolve(results);
        } else {
          resolve([]);
        }
      }
    );
  });
};

module.exports.app = (app) => {
  app.get("/admin/total-turnover", async (req, res) => {
    const result = await getTotalTurnover();
    res.status(200);
    if (result) {
      res.send(result.toString());
    } else {
      res.send("Not Available");
    }
  });

  app.get("/admin/monthly-turnover", async (req, res) => {
    const result = await getMonthlyTurnover();
    res.status(200);
    if (result) {
      res.send(result.toString());
    } else {
      res.send("Not Available");
    }
  });

  app.get("/admin/total-money", async (req, res) => {
    const result = await getTotalMoney();
    res.status(200);
    if (result) {
      res.send(result.toString());
    } else {
      res.send("Not Available");
    }
  });

  app.get("/admin/monthly-money", async (req, res) => {
    const result = await getMonthlyMoney();
    res.status(200);
    res.send(result.toString());
  });

  app.get("/admin/total-adp", async (req, res) => {
    const result = await getTotalADP();
    res.status(200);
    if (result) {
      res.send(result.toString());
    } else {
      res.send("Not Available");
    }
  });

  app.get("/admin/new-adp", async (req, res) => {
    const result = await getNewAdp();
    res.status(200);
    if (result) {
      res.send(result.toString());
    } else {
      res.send("Not Available");
    }
  });

  app.get("/admin/new-joining-bv", async (req, res) => {
    const result = await getNewJoiningBV();
    res.status(200);
    if (result) {
      res.send(result.toString());
    } else {
      res.send("Not Available");
    }
  });

  app.get("/admin/get-champion-data", async (req, res) => {
    try {
      const totalPoints = (await getChampionPoints(0)).total_points;
      const percent = await getChampionFundPercent();
      res.status(200);
      res.send({
        percent,
        totalPoints,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  });

  app.get("/admin/get-one-plus-one-data", async (req, res) => {
    try {
      const totalPoints = (await getTotalOnePlusCards()).no_cards;
      const percent = await getOnePlusFundPercent();
      res.status(200);
      res.send({
        percent,
        totalPoints,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  });

  app.get("/admin/get-champion-qualifiers", async (req, res) => {
    const result = await getChampionQualifiers();
    if (result) {
      res.json(result);
    } else {
      res.status(400);
      res.send("Not Available");
    }
  });

  app.get("/admin/get-one-plus-cards", async (req, res) => {
    const result = await getOnePlusCardDetails();
    if (result) {
      res.json(result);
    } else {
      res.status(400);
      res.send("Not Available");
    }
  });

  app.get("/admin/get-leaders-data", async (req, res) => {
    try {
      const leadersPoints = await getLeadersPoints();
      const percent = await getLeadersFundPercent();
      res.status(200);
      res.send({
        percent,
        totalPoints: leadersPoints.total_points,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  });

  app.get("/admin/get-leaders-qualifiers", async (req, res) => {
    const result = await getLeadersQualifiers();
    if (result) {
      res.json(result);
    } else {
      res.status(400);
      res.send("Not Available");
    }
  });

  app.get("/admin/get-total-orders", async (req, res) => {
    const result = await getTotalOrders();
    if (result) {
      res.json(result);
    } else {
      res.status(400);
      res.send("Not Available");
    }
  });

  app.get("/admin/get-orders-data/:page/:count", async (req, res) => {
    const page = req.params.page;
    const count = req.params.count;
    const result = await getOrdersData(page * count, count);
    if (result) {
      res.json(result);
    } else {
      res.status(400);
      res.send("Not Available");
    }
  });
};

module.exports.getMonthlyMoney = getMonthlyMoney;
module.exports.getChampionFundPercent = getChampionFundPercent;
module.exports.getChampionPoints = getChampionPoints;
module.exports.getOnePlusFundPercent = getOnePlusFundPercent;
module.exports.getTotalOnePlusCards = getTotalOnePlusCards;
module.exports.getLeadersFundPercent = getLeadersFundPercent;
module.exports.getLeadersPoints = getLeadersPoints;
module.exports.getLeadersQualifiers = getLeadersQualifiers;
module.exports.getChampionQualifiers = getChampionQualifiers;

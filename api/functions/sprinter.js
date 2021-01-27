const {
  GET_SPRINTERS,
  GET_CHILDREN,
  GET_FRONTLINE_CHILDREN,
  GET_ELIGIBLE_SPRINTS,
  GET_ADP_MISSING_SPRINT,
} = require("./query");
const connection = require("../dbConnect");

const getEligibleSprintIDs = () => {
  return new Promise((resolve, reject) => {
    connection.query(GET_ELIGIBLE_SPRINTS(), (error, results) => {
      if (!error) {
        var adpIds = [];
        results.forEach((result) => adpIds.push(result.adp_id));
        resolve(adpIds);
      } else {
        reject(error);
      }
    });
  });
};

const getADPMissingSPrint = () => {
  return new Promise((resolve, reject) => {
    connection.query(GET_ADP_MISSING_SPRINT(), (error, results) => {
      if (!error) {
        var adpIds = [];
        results.forEach((result) => adpIds.push(result.adp_id));
        resolve(adpIds);
      } else {
        reject(error);
      }
    });
  });
};

const getEligibleSprinters = async () => await getSprinters();

const getSprinters = () =>
  new Promise((resolve, rejet) =>
    connection.query(GET_SPRINTERS(), (error, results, fields) => {
      let sprinters = [];
      if (!error && results.length > 0) {
        results.forEach((result) => {
          sprinters.push({
            sprinterId: result.adp_id,
            noVouchers: Math.floor(result.sprint_lines / 3),
          });
        });
      }
      resolve(sprinters);
    })
  );

const getSprinterData = async (adpId) => {
  const sprinterData = {
    sprintsUnder: [],
    sprintersUnder: [],
    sprintsFrontLines: [],
    sprinterFrontLines: [],
    noVouchers: 0,
  };
  const sprintIds = await getEligibleSprintIDs();
  const sprinterIds = [];
  if (sprintIds.includes(adpId)) {
    sprinterData.sprintsUnder.push(adpId.toString());
  } else {
    const sprinters = await getEligibleSprinters();
    for (sprinter of sprinters) {
      sprinterIds.push(sprinter.sprinterId);
      if (sprinter.sprinterId == adpId) {
        sprinterData.sprintersUnder.push(adpId.toString());
        sprinterData.noVouchers = sprinter.noVouchers;
      }
    }
    const frontLines = await getFrontLineChildren(adpId);
    for (let frontLine of frontLines) {
      if (sprintIds.includes(frontLine)) {
        sprinterData.sprintsUnder.push(frontLine);
      } else if (sprinterIds.includes(frontLine)) {
        sprinterData.sprintersUnder.push(frontLine);
      } else {
        const children = await getChildren(frontLine);
        for (let child of children) {
          if (sprintIds.includes(child)) {
            sprinterData.sprintsUnder.push(child);
            if (!sprinterData.sprintsFrontLines.includes(frontLine)) {
              sprinterData.sprintsFrontLines.push(frontLine);
            }
          } else if (sprinterIds.includes(child)) {
            sprinterData.sprintersUnder.push(child);
            if (!sprinterData.sprinterFrontLines.includes(frontLine)) {
              sprinterData.sprinterFrontLines.push(frontLine);
            }
          }
        }
      }
    }
  }
  return sprinterData;
};

const getFrontLineChildren = (adpId) =>
  new Promise((resolve, reject) =>
    connection.query(
      GET_FRONTLINE_CHILDREN(adpId),
      (error, results, fields) => {
        let frontLine = [];
        if (!error && results.length > 0) {
          for (result of results) {
            frontLine.push(result.adp_id);
          }
        }
        resolve(frontLine);
      }
    )
  );

const getChildren = (adpId) =>
  new Promise((resolve, reject) =>
    connection.query(GET_CHILDREN(adpId), (error, results, fields) => {
      let children = [];
      if (!error && results.length > 0) {
        for (result of results) {
          children.push(result.adp_id);
        }
      }
      resolve(children);
    })
  );

module.exports.getEligibleSprinters = getEligibleSprinters;
module.exports.getEligibleSprintIDs = getEligibleSprintIDs;
module.exports.getADPMissingSPrint = getADPMissingSPrint;
module.exports.getSprinterData = getSprinterData;

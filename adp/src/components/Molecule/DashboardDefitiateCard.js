import React from "react";
import { Card } from "@material-ui/core";
import { CardHeader, CardTitle, CardBody, CardFooter } from "reactstrap";
import { apiHandler } from "config/apiConfig";
import { connect } from "react-redux";

class DashboardDefitiateCard extends React.Component {
  state = {
    pbv: "",
    totalPbv: "",
    newGbv: "",
    totalGbv: "",
    coSponsorIncome: 0,
    total_retail_profit: 0,
    deficitZone: "",
    deficitValue: 0,
    deficitZoneColor: "red",
    showSprintDeficit: false,
    sprintDeficit: 0,
    sprintDeficitColor: "red",
    bv: 0,
    bvTillDate: 0,
    frontLines: 0,
    cardOverflow: 0,
    totalOnePlusCards: 0,
    personalNewJoining: 0,
    teamNewJoin: 0,
    teamSize: 0,
    leadersLine1BV: 0,
    leaderBV1Color: "red",
    leadersLine2BV: 0,
    leaderBV2Color: "red",
    leadersLine3BV: 0,
    leaderBV3Color: "red",
    noCoSponsored: 0,
    newCoSponsored: 0,
  };

  componentDidMount = () => {
    this.getPbvDetails();
    this.getGbvDetails();
    this.getBvDetails();
    this.fetchCoSponsorIncome();
    this.fetchRetailProfit();
    this.getDeficitZone();
    this.getNoFrontLines();
    this.fetchBlueCardOverflow();
    this.fetchTop3frontlines();
    this.fetchTotalOnePlusCards();
    this.getPersonalNewJoining();
    this.getTeamNewJoining();
    this.getTotalTeamSize();
    this.getNoCoSponsered();
    this.getNewCoSponsered();
  };

  getPbvDetails = () => {
    getPbv().then((response) => {
      if (
        response &&
        response.data &&
        response.data.results &&
        response.data.results.length > 0
      ) {
        this.setState({
          pbv: response.data.results[0].current_month_pbv,
          totalPbv: response.data.results[0].pbv,
        });
      }
    });
  };

  getGbvDetails = () => {
    getGbv().then((response) => {
      if (response && response.data) {
        this.setState({
          newGbv: response.data.newGbv,
          totalGbv: response.data.totalGbv,
        });
      }
    });
  };

  fetchCoSponsorIncome = () => {
    getCoSponsorIncome().then((response) => {
      if (response && response.data) {
        this.setState({
          coSponsorIncome: response.data.co_sponsor_income,
        });
      }
    });
  };

  fetchRetailProfit = () => {
    getRetailProfit().then((response) => {
      if (response && response.data) {
        this.setState({
          total_retail_profit: response.data.total_retail_profit,
        });
      }
    });
  };

  fetchDeficitZone = () => {
    getRetailProfit().then((response) => {
      if (response && response.data) {
        this.setState({
          total_retail_profit: response.data.total_retail_profit,
        });
      }
    });
  };

  getNoFrontLines = () => {
    getNoFrontLines().then((response) => {
      if (response && response.data && response.data.frontLines) {
        this.setState({
          frontLines: response.data.frontLines,
        });
      }
    });
  };

  getNoCoSponsered = () => {
    getNoCoSponsered().then((response) => {
      if (response && response.data && response.data.noCoSponsored) {
        this.setState({
          noCoSponsored: response.data.noCoSponsored,
        });
      }
    });
  };

  getNewCoSponsered = () => {
    getNewCoSponsered().then((response) => {
      if (response && response.data && response.data.newCosponsored) {
        this.setState({
          newCoSponsored: response.data.newCosponsored,
        });
      }
    });
  };

  getPersonalNewJoining = () => {
    getPersonalNewJoining().then((response) => {
      if (response && response.data && response.data.personalNewJoining) {
        this.setState({
          personalNewJoining: response.data.personalNewJoining,
        });
      }
    });
  };

  getTeamNewJoining = () => {
    getTeamNewJoining().then((response) => {
      if (response && response.data && response.data.teamNewJoin) {
        this.setState({
          teamNewJoin: response.data.teamNewJoin,
        });
      }
    });
  };

  getTotalTeamSize = () => {
    getTotalTeamSize().then((response) => {
      if (response && response.data && response.data.teamSize) {
        this.setState({
          teamSize: response.data.teamSize + 1,
        });
      }
    });
  };

  getDeficitZone = () => {
    getDeficitZone().then((response) => {
      if (response && response.data && response.data.deficitZone === false) {
        this.setState({
          deficitZoneColor: "green",
          deficitZone: "",
          deficitValue: "QUALIFIED",
        });
      } else {
        this.setState({
          deficitZone: response.data.deficitZone,
          deficitValue: response.data.deficitValue + " BV",
        });
      }
    });
  };

  getBvDetails = () => {
    getBv().then((response) => {
      if (response && response.data) {
        this.setState({
          bv: response.data.bv,
          bvTillDate: response.data.bvTillDate,
        });
        this.updateSprintDeficit();
      }
    });
  };

  fetchBlueCardOverflow = () => {
    getBlueCardOverflow().then((response) => {
      if (response && response.data) {
        this.setState({ cardOverflow: response.data.overflow });
      }
    });
  };

  fetchTotalOnePlusCards = () => {
    getTotalOnePlusCards().then((response) => {
      if (response && response.data) {
        this.setState({ totalOnePlusCards: response.data.noCards });
      }
    });
  };

  fetchTop3frontlines = () => {
    getTop3frontlines().then((response) => {
      if (response && response.data) {
        let line1Amt = response.data[0] ? response.data[0].bv : 0;
        let line2Amt = response.data[1] ? response.data[1].bv : 0;
        let line3Amt = response.data[2] ? response.data[2].bv : 0;
        let line1Color = "red";
        let line2Color = "red";
        let line3Color = "red";
        let line1Postfix = "BV Required";
        let line2Postfix = "BV Required";
        let line3Postfix = "BV Required";
        let line2BaseValue = 28000;
        let line3BaseValue = 16000;
        if (line1Amt >= 40000) {
          line1Color = "green";
          line1Postfix = "Qualified";
          line2BaseValue = (70 * line1Amt) / 100;
          line3BaseValue = (40 * line1Amt) / 100;
        } else {
          line1Amt = 40000 - line1Amt;
        }
        if (line2Amt >= line2BaseValue) {
          line2Color = "green";
          line2Postfix = "Qualified";
        } else {
          line2Amt = line2BaseValue - line2Amt;
        }
        if (line3Amt >= line3BaseValue) {
          line3Color = "green";
          line3Postfix = "Qualified";
        } else {
          line3Amt = line3BaseValue - line3Amt;
        }
        this.setState({
          leadersLine1BV: line1Amt + " " + line1Postfix,
          leaderBV1Color: line1Color,
          leadersLine2BV: line2Amt + " " + line2Postfix,
          leaderBV2Color: line2Color,
          leadersLine3BV: line3Amt + " " + line3Postfix,
          leaderBV3Color: line3Color,
        });
      }
    });
  };

  updateSprintDeficit = async () => {
    const prevBv = this.state.bvTillDate - this.state.bv;
    if (this.state.deficitZone === "Business") {
      this.setState({
        showSprintDeficit: true,
      });
      const reamingAmt = 8000 - this.state.bv;
      if (reamingAmt > 0) {
        this.setState({
          sprintDeficit: reamingAmt + " BV",
          sprintDeficitColor: "red",
        });
      } else {
        this.setState({
          sprintDeficit: "QUALIFIED",
          sprintDeficitColor: "green",
        });
      }
    }
  };
  render() {
    let {
      pbv,
      bv,
      totalPbv,
      newGbv,
      totalGbv,
      coSponsorIncome,
      total_retail_profit,
      deficitZoneColor,
      showSprintDeficit,
      deficitZone,
      deficitValue,
      sprintDeficit,
      sprintDeficitColor,
      frontLines,
      bvTillDate,
      cardOverflow,
      totalOnePlusCards,
      leadersLine1BV,
      leadersLine2BV,
      leadersLine3BV,
      leaderBV1Color,
      leaderBV2Color,
      leaderBV3Color,
      personalNewJoining,
      teamNewJoin,
      teamSize,
      noCoSponsored,
      newCoSponsored,
    } = this.state;
    let championDifference =
      totalGbv < 20000 ? 20000 - totalGbv + " GBV" : 5000 - pbv + " PBV";
    let champDeficitColor = "green";
    if ((totalGbv < 20000) | (frontLines < 2) | (pbv < 5000)) {
      champDeficitColor = "red";
    } else {
      championDifference = "Qualified";
    }
    if (frontLines < 2) {
      if (totalGbv < 20000) {
        championDifference += " and " + (2 - frontLines) + " frontlines";
      } else {
        championDifference = 2 - frontLines + " frontline";
      }
    }
    let championCoSponsorColor = "green";
    let championCoSponsorDeficit = "Qualified";
    if (newGbv < 12000) {
      championCoSponsorColor = "red";
      if (newGbv < 12000) {
        championCoSponsorDeficit = 12000 - newGbv + " GBV Required";
      }
    }
    if (newCoSponsored < 5) {
      if (newGbv < 12000) {
        championCoSponsorDeficit +=
          " and " + (5 - newCoSponsored) + " Cosponsor(s) Required";
      } else {
        championCoSponsorColor = "red";
        championCoSponsorDeficit =
          5 - newCoSponsored + " Cosponsor(s) Required";
      }
    }

    return (
      <Card className="">
        <CardHeader style={{ backgroundColor: "red" }}>
          <h5 className="card-category" style={{ color: "white" }}></h5>
          <CardTitle tag="h4" style={{ color: "white" }}>
            Team Summary
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    text: `Namaste ${this.props.name}:

*Your overall team performance in current month is as follows:*
                      
PERSONAL CO-SPONSORED : *${personalNewJoining}*
                      
CURRENT MONTH TEAM NEW JOINING : *${teamNewJoin}*
                      
TEAM SIZE : *${teamSize}*
                      
FRONT LINES : *${frontLines}*
                      
REPURCHASE PER MEMBER : *${Math.round(teamSize === 0 ? 0 : bv / teamSize)}*
                      
JOINING PER MEMBER : *${parseFloat(
                      teamSize === 0 ? 0 : teamNewJoin / teamSize
                    ).toFixed(2)}*
                      
RETAIL PROFIT : *${total_retail_profit} RS*
                      
CO SPONSOR ROYALTY : *${coSponsorIncome} RS* 
                      
DEFICIT FOR ${deficitZone.toUpperCase()} ZONE : *${deficitValue}*
                      
DEFICIT FOR CHAMPIONS CLUB : *${championDifference}*
                      
CHAMPIONS CLUB CO-SPONSOR DEFICIT : *${championCoSponsorDeficit}*
                      
DEFICIT FOR BLUE CARD : *${11000 - cardOverflow} BV ${
                      noCoSponsored < 3
                        ? 3 - noCoSponsored + " Cosponsor Required"
                        : ""
                    }*
                      
TOTAL 1+1 CARD THIS MONTH : *${totalOnePlusCards}*
                      
LEADER'S CLUB : *${leadersLine1BV} | ${leadersLine2BV} | ${leadersLine3BV}*
                      
Wish you success and more team income by end of Business cycle!!!
                      
Take support from your upline leaders. Impact Team is there to support you.`,
                  });
                }
              }}
            >
              <i
                class="fa fa-share-alt"
                style={{ fontSize: "30px", color: "white", float: "right" }}
              />
            </span>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <div className="">
            <p>PERSONAL CO-SPONSORED : {personalNewJoining}</p>
            <p>CURRENT MONTH TEAM NEW JOINING : {teamNewJoin}</p>
            <p>TEAM SIZE : {teamSize}</p>
            <p>FRONT LINES : {frontLines}</p>
            <p>
              REPURCHASE PER MEMBER :{" "}
              {Math.round(teamSize === 0 ? 0 : bv / teamSize)}
            </p>
            <p>
              JOINING PER MEMBER :{" "}
              {parseFloat(teamSize === 0 ? 0 : teamNewJoin / teamSize).toFixed(
                2
              )}
            </p>
            <p>RETAIL PROFIT : Rs{" " + total_retail_profit}</p>
            <p>CO SPONSOR ROYALTY : Rs {" " + coSponsorIncome}</p>
            {
              <p>
                DEFICIT FOR {deficitZone} ZONE :{" "}
                <span style={{ color: deficitZoneColor }}>{deficitValue}</span>
              </p>
            }
            {showSprintDeficit && (
              <p>
                SPRINT DEFICIT :
                <span style={{ color: sprintDeficitColor }}>
                  {" " + sprintDeficit}
                </span>
              </p>
            )}
            <p>
              DEFICIT FOR CHAMPIONS CLUB :{" "}
              <span style={{ color: champDeficitColor }}>
                {" " + championDifference}
              </span>
            </p>
            <p>
              CHAMPIONS CLUB CO-SPONSOR DEFICIT :{" "}
              <span style={{ color: championCoSponsorColor }}>
                {" " + championCoSponsorDeficit}
              </span>
            </p>
            <p>
              DEFICIT FOR BLUE CARD : {11000 - cardOverflow} BV{" "}
              {noCoSponsored < 3 ? (
                <span style={{ color: "red" }}>
                  ({3 - noCoSponsored} cosponsor Required)
                </span>
              ) : (
                <span />
              )}
            </p>
            <p>TOTAL 1+1 CARD THIS MONTH : {totalOnePlusCards}</p>
            <p>
              LEADER'S CLUB :{" "}
              <span style={{ color: leaderBV1Color }}>{leadersLine1BV}</span> |{" "}
              <span style={{ color: leaderBV2Color }}>{leadersLine2BV}</span> |{" "}
              <span style={{ color: leaderBV3Color }}>{leadersLine3BV}</span>
            </p>
            <p>MEB DEFICIT : </p>
          </div>
        </CardBody>
        <CardFooter>
          <div className="stats">
            <i className="now-ui-icons arrows-1_refresh-69" /> Just Updated
          </div>
        </CardFooter>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.updateLoginStatus.name,
  };
};

const connector = connect(mapStateToProps);

export default connector(DashboardDefitiateCard);

function getPbv() {
  return apiHandler.get("/pbv");
}

function getGbv() {
  return apiHandler.get("/gbv");
}

function getCoSponsorIncome() {
  return apiHandler.get("/co-sponsor-income");
}

function getRetailProfit() {
  return apiHandler.get("/retail-profit");
}

function getDeficitZone() {
  return apiHandler.get("/deficit-zone");
}

function getNoFrontLines() {
  return apiHandler.get("/no-front-lines");
}
function getNoCoSponsered() {
  return apiHandler.get("/no-co-sponsored");
}
function getNewCoSponsered() {
  return apiHandler.get("/new-co-sponsored");
}

function getPersonalNewJoining() {
  return apiHandler.get("/personal-new-joining");
}

function getTeamNewJoining() {
  return apiHandler.get("/team-new-joining");
}

function getTotalTeamSize() {
  return apiHandler.get("/team-size");
}
function getBv() {
  return apiHandler.get("/bv");
}

function getBlueCardOverflow() {
  return apiHandler.get("/get-cards-overflow");
}

function getTotalOnePlusCards() {
  return apiHandler.get("/total_one_plus_cards");
}

function getTop3frontlines() {
  return apiHandler.get("/get-top3-frontline-bv");
}

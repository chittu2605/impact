import React from "react";
import { Card } from "@material-ui/core";
import { CardHeader, CardTitle, CardBody, CardFooter } from "reactstrap";
import { apiHandler } from "config/apiConfig";

class DashboardDefitiateCard extends React.Component {
  state = {
    pbv: "",
    totalPbv: "",
    gbv: "",
    totalGbv: "",
    coSponsorIncome: 0,
    total_retail_profit: 0,
    deficitZone: "",
    deficitValue: 0,
    showDeficitZone: true,
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
          gbv: response.data.gbv,
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
          teamSize: (response.data.teamSize)+1,
        });
      }
    });
  };

  getDeficitZone = () => {
    getDeficitZone().then((response) => {
      if (response && response.data && response.data.deficitZone === false) {
        this.setState({
          showDeficitZone: false,
        });
      } else {
        this.setState({
          showDeficitZone: true,
          deficitZone: response.data.deficitZone,
          deficitValue: response.data.deficitValue,
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
        const line1Amt = response.data[0] ? response.data[0].bv : 0;
        const line2Amt = response.data[1] ? response.data[1].bv : 0;
        const line3Amt = response.data[2] ? response.data[2].bv : 0;
        let line1Color = "red";
        let line2BaseValue = 28000;
        let line3BaseValue = 16000;
        if (line1Amt >= 40000) {
          line1Color = "green";
          line2BaseValue = (70 * line1Amt) / 100;
          line3BaseValue = (40 * line1Amt) / 100;
        }
        const line2Color = line2Amt < line2BaseValue ? "red" : "green";
        const line3Color = line3Amt < line3BaseValue ? "red" : "green";
        this.setState({
          leadersLine1BV: line1Amt,
          leaderBV1Color: line1Color,
          leadersLine2BV: line2Amt,
          leaderBV2Color: line2Color,
          leadersLine3BV: line3Amt,
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
      gbv,
      totalGbv,
      coSponsorIncome,
      total_retail_profit,
      showDeficitZone,
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
    return (
      <Card className="">
        <CardHeader>
          <h5 className="card-category"></h5>
          <CardTitle tag="h4">Team Summary</CardTitle>
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
            {showDeficitZone && (
              <p>
                DEFICIT FOR {deficitZone} ZONE : {deficitValue} BV
              </p>
            )}
            {showSprintDeficit && (
              <p>
                SPRINT DEFICIT :
                <span style={{ color: sprintDeficitColor }}>
                  {" " + sprintDeficit} BV
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
              DEFICIT FOR BLUE CARD : {11000 - cardOverflow} BV{" "}
              {noCoSponsored < 3 ? (
                <span style={{ color: "red" }}>
                  ({3 - noCoSponsored} cosponsor required)
                </span>
              ) : (
                <span />
              )}
            </p>
            <p>TOTAL 1+1 CARD THIS MONTH : {totalOnePlusCards}</p>
            <p>
              LEADER'S CLUB :{" "}
              <span style={{ color: leaderBV1Color }}>
                {leadersLine1BV + " BV"}
              </span>{" "}
              |{" "}
              <span style={{ color: leaderBV2Color }}>
                {leadersLine2BV + " BV"}
              </span>{" "}
              |{" "}
              <span style={{ color: leaderBV3Color }}>
                {leadersLine3BV + " BV"}
              </span>
            </p>
            <p>MEB DEFICIT : </p>
            <p>INCOME FROM PULL : </p>
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

export default DashboardDefitiateCard;

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

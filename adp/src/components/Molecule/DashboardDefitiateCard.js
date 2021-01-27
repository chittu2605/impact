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
    leadersLine1Deficit: 0,
    leadersLine2Deficit: 0,
    leadersLine3Deficit: 0,
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

  getDeficitZone = () => {
    getDeficitZone().then((response) => {
      console.log(response.data);
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
        const line1Deficit = line1Amt > 40000 ? 0 : 40000 - line1Amt;
        const line2Deficit =
          line1Deficit === 0
            ? (line1Amt * 70) / 100 - line2Amt
            : 28000 - line2Amt;
        const line3Deficit =
          line1Deficit === 0
            ? (line1Amt * 40) / 100 - line3Amt
            : 16000 - line3Amt;
        this.setState({
          leadersLine1Deficit: line1Deficit,
          leadersLine2Deficit: line2Deficit > 0 ? line2Deficit : 0,
          leadersLine3Deficit: line3Deficit > 0 ? line3Deficit : 0,
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
      leadersLine1Deficit,
      leadersLine2Deficit,
      leadersLine3Deficit,
    } = this.state;
    const displayChampionDeficit = totalGbv >= 20000 && frontLines > 2;
    const championDifference = 5000 - pbv;
    let championDeficit;
    let champDeficitColor;
    if (championDifference > 0) {
      championDeficit = championDifference + " BV";
      champDeficitColor = "red";
    } else {
      championDeficit = "Qualified";
      champDeficitColor = "green";
    }
    return (
      <Card className="">
        <CardHeader>
          <h5 className="card-category"></h5>
          <CardTitle tag="h4">Team Summary</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="">
            <p>PERSONAL NEW JOINING : own</p>
            <p>CURRENT MONTH TEAM NEW JOINING : own + total downline</p>
            <p>TEAM SIZE : own + total downline</p>
            <p>FRONT LINES : {frontLines}</p>
            <p>REPURCHASE PER MEMBER : CURRENT MONTH BV / TEAM SIZE</p>
            <p>JOINING PER MEMBER : CURRENT MONTH NEW JOINING / TEAM SIZE</p>
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
            {displayChampionDeficit && (
              <p>
                DEFICIT FOR CHAMPIONS CLUB :{" "}
                <span style={{ color: champDeficitColor }}>
                  {" " + championDeficit}
                </span>
              </p>
            )}
            <p>
              DEFICIT FOR BLUE CARD : {11000 - cardOverflow} BV{" "}
              <span style={{ color: "red" }}>(3 cosponsor)</span>
            </p>
            <p>TOTAL 1+1 CARD THIS MONTH : {totalOnePlusCards}</p>
            <p>
              LEADER'S CLUB DEFICIT :{" "}
              {`${leadersLine1Deficit} | ${leadersLine2Deficit} | ${leadersLine3Deficit}`}
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

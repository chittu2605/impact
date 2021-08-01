import React from "react";
import { Card } from "@material-ui/core";
import {
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { apiHandler } from "config/apiConfig";
import { connect } from "react-redux";
import PullDetails from "./PullDetails";

class DashboardSummaryCard extends React.Component {
  state = {
    pbv: "",
    totalPbv: "",
    gbv: "",
    totalGbv: "",
    coSponsorIncome: 0,
    total_retail_profit: 0,
    zone: "",
    zoneValue: "",
    bv: 0,
    bvTillDate: 0,
    walletBalance: 0,
    smartMartBalance: 0,
    noCoSponsored: 0,
    modelOpen: false,
  };

  componentDidMount = () => {
    this.getPbvDetails();
    this.getGbvDetails();
    this.fetchCoSponsorIncome();
    this.fetchRetailProfit();
    this.fetchZone();
    this.getBvDetails();
    this.getWalletBalance();
    this.getSmartMartBalance();
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

  getWalletBalance = () => {
    getWalletBalance().then((response) => {
      if (response && response.data && response.data.balance) {
        this.setState({
          walletBalance: response.data.balance,
        });
      }
    });
  };

  getSmartMartBalance = () => {
    getSmartMartBalance().then((response) => {
      if (response && response.data && response.data.balance) {
        this.setState({
          smartMartBalance: response.data.balance,
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

  getNoCoSponsered = () => {
    getNoCoSponsered().then((response) => {
      if (response && response.data && response.data.noCoSponsored) {
        this.setState({
          noCoSponsored: response.data.noCoSponsored,
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

  fetchZone = () => {
    getZone().then((response) => {
      if (response && response.data) {
        this.setState({
          zone: response.data.name,
          zoneValue: response.data.value,
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
      }
    });
  };

  render() {
    let {
      pbv,
      totalPbv,
      gbv,
      totalGbv,
      coSponsorIncome,
      total_retail_profit,
      zone,
      zoneValue,
      bv,
      bvTillDate,
      walletBalance,
      smartMartBalance,
      noCoSponsored,
      modelOpen,
    } = this.state;
    return (
      <>
        <Card className="">
          <CardHeader style={{ backgroundColor: "red" }}>
            <h5 className="card-category" style={{ color: "white" }}></h5>
            <CardTitle tag="h4" style={{ color: "white" }}>
              Summary
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      text: `Namaste ${this.props.name}!

Your Business Stats till date is as follows:
                    
Current Month Repurchase (PBV) : ${pbv ? pbv : 0} (Ideal 2000 to 6000 PBV)
                    
Total PBV till date : ${totalPbv ? totalPbv : 0} 
                    
Current Month GBV : ${gbv}
                    
GBV till date : ${totalGbv}
                    
Current Month BV : ${bv}

Total BV Till Date : ${bvTillDate}
                    
Your Current Zone : ${zone} (${zoneValue}%)
                    
Personal New Joining till date : ${noCoSponsored}
                    
                    
Wish you success!!!`,
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
              <p>CURRENT MONTH REPURCHASE (PBV) : {pbv ? pbv : 0}</p>
              <p>Total PBV TILL DATE : {totalPbv ? totalPbv : 0}</p>
              <p>CURRENT MONTH GROUP BUSINESS VOLUME (GBV) : {gbv}</p>
              <p>GBV TILL DATE : {totalGbv}</p>
              <p>CURRENT MONTH BV : {bv}</p>
              <p>TOTAL BV TILL DATE : {bvTillDate}</p>
              <p>
                YOUR CURRENT ZONE : {zone} ({zoneValue}%)
              </p>
              <p>PERSONAL NEW JOINING TILL DATE : {noCoSponsored}</p>
              <p>
                <b>WALLET BALANCE : {walletBalance} RS </b>
              </p>
              <p>
                <b>SMART MART BALANCE : {smartMartBalance} RS </b>
              </p>
              <div
                style={{ cursor: "pointer" }}
                onClick={() =>
                  this.setState({
                    modelOpen: true,
                  })
                }
              >
                <p>
                  <b>
                    <u>PULL TOP 20</u>
                  </b>
                </p>
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <div className="stats">
              <i className="now-ui-icons arrows-1_refresh-69" /> Just Updated
            </div>
          </CardFooter>
        </Card>
        <Modal
          isOpen={modelOpen}
          toggle={() => this.setState({ modelOpen: false })}
          size="xl"
        >
          <ModalHeader>TOP 20 ADP FOR PULL</ModalHeader>
          <ModalBody>
            <PullDetails />
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.updateLoginStatus.name,
  };
};

const connector = connect(mapStateToProps);

export default connector(DashboardSummaryCard);

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

function getZone() {
  return apiHandler.get("/zone");
}

function getBv() {
  return apiHandler.get("/bv");
}

function getWalletBalance() {
  return apiHandler.get("/wallet-balance");
}

function getSmartMartBalance() {
  return apiHandler.get(`/smart-mart-balance`);
}

function getNoCoSponsered() {
  return apiHandler.get("/no-co-sponsored");
}

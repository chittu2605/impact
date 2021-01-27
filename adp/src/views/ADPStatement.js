import React, { useState, useEffect } from "react";
import PanelHeader from "components/PanelHeader/PanelHeader";
import { apiHandler } from "config/apiConfig";
import {
  CardHeader,
  Card,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const ADPStatement = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cycleHistory, setCycleHistory] = useState([]);
  const [aDPData, setADPData] = useState(null);
  const [statementData, setStatementData] = useState(null);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [adpStatementColor, setAdpStatementColor] = useState("red");
  const [adpCommision, setAdpCommision] = useState(0);

  useEffect(() => {
    fetchADPData();
    fetchCycleHistory();
  }, []);

  const fetchCycleHistory = async () => {
    try {
      const res = await apiHandler.get(`/adp/get-cylces`);
      setCycleHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchADPData = async () => {
    try {
      const res = await apiHandler.get(`/adp/details`);
      setADPData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStatementData = async (id) => {
    try {
      const res = await apiHandler.get(`/adp/cycle/${id}`);
      console.log(res.data);
      setStatementData(res.data);
      if (res.data.adpDetails.bv) {
        setAdpStatementColor("green");
      }
      setAdpCommision(
        (res.data.adpDetails.bv * res.data.adpDetails.zone_value) / 100
      );
    } catch (error) {
      console.log(error);
    }
  };

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const handleClick = (cycle) => {
    setSelectedCycle(cycle);
    fetchStatementData(cycle.id);
  };

  let childBVTotal = 0;
  let comissionTotal = 0;

  const adjustCalculations = () => {};
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row style={{ height: "80vh" }}>
          <Col md="12">
            <Card style={{ minHeight: "80%", overflow: "hidden" }}>
              <CardHeader>
                <h5 className="title">ADP Statement</h5>
              </CardHeader>
              <hr />
              <div className="row">
                <div className="col ml-2">
                  <Dropdown isOpen={dropdownOpen} toggle={toggle} size="lg">
                    <DropdownToggle caret>Select Cycle</DropdownToggle>
                    <DropdownMenu>
                      {cycleHistory.map((item) => (
                        <DropdownItem
                          key={item.id}
                          onClick={() => handleClick(item)}
                        >
                          {item.toDate}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
              {statementData ? (
                <>
                  <div className="row justify-content-center mb-1">
                    <div className="col-4">
                      ADP ID : {statementData.adpDetails.adp_id}
                    </div>
                    <div className="col-4">
                      ADP Name : {aDPData.firstname} {aDPData.lastname}
                    </div>
                  </div>
                  <div className="row justify-content-center mb-1">
                    <div className="col-4">
                      Sponsor ID : {aDPData.sponsor_id}
                    </div>
                    <div className="col-4">
                      Cycle Date : {selectedCycle.toDate}
                    </div>
                  </div>
                  <div className="row justify-content-center mb-1">
                    <div className="col-4">PAN Card : {aDPData.pan}</div>
                    <div className="col-4">Mobile : {aDPData.mobile}</div>
                  </div>
                  <div className="row justify-content-center mb-1">
                    <div className="col-4">Bank : {aDPData.bank_name}</div>
                    <div className="col-4">Account No : {aDPData.toDate}</div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-4">IFSC : {aDPData.ifs_code}</div>
                    <div className="col-4">Branch : {aDPData.branch}</div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-10">
                      <hr />
                    </div>
                    <div className="col-10 ml-3 font-weight-bold">
                      Performance Zone Incentive Level :{" "}
                      {statementData.adpDetails.zone_value}% (Zone Name)
                    </div>
                    <div className="col-10">
                      <table className="table table-borderless">
                        <tr>
                          <th scope="col">ADP ID</th>
                          <th scope="col">ADP NAME</th>
                          <th scope="col">Level</th>
                          <th scope="col">BV</th>
                          <th scope="col">Difference</th>
                          <th scope="col">Commission</th>
                        </tr>
                        <tbody>
                          <tr key={statementData.adpDetails.adp_id}>
                            <td>
                              <span style={{ color: adpStatementColor }}>
                                {statementData.adpDetails.adp_id}
                              </span>
                            </td>
                            <td>
                              <span style={{ color: adpStatementColor }}>
                                {aDPData.firstname + " " + aDPData.lastname}
                              </span>
                            </td>
                            <td>
                              <span style={{ color: adpStatementColor }}>
                                {statementData.adpDetails.zone_value}%
                              </span>
                            </td>
                            <td>
                              <span style={{ color: adpStatementColor }}>
                                {statementData.adpDetails.bv}
                              </span>
                            </td>
                            <td>
                              <span style={{ color: adpStatementColor }}>
                                {statementData.adpDetails.zone_value}%
                              </span>
                            </td>
                            <td>
                              <span style={{ color: adpStatementColor }}>
                                {adpCommision}
                              </span>
                            </td>
                          </tr>
                          {statementData.childeDetails.map((child) => {
                            childBVTotal += child.bv;
                            const difference =
                              statementData.adpDetails.zone_value -
                              child.zone_value;
                            const commision = child.bv * (difference / 100);
                            comissionTotal += commision;
                            return (
                              <tr key={child.adp_id}>
                                <td>{child.adp_id}</td>
                                <td>
                                  {child.firstname + " " + child.lastname}
                                </td>
                                <td>{child.zone_value}%</td>
                                <td>{child.bv}</td>
                                <td>{difference}%</td>
                                <td>{commision}</td>
                              </tr>
                            );
                          })}
                          <tr>
                            <th>Total</th>
                            <td></td>
                            <td></td>
                            <th>{childBVTotal}</th>
                            <td></td>
                            <th>{adpCommision + comissionTotal}</th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-10">
                      <hr />
                    </div>
                    <div className="col-10 container">
                      <div className="row row-cols-2">
                        <div className="col container">
                          <div className="row mb-1">
                            <div className="col">Retail Profit</div>
                            <div className="col">
                              : {adpCommision + comissionTotal} Rs
                            </div>
                          </div>
                        </div>
                        <div className="col container">
                          <div className="row mb-1">
                            <div className="col">Co-Sponsor Royality</div>
                            <div className="col">
                              : {statementData.adpDetails.co_sponsor_royality}{" "}
                              Rs
                            </div>
                          </div>
                        </div>
                        <div className="col container">
                          <div className="row mb-1">
                            <div className="col">Champion Club</div>
                            <div className="col">
                              : {statementData.adpDetails.champion_earnings} Rs
                            </div>
                          </div>
                        </div>
                        <div className="col container">
                          <div className="row mb-1">
                            <div className="col">1 + 1 = 11 Club</div>
                            <div className="col">
                              : {statementData.adpDetails.oneplus_earnings} Rs
                            </div>
                          </div>
                        </div>
                        <div className="col container">
                          <div className="row mb-1">
                            <div className="col">Leaders Club</div>
                            <div className="col">
                              : {statementData.adpDetails.leaders_earnings} Rs
                            </div>
                          </div>
                        </div>
                        <div className="col container">
                          <div className="row mb-1">
                            <div className="col"></div>
                            <div className="col"></div>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-1">
                        <div className="col-10">
                          <hr />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col font-weight-bold">
                          Total:{" "}
                          {statementData.adpDetails.co_sponsor_royality +
                            statementData.adpDetails.champion_earnings +
                            statementData.adpDetails.oneplus_earnings +
                            statementData.adpDetails.leaders_earnings +
                            adpCommision +
                            comissionTotal}{" "}
                          Rs
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ADPStatement;

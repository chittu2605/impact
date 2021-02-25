import React from "react";
// react plugin used to create charts
import { Line } from "react-chartjs-2";

// reactstrap components
import { Row, Col } from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import { dashboardPanelChart } from "variables/charts.js";
import DashboardSummaryCard from "components/Molecule/DashboardSummaryCard";
import DashboardDefitiateCard from "components/Molecule/DashboardDefitiateCard";

class Dashboard extends React.Component {
  render() {
    return (
      <>
        <PanelHeader
          size="lg"
          content={
            <Line
              data={dashboardPanelChart.data}
              options={dashboardPanelChart.options}
            />
          }
        />
        <div className="content">
          <Row>
            <Col xs={12} md={6}>
              <DashboardSummaryCard />
            </Col>
            <Col xs={12} md={6}>
              <DashboardDefitiateCard />
            </Col>
          </Row>
          <br></br>
        </div>
      </>
    );
  }
}

export default Dashboard;

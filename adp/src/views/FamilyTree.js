import React from "react";
import PanelHeader from "components/PanelHeader/PanelHeader";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import Tree from "react-d3-tree";
import { apiHandler } from "config/apiConfig";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const containerStyles = {
  width: "100%",
  height: "100vh",
};

class FamilyTree extends React.Component {
  state = {
    treeData: [
      {
        name: this.props.name,
        attributes: {
          "ADP ID": this.props.adpId,
        },
        children: [],
      },
    ],
    isSprinter: false,
    sprintsUnder: [],
    sprintersUnder: [],
    sprintsFrontLines: [],
  };

  componentDidMount = () => {
    this.getTreeData();
  };

  getTreeData = async () => {
    this.makeCenter();

    let { treeData } = JSON.parse(JSON.stringify(this.state));
    let { adpId } = this.props;
    await this.getSprinterData();
    if (this.state.sprintsUnder.includes(adpId.toString())) {
      treeData[0].name += " (SPRINT)";
    } else if (this.state.sprintersUnder.includes(adpId.toString())) {
      treeData[0].name += `(SPRINTER - ${this.state.noVouchers}V)`;
    }
    getFrontLineAdp(adpId).then((response) => {
      let children = [];
      response.data.result &&
        response.data.result.forEach((user) => {
          let obj = {};
          obj.name = `${user.firstname} ${user.lastname}`;
          if (
            this.state.sprintersUnder.includes(user.adp_id.toString()) ||
            this.state.sprinterFrontLines.includes(user.adp_id.toString())
          ) {
            obj.name += " (SPRINTER LEG)";
          } else if (
            this.state.sprintsUnder.includes(user.adp_id.toString()) ||
            this.state.sprintsFrontLines.includes(user.adp_id.toString())
          ) {
            obj.name += " (SPRINT LEG)";
          }
          obj.attributes = {};
          obj.attributes["ADP ID"] = user.adp_id;

          children.push(obj);
        });

      treeData[0].children = children;
      this.setState({
        treeData,
      });
    });
  };

  getSprinterData = async () => {
    const response = await apiHandler.get("/get-sprinter-data");
    const {
      sprintsUnder,
      sprintersUnder,
      sprintsFrontLines,
      sprinterFrontLines,
      noVouchers,
    } = response.data;
    this.setState({
      sprintsUnder,
      sprintersUnder,
      sprintsFrontLines,
      sprinterFrontLines,
      noVouchers,
    });
  };

  makeCenter = () => {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 2,
      },
    });
  };

  handleNodeClick = (nodeObj) => {
    if (!nodeObj._children && nodeObj.depth > 0) {
      this.addChildNode(nodeObj.attributes["ADP ID"], nodeObj.depth);
    }
  };

  addChildNode = (adpId, depth) => {
    let { treeData } = JSON.parse(JSON.stringify(this.state));
    getFrontLineAdp(adpId).then((response) => {
      let children = [];
      response.data.result &&
        response.data.result.forEach((user) => {
          let obj = {};
          obj.name = `${user.firstname} ${user.lastname}`;
          if (this.state.sprintersUnder.includes(user.adp_id.toString())) {
            obj.name += " (SPRINTER)";
          } else if (this.state.sprintsUnder.includes(user.adp_id.toString())) {
            obj.name += " (SPRINT)";
          }
          obj.attributes = {};
          obj.attributes["ADP ID"] = user.adp_id;
          children.push(obj);
        });

      treeData[0].children = children;
      this.findAndUpdateNode(adpId, depth, children);
      // this.setState({
      //   treeData,
      // });
    });
  };

  findAndUpdateNode = (adpId, depth, children) => {
    let { treeData } = JSON.parse(JSON.stringify(this.state));
    let firstLine = treeData[0].children;
    let lineList = [];
    for (var i = 0; i < depth; i++) {
      lineList = this.findnode(firstLine, adpId, children);
    }
    treeData[0].children = lineList;
    let originalTreeData = JSON.stringify(this.state.treeData);
    if (originalTreeData != JSON.stringify(treeData)) {
      this.setState({
        treeData,
      });
    }
  };

  findnode = (lineList, adpId, children) => {
    lineList.forEach((elm, i) => {
      if (elm.children) {
        elm.children.filter((child) => {
          if (child.attributes["ADP ID"] == adpId) {
            if (children.length > 0) {
              child.children = children;
            }

            return lineList;
          } else {
            if (child.children) {
              this.findnode(child.children, adpId, children);
            }
          }
        });
      } else {
        if (elm.attributes["ADP ID"] == adpId) {
          elm.children = children;
          return lineList;
        }
      }
    });

    return lineList;
  };

  render() {
    let { treeData } = this.state;
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row style={{ height: "80vh" }}>
            <Col md="12">
              <Card style={{ height: "80%", overflow: "hidden" }}>
                <CardHeader>
                  <h5 className="title">Family Tree</h5>
                </CardHeader>
                <hr></hr>
                <div
                  id="treeWrapper"
                  style={containerStyles}
                  ref={(tc) => (this.treeContainer = tc)}
                >
                  <Tree
                    data={treeData}
                    onClick={this.handleNodeClick}
                    orientation={"vertical"}
                    pathFunc="step"
                    shouldCollapseNeighborNodes={true}
                    nodeSize={{ x: 250, y: 250 }}
                    translate={this.state.translate}
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

function getFrontLineAdp(sponsorId) {
  return apiHandler.get("/get-front-line_adp", {
    params: {
      sponsorId: sponsorId,
    },
  });
}

const mapStateToProps = (state) => {
  return {
    adpId: state.updateLoginStatus.adpId,
    name: state.updateLoginStatus.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchWalletAction: bindActionCreators(fetchWalletAction, dispatch),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(FamilyTree);

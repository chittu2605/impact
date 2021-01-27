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
  Table,
  Alert,
} from "reactstrap";
import styled from "styled-components";
import TransactionListItem from "../components/Atom/TransactionListItem";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { fetchWalletAction } from "../../redux/actions/wallet";
import { withRouter } from "react-router-dom";

const style = {
  th: {
    fontSize: "0.8rem !important",
    fontWeight: "400 !important",
  },

  table: {
    width: "99%",
    margin: "auto",
    ".debit": {
      color: "red",
    },
    ".credit": {
      color: "green",
    },
  },

  contentWrapper: {
    padding: "0.5rem"
  },
};

const StyledTH = styled("th")(style.th);
const StyledTable = styled(Table)(style.table);
const ContentWrapper = styled("div")(style.contentWrapper);

class SmartMartStatement extends React.Component {
  state = {};
  render() {
    let { balance, statement } = this.props;
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">Smart Mart balance Statement</h5>
                </CardHeader>
                <ContentWrapper>
                  {statement && statement.length > 0 ? (
                    <StyledTable responsive striped bordered hover>
                      <thead className="text-primary">
                        <tr>
                          <StyledTH>Date</StyledTH>
                          <StyledTH>Message</StyledTH>
                          <StyledTH>Amount</StyledTH>
                        </tr>
                      </thead>
                      <tbody>
                        {statement &&
                          statement.map((elm, i) => {
                            return <TransactionListItem data={elm} key={i} />;
                          })}
                      </tbody>
                    </StyledTable>
                  ) : (
                    <Alert color="warning">
                      <span>Nothing to show</span>
                    </Alert>
                  )}
                </ContentWrapper>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    balance: state.fetchSmartMartStatus.balance,
    status: state.fetchSmartMartStatus.status,
    statement: state.fetchSmartMartStatus.statement,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchWalletAction: bindActionCreators(fetchWalletAction, dispatch),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(withRouter(SmartMartStatement));

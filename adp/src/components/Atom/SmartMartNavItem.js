import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchSmartMartAction } from "../../redux/actions/smartMart";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const style = {
  wrapper: {
    display: "block",
    marginTop: "1rem",
    marginLeft: "7rem",
  },
  label: {
    marginLeft: "0.5rem",
  },
  icon: {
    fontSize: "1.5rem",
    verticalAlign: "middle",
  },
};

const SmartMartWrapper = styled("div")(style.wrapper);
const SmartMartLabel = styled("span")(style.label);
const SmartMartIcon = styled("i")(style.icon);

class SmartMartNavItem extends React.Component {
  componentDidMount = () => {
    this.props.fetchSmartMartAction();
  };

  render() {
    let { balance, status } = this.props;
    return (
      <SmartMartWrapper>
        <SmartMartIcon className="now-ui-icons shopping_basket" />
        <SmartMartLabel>Smart Mart Balance: {balance}</SmartMartLabel>
      </SmartMartWrapper>
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
    fetchSmartMartAction: bindActionCreators(fetchSmartMartAction, dispatch),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(withRouter(SmartMartNavItem));

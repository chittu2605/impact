import React from "react";
import styled from "styled-components";

const style = {
  wrapper: {
    display: "block",
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

const WalletWrapper = styled("div")(style.wrapper);
const WalletLabel = styled("span")(style.label);
const WalletIcon = styled("i")(style.icon);

class WalletNavItem extends React.Component {
  render() {
    let { walletBalance } = this.props;
    return (
      <WalletWrapper>
        <WalletIcon className="now-ui-icons business_money-coins" />
        <WalletLabel>Wallet Balance: {walletBalance}</WalletLabel>
      </WalletWrapper>
    );
  }
}

export default WalletNavItem;

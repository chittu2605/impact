import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Route, Switch, Redirect } from "react-router-dom";

// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GlobalStyle from "utils/GlobalStyles";
import { apiHandler } from "config/apiConfig";

var ps;

class Dashboard extends React.Component {
  state = {
    backgroundColor: "red",
    walletBalance: 0,
    currUrl: "",
  };
  mainPanel = React.createRef();
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    if (this.state.currUrl !== window.location.href) {
      this.setState({ currUrl: window.location.href });
      this.getWalletBalance();
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.mainPanel.current.scrollTop = 0;
    }
    if (this.state.currUrl !== window.location.href) {
      this.setState({ currUrl: window.location.href });
      this.getWalletBalance();
    }
  }
  handleColorClick = (color) => {
    this.setState({ backgroundColor: color });
  };

  getWalletBalance = async () => {
    const response = await apiHandler.get("/wallet-balance");
    this.setState({
      walletBalance: response.data.balance,
    });
  };
  render() {
    return (
      <div className="wrapper">
        {!this.props.authenticated && <Redirect from="/adp" to="/login" />}
        <GlobalStyle />
        <Sidebar
          {...this.props}
          routes={routes}
          backgroundColor={this.state.backgroundColor}
        />
        <ToastContainer />
        <div className="main-panel" ref={this.mainPanel}>
          <Navbar {...this.props} walletBalance={this.state.walletBalance} />
          <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
            <Redirect from="/adp" to="/adp/dashboard" />
          </Switch>
          <Footer fluid />
        </div>
        {/* <FixedPlugin
          bgColor={this.state.backgroundColor}
          handleColorClick={this.handleColorClick}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.updateLoginStatus.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // updateAdpData: bindActionCreators(updateAdpData, dispatch),
    // fetchWalletAction: bindActionCreators(fetchWalletAction, dispatch),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Dashboard);

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
import GlobalStyle from "utils/GlobalStyles";

var ps;

class Dashboard extends React.Component {
  state = {
    backgroundColor: "red",
    walletBalance: 0,
  };
  mainPanel = React.createRef();

  updateChildSession() {
    if (this.props.childSessionActive) {
      //this.props.updateChildSessionActiveAction(false);
    } else {
    }
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    //this.updateChildSession();
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
  }
  handleColorClick = (color) => {
    this.setState({ backgroundColor: color });
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

const connector = connect(mapStateToProps);

export default connector(Dashboard);

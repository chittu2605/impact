
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter, Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.4.0";
import "assets/css/demo.css";

import AdpLayout from "layouts/Adp.js";
import Login from "views/Login";

import configureStore from "./redux/store/configureStore";
import { Provider } from "react-redux";


const hist = createBrowserHistory();
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={hist} basename="/adp">
      <Switch>
     
        
        <Route path="/adp" render={(props) => <AdpLayout {...props} />} />
        <Route path="/login" render={(props) => <Login {...props} />} />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

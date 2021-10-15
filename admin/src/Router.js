import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import City from "./components/pages/City";
import Category from "./components/pages/Category";
import Layout from "./components/organisms/Layout";
import history from "./history";
import SubCategory from "./components/pages/SubCategory";
import Franchise from "./components/pages/Franchise";
import Products from "./components/pages/Products";
import AddAdp from "./components/pages/AddADP";
import BuyProduct from "./components/pages/BuyProduct";
import ViewADP from "./components/pages/ViewADP";
import AddWallet from "./components/pages/AddWallet";
import PlanManagement from "./components/pages/PlanManagement";
import AddProduct from "./components/pages/AddProduct";
import GenerateStatement from "./components/pages/GenerateStatement";
import AdminDashboard from "./components/pages/AdminDashboard";
import RunCycle from "./components/pages/RunCycle";
import OrderList from "./components/pages/OrderList";
import AdpIncome from "./components/pages/AdpIncome";
import DebitSMBalance from "./components/pages/DebitSMBalance";
function Router(props) {
  return (
    <BrowserRouter basename="/admin" history={history}>
      <Layout />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/add-city" component={City} />
      <Route path="/add-category" component={Category} />
      <Route path="/add-sub-category" component={SubCategory} />
      <Route path="/franchise" component={Franchise} />
      <Route path="/products" component={Products} />
      <Route path="/add-adp" component={AddAdp} />
      <Route path="/buy-product" component={BuyProduct} />
      <Route path="/view-adp" component={ViewADP} />
      <Route path="/adp-income" component={AdpIncome} />
      <Route path="/order-list" component={OrderList} />
      <Route path="/add-product" component={AddProduct} />
      <Route path="/add-wallet" component={AddWallet} />
      <Route path="/debit-sm-balance" component={DebitSMBalance} />
      <Route path="/plan-management" component={PlanManagement} />
      <Route path="/generate-statement" component={GenerateStatement} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route path="/run-cycle" component={RunCycle} />
      <Redirect exact from="/lg" to="/login" />

      {/* {window.API_URL === "https://impact-node-app.herokuapp.com/admin" && <Redirect exact from="/" to="/login" /> } */}
    </BrowserRouter>
  );
}

export default Router;

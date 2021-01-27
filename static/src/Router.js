import React from "react";
import {
    BrowserRouter,
    Route,
    Redirect,
} from "react-router-dom";

import Layout from "./components/organisms/Layout";
import history from './history';
import Products from "./components/page/Products"


function Router (props) {
    return (
        <BrowserRouter 
            basename="/" 
            history={history}
        >
            <Layout />
            <Route path="/" component={Products} />
            {/* <Route path="/dashboard" component={Dashboard} /> */}
            {/* <Route path="/add-city" component={City} /> */}
            {/* <Route path="/add-category" component={Category} /> */}
            {/* <Route path="/add-sub-category" component={SubCategory} /> */}
            {/* <Route path="/franchise" component={Franchise} /> */}
            {/* <Route path="/add-product" component={AddProduct} /> */}
            
            {/* <Redirect exact from="/" to="/stores" /> */}
        </BrowserRouter>
    )
}

export default Router;
/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import LoginPage from "views/Login/Login-page.js"
import Page500 from "views/ErrorPage/Page500"
import "assets/css/material-dashboard-react.css?v=1.10.0";
//redux store
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import logger from "redux-logger"
import { Provider } from "react-redux"
import reducers from "./reducers"
//redux devtool
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(reducers, 
  composeWithDevTools(applyMiddleware(thunk, logger)),
  );
const ReduxApp = (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/page500" component={Page500} />
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/main" />
      </Switch>
    </BrowserRouter>
  </Provider>
)
ReactDOM.render(
  ReduxApp,
  document.getElementById("root")
);

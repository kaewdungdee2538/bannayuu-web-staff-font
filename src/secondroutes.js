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

import HomeImportData from "views/Home/import/Home-import";
import HomeList from "views/Home/home-list/Home-list"
// core components/views for RTL layout

const secondRoutes = [
  {
    path: "/home-import",
    component: HomeImportData,
    layout: "/admin",
  },{
    path: "/home-list",
    component: HomeList,
    layout: "/admin",
  }
];

export default secondRoutes;

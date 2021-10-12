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
import VillagerImportData from "views/Villager/import/Villager-import"
import VillagerList from "views/Villager/villager-list/Villager-list"
import UserAddSelectCompany from "views/user/add/User-add-select-company"
import UserAdd from "views/user/add/User-add"
import UserEditSelectCompany from "views/user/edit-info/User-edit-select-company"
import UserEditList from "views/user/edit-info/User-edit-list"
import UserEditInfo from "views/user/edit-info/User-edit-info"
import UserChangePrivilegeSelectCompany from "views/user/change-privilege/User-change-privilege-select-company"
import UserChangePrivilegeList from "views/user/change-privilege/User-change-privilege-list"
import UserChangePrivilege from "views/user/change-privilege/User-change-privilege"
import UserChangeComapnySelectCompany from "views/user/change-main-company/User-change-company-select-company"
import UserChangeCompanyList from "views/user/change-main-company/User-change-company-list"
import UserChangeCompany from "views/user/change-main-company/User-change-company"
import UserResetPassowrdSelectCompany from "views/user/reset-password/User-reset-password-select-company"
import UserResetPasswordList from "views/user/reset-password/User-reset-password-select-user"
import UserResetPassword from "views/user/reset-password/User-reset-password"
import UserAddOrDeleteListComapnySelectCompany from "views/user/addordelete-companylist/User-addordelete-listcompany-select-company"
import UserAddOrDeleteListCompanyList from "views/user/addordelete-companylist/User-addordelete-listcompany-list"
import UserAddOrDeleteListCompany from "views/user/addordelete-companylist/User-addordelete-listcompany"
// core components/views for RTL layout

const secondRoutes = [
  {
    path: "/home-import",
    component: HomeImportData,
    layout: "",
  },{
    path: "/home-list",
    component: HomeList,
    layout: "",
  },{
    path: "/villager-import",
    component: VillagerImportData,
    layout: "",
  },{
    path: "/villager-list",
    component: VillagerList,
    layout: "",
  }, {
    path: "/user-add-select",
    component: UserAddSelectCompany,
    layout: "",
  },{
    path: "/user-add",
    component: UserAdd,
    layout: "",
  },{
    path: "/user-edit-info-select",
    component: UserEditSelectCompany,
    layout: "",
  },{
    path: "/user-edit-list",
    component: UserEditList,
    layout: "",
  },{
    path: "/user-edit-info",
    component: UserEditInfo,
    layout: "",
  },{
    path: "/user-change-privilege-select",
    component: UserChangePrivilegeSelectCompany,
    layout: "",
  },{
    path: "/user-change-privilege-list",
    component: UserChangePrivilegeList,
    layout: "",
  },{
    path: "/user-change-privilege",
    component: UserChangePrivilege,
    layout: "",
  },{
    path: "/user-change-company-select",
    component: UserChangeComapnySelectCompany,
    layout: "",
  },{
    path: "/user-change-company-list",
    component: UserChangeCompanyList,
    layout: "",
  },{
    path: "/user-change-company",
    component: UserChangeCompany,
    layout: "",
  },{
    path: "/user-reset-password-listcompany-select",
    component: UserResetPassowrdSelectCompany,
    layout: "",
  },{
    path: "/user-reset-password-list",
    component: UserResetPasswordList,
    layout: "",
  },{
    path: "/user-reset-password",
    component: UserResetPassword,
    layout: "",
  },{
    path: "/user-addordelete-listcompany-select",
    component: UserAddOrDeleteListComapnySelectCompany,
    layout: "",
  },{
    path: "/user-addordelete-listcompany-list",
    component: UserAddOrDeleteListCompanyList,
    layout: "",
  }, {
    path: "/user-addordelete-listcompany",
    component: UserAddOrDeleteListCompany,
    layout: "",
  },
  
];

export default secondRoutes;

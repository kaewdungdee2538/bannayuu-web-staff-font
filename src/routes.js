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
// @material-ui/icons
import MainPage from "views/Main/Main-page"
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Business from "@material-ui/icons/Business"
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import HomeWork from "@material-ui/icons/HomeWork"
import Group from "@material-ui/icons/Group"
import AccountBalance from "@material-ui/icons/SupervisedUserCircle"
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
import CompanyAdd from "views/Company/Add/Company-add";
import CompanyEdit from "views/Company/Edit/Company-edit";
import HomeMain from "views/Home/main/Home-main";
import VillagerMain from "views/Villager/main/Villager-main"
import UserMain from "views/user/main/User-main"
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/main",
    name: "Main",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: MainPage,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Main",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/company-add",
    name: "Company Add",
    icon: Business,
    component: CompanyAdd,
    layout: "/admin",
  },
  {
    path: "/company-edit",
    name: "Company Edit",
    icon: Business,
    component: CompanyEdit,
    layout: "/admin",
  },
  {
    path: "/home-main",
    name: "Home Import From Excel",
    icon: HomeWork,
    component: HomeMain,
    layout: "/admin",
  },
  {
    path: "/villager-main",
    name: "Villager Import From Excel",
    icon: Group,
    component: VillagerMain,
    layout: "/admin",
  },
  {
    path: "/user-main",
    name: "User Management",
    icon: AccountBalance,
    component: UserMain,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin",
  },
  {
    path: "/upgrade-to-pro",
    name: "Upgrade To PRO",
    rtlName: "التطور للاحترافية",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin",
  },
];

export default dashboardRoutes;

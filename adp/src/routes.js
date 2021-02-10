import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/TableList.js";
import Maps from "views/Maps.js";
import Upgrade from "views/Upgrade.js";
import UserPage from "views/UserPage.js";
import AddADP from "views/AddADP";
import WalletStatement from "views/WalletStatement";
import RePurchase from "views/RePurchase";
import SmartMartBalanceStatement from "views/SmartMartBalanceStatement";
import FamilyTree from "views/FamilyTree";
import Voucher from "views/Voucher";
import OnePlusCard from "views/OnePlusCard";
import ADPStatement from "views/ADPStatement";
var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard,
    layout: "/adp",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "design_image",
  //   component: Icons,
  //   layout: "/adp",
  // },
  {
    path: "/add-adp",
    name: "Add ADP",
    icon: "users_single-02",
    component: AddADP,
    layout: "/adp",
  },
  {
    path: "/wallet-statement",
    name: "Wallet Statement",
    icon: "business_money-coins",
    component: WalletStatement,
    layout: "/adp",
  },
  {
    path: "/smart-mart-statement",
    name: "Smart Mart Statement",
    icon: "business_money-coins",
    component: SmartMartBalanceStatement,
    layout: "/adp",
  },
  {
    path: "/adp-statement",
    name: "ADP Statement",
    icon: "business_money-coins",
    component: ADPStatement,
    layout: "/adp",
  },
  {
    path: "/re-purchase",
    name: "Re Purchase",
    icon: "business_money-coins",
    component: RePurchase,
    layout: "/adp",
  },

  {
    path: "/family-tree",
    name: "Tree View",
    icon: "business_money-coins",
    component: FamilyTree,
    layout: "/adp",
  },
  {
    path: "/voucher",
    name: "Voucher",
    icon: "business_money-coins",
    component: Voucher,
    layout: "/adp",
  },
  {
    path: "/card",
    name: "Card",
    icon: "business_money-coins",
    component: OnePlusCard,
    layout: "/adp",
  },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "users_single-02",
  //   component: UserPage,
  //   layout: "/adp",
  // },
  // {
  //   path: "/extended-tables",
  //   name: "Table List",
  //   icon: "files_paper",
  //   component: TableList,
  //   layout: "/adp",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "design-2_ruler-pencil",
  //   component: Typography,
  //   layout: "/adp",
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "objects_spaceship",
  //   component: Upgrade,
  //   layout: "/adp",
  // },
];
export default dashRoutes;

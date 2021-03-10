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
import ChangePassword from "views/ChangePassword";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "business_bulb-63",
    component: Dashboard,
    layout: "/adp",
    displayInChildMode: true,
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
    icon: "shopping_credit-card",
    component: WalletStatement,
    layout: "/adp",
  },
  {
    path: "/smart-mart-statement",
    name: "Smart Mart Statement",
    icon: "shopping_cart-simple",
    component: SmartMartBalanceStatement,
    layout: "/adp",
  },
  {
    path: "/adp-statement",
    name: "ADP Statement",
    icon: "education_paper",
    component: ADPStatement,
    layout: "/adp",
  },
  {
    path: "/re-purchase",
    name: "Re Purchase",
    icon: "shopping_bag-16",
    component: RePurchase,
    layout: "/adp",
  },

  {
    path: "/family-tree",
    name: "Tree View",
    icon: "design_vector",
    component: FamilyTree,
    layout: "/adp",
    displayInChildMode: true,
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
    icon: "files_single-copy-04",
    component: OnePlusCard,
    layout: "/adp",
  },
  {
    path: "/change-password",
    name: "Change Password",
    icon: "ui-1_lock-circle-open",
    component: ChangePassword,
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

import Dashboard from "views/Dashboard.js";
import AddADP from "views/AddADP";
import WalletStatement from "views/WalletStatement";
import RePurchase from "views/RePurchase";
import SmartMartBalanceStatement from "views/SmartMartBalanceStatement";
import FamilyTree from "views/FamilyTree";
import Voucher from "views/Voucher";
import OnePlusCard from "views/OnePlusCard";
import ADPStatement from "views/ADPStatement";
import ChangePassword from "views/ChangePassword";
import Messages from "views/Messages";
import EditProfile from "views/EditProfile";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "business_bulb-63",
    component: Dashboard,
    layout: "/adp",
    displayInChildMode: true,
  },
  {
    path: "/messages",
    name: "MESSAGES",
    icon: "ui-1_email-85",
    component: Messages,
    layout: "/adp",
  },
  {
    path: "/add-adp",
    name: "Add ADP",
    icon: "users_single-02",
    component: AddADP,
    layout: "/adp",
  },
  {
    path: "/edit-profile",
    name: "Edit Proile",
    icon: "ui-2_settings-90",
    component: EditProfile,
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
];
export default dashRoutes;

import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { SIDEBAR_WIDTH } from "../../constants/Layout";
import Collapse from "@material-ui/core/Collapse";
import SidebarListItem from "../atoms/SidebarListItem";
import { withRouter } from "react-router-dom";
import AvTimerIcon from "@material-ui/icons/AvTimer";
import AddIcon from "@material-ui/icons/Add";
import PlaceIcon from "@material-ui/icons/Place";
import CategoryIcon from "@material-ui/icons/Category";
import CategoryOutlinedIcon from "@material-ui/icons/CategoryOutlined";
import StorefrontOutlinedIcon from "@material-ui/icons/StorefrontOutlined";
import ArchiveIcon from "@material-ui/icons/Archive";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const drawerWidth = SIDEBAR_WIDTH;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

let sideBarList = [
  {
    label: "Dashboard",
    url: "/dashboard",
    icon: <i class="fas fa-tachometer-alt"></i>,
    subMenu: [],
  },

  {
    label: "View ADP",
    url: "/view-adp",
    icon: <i class="fas fa-user"></i>,
    subMenu: [],
  },

  {
    label: "Plan Management",
    url: "/plan-management",
    icon: <i class="fas fa-tasks"></i>,
    subMenu: [],
  },

  {
    label: "Run Cycle",
    url: "/run-cycle",
    icon: <i class="fas fa-tasks"></i>,
    subMenu: [],
  },

  {
    label: "Business Stats",
    icon: <i class="fas fa-plus"></i>,
    subMenu: [
      {
        label: "Admin Dashboard",
        url: "/admin-dashboard",
        icon: <i class="fa fa-bar-chart"></i>,
        subMenu: [],
      },
    ],
  },

  {
    label: "Add",
    icon: <i class="fas fa-plus"></i>,
    subMenu: [
      {
        label: "Add City",
        url: "add-city",
        icon: <i class="fas fa-city"></i>,
      },
      {
        label: "Add Category",
        url: "add-category",
        icon: <i class="fas fa-th"></i>,
      },
      {
        label: "Add Sub Category",
        url: "add-sub-category",
        icon: <i class="fab fa-buromobelexperte"></i>,
      },
      {
        label: "Add Franchise",
        url: "franchise",
        icon: <i class="fas fa-store"></i>,
      },

      {
        label: "Products",
        url: "products",
        icon: <i class="fas fa-dice-four"></i>,
      },

      {
        label: "Add ADP",
        url: "add-adp",
        icon: <i class="fas fa-user-plus"></i>,
      },

      {
        label: "Add Wallet",
        url: "add-wallet",
        icon: <i class="fas fa-wallet"></i>,
      },

      {
        label: "Statement",
        url: "generate-statement",
        icon: <i class="fas fa-wallet"></i>,
      },
    ],
  },
];

const Sidebar = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  let { open, handleDrawerClose } = props;

  const [selectedItemIndex, setSelectedItemIndex] = React.useState(-1);

  const handleListItemClick = (event, index) => {
    setSelectedItemIndex(index);
  };
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      {sideBarList &&
        sideBarList.map((listItem, index) => {
          return (
            <SidebarListItem
              listItem={listItem}
              open={props.open}
              selectedItemIndex={selectedItemIndex}
              handleListItemClick={handleListItemClick}
              index={index}
              key={listItem.label}
              {...props}
            />
          );
        })}

      <Divider />
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </Drawer>
  );
};

export default withRouter(Sidebar);

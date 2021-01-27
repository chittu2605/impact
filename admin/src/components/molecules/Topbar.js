import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { SIDEBAR_WIDTH } from "../../constants/Layout";
import clsx from "clsx";
import { PRIMARY_BLUE_COLOR } from "../../constants/colors";
import Logo from "../atoms/Logo";
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { logoutAction } from "../../redux/actions/login";
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';


const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
	}),
  },
  appBarShift: {
    marginLeft: SIDEBAR_WIDTH,
    width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  colorPrimary: {
    background: "red",
  },

  profileIcon: {
	position: "absolute",
    right: "16px",
  }

}));

const Topbar = (props) => {
  const classes = useStyles();
  let { open, handleDrawerOpen } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);



  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
	  props.logoutAction();
  }


  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, classes.colorPrimary, {
        [classes.appBarShift]: open,
      })}
      color="primary"
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>

        <Logo />

        <div className={clsx(classes.profileIcon)}>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
			color="inherit"
			
			
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={openMenu}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};



const mapStateToProps = state => {
	return {
		status: state.updateLoginStatus.status,
	};
  };
  
  const mapDispatchToProps = dispatch => {
	return {
		logoutAction: bindActionCreators(logoutAction, dispatch),
	};
  };
  
  const connector = connect(mapStateToProps, mapDispatchToProps);
  
  export default connector(Topbar);

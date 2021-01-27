import React from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';


import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';


import Topbar from "../molecules/Topbar";
import Sidebar from "../molecules/Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  
  
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Layout(props) {
  const classes = useStyles();
  
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return props.history.location.pathname !== "/login" && (
    <div className={classes.root}>
      <CssBaseline />
      <Topbar 
          open={open}
          handleDrawerOpen={handleDrawerOpen}
      />
      <Sidebar 
        open={open}
        handleDrawerClose={handleDrawerClose}
      />
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* {props.renderComponent()} */}
      </main>
    </div>
  );
}


export default withRouter(Layout);
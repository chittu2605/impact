import React from "react";
import List from "@material-ui/core/List";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    
  }));

const SidebarListItem = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [selectedSubItemIndex, setSelectedSubItemIndex] = React.useState(-1);
    const [open, setOpen] = React.useState(false);

    const handleOpenSubMenu = () => {
        setOpen(!open)
    }

    const handleSubListItemClick = (event, index) => {
        setSelectedSubItemIndex(index);
        
    };

    const { listItem, handleListItemClick, selectedItemIndex, index } = props;
  return (
    <>
      <ListItem 
        component="a" 
        // href={listItem.url} 
        button 
        key={listItem.label}
        onClick={(event) => {
            handleListItemClick(event, index);
            listItem.subMenu && handleOpenSubMenu();
            props.history.push(listItem.url)
        }}
        selected={selectedItemIndex === index}

        
    >
        <ListItemIcon>
          {listItem.icon}
        </ListItemIcon>
        <ListItemText primary={listItem.label} />
        {
            listItem.subMenu && listItem.subMenu.length > 0? (
                open ? <ExpandLess /> : <ExpandMore />
            ) : ""
        }
      </ListItem>
      {listItem.subMenu &&
        listItem.subMenu.map((subItem, idx) => {
          return (
            <Collapse in={open} timeout="auto" unmountOnExit key={idx}>
              <List component="div" disablePadding>
                <ListItem
                    component="a"
                    // href={subItem.url}
                    button
                    className={classes.nested}
                    selected={selectedSubItemIndex === idx}
                    onClick={(event) => {
                        handleSubListItemClick(event, idx)
                        props.history.push(subItem.url)
                    }}
                >
                  <ListItemIcon>{subItem.icon}</ListItemIcon>
                  <ListItemText primary={subItem.label} />
                </ListItem>
              </List>
            </Collapse>
          );
        })}
    </>
  );
};


export default SidebarListItem;
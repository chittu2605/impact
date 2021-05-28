import React, { useRef } from "react";
import {
  Button,
  TableRow,
  TableCell,
  Input,
  Menu,
  MenuItem,
  ListItemText,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import styled from "styled-components";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { apiHandler } from "../../utils/apiConfig";
import MessageLibraryPopUp from "../molecules/MessageLibraryPopUp";

const styles = {
  styledRow: {
    backgroundColor: "#fafafa",
    "&.disabled": {
      backgroundColor: "#d1d1d1",
    },
  },
  styledButton: {
    color: "white !important",
    backgroundColor: "red !important",
    outline: "none !important",
    "&:hover": {
      backgroundColor: "red !important",
    },
    "&.disabled": {
      backgroundColor: "#d16868 !important",
    },
  },
};

const StyledRow = styled(TableRow)(styles.styledRow);
const StyledButton = styled(Button)(styles.styledButton);

const TableList = (props) => {
  const [disableModalopen, setDisableModalOpen] = React.useState(false);
  const [enableModalopen, setEnableModalOpen] = React.useState(false);
  const [disbleField, seteditField] = React.useState(true);
  const [actionButton, setupdateButton] = React.useState(true);
  const [showMessage, setShowMessage] = React.useState(props.showMessages);

  const Validation = (type, value) => {
    if (type === "email") {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(value).toLowerCase());
    } else if (type === "firstname") {
      if (String(value).length < 2) return false;
      else return true;
    } else if (type === "mobile") {
      if (String(value).length === 10) return true;
      else return false;
    } else if (type === "password") {
      if (String(value).length >= 6) return true;
      else return false;
    }
  };

  const editField = (bool) => {
    seteditField(bool);
    //  props.rowActionDisable();
  };
  const updateButton = (bool) => {
    setupdateButton(bool);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateClick = () => {
    if (checkAllFields()) {
      editField(true);
      updateButton(true);
      props.rowActionEnable();
      handleClose();
      props.updateDashboard();

      let { adpId, mobile, email, password } = props;
      updateAdp(adpId, mobile, email, password);
    } else alert("Please check the details");
  };

  const checkAllFields = () => {
    let { email, mobile, firstname, password } = props;
    let errors = 0;
    if (!Validation("email", email)) errors++;
    if (!Validation("mobile", mobile)) errors++;
    if (!Validation("firstname", firstname)) errors++;
    if (!Validation("password", password)) errors++;

    if (errors === 0) return true;
    else return false;
  };

  const disableMessageLibrary = () => {
    setDisableModalOpen(true);
  };

  const enableMessageLibrary = () => {
    setEnableModalOpen(true);
  };

  return (
    <>
      <StyledRow className={!props.active && "disabled"}>
        <TableCell component="th" scope="row">
          {props.serialNumber}
        </TableCell>

        <TableCell component="th" scope="row">
          {props.adpId}
        </TableCell>

        <TableCell align="left">
          {" "}
          {props.firstname}
          {/* {(disbleField) ? props.firstname : 
                    <Input
                    id="AdpName"
                    defaultValue={props.firstname}
                    disabled={false}
                    onChange={(event) => props.handleChange(props.adpId,"firstname",event.target.value)}
                    style={{outline:"none"}}
                    >
                    </Input> } */}
          {Validation("firstname", props.firstname) ? null : (
            <div style={{ color: "red" }}>min length : 2 letters</div>
          )}
        </TableCell>
        <TableCell align="left">
          {disbleField ? (
            props.mobile
          ) : (
            <Input
              id="mobile"
              type="number"
              defaultValue={props.mobile}
              disabled={false}
              onChange={(event) =>
                props.handleChange(props.adpId, "mobile", event.target.value)
              }
              style={{ outline: "none " }}
            />
          )}
          {Validation("mobile", props.mobile) ? null : (
            <div style={{ color: "red" }}>Enter 10 digit Mobile number</div>
          )}
        </TableCell>
        <TableCell align="left">
          {disbleField ? (
            props.email
          ) : (
            <Input
              id="email"
              defaultValue={props.email}
              disabled={false}
              onChange={(event) =>
                props.handleChange(props.adpId, "email", event.target.value)
              }
              style={{ outline: "none " }}
            />
          )}
          {Validation("email", props.email) ? null : (
            <div style={{ color: "red" }}>Incorrect Email</div>
          )}
        </TableCell>
        <TableCell align="left">
          {disbleField ? (
            props.password
          ) : (
            <Input
              id="password"
              defaultValue={props.password}
              disabled={false}
              onChange={(event) =>
                props.handleChange(props.adpId, "password", event.target.value)
              }
              style={{ outline: "none " }}
            />
          )}
          {Validation("password", props.password) ? null : (
            <div style={{ color: "red" }}>min length : 6 characters</div>
          )}
        </TableCell>
        <TableCell align="left">
          {showMessage ? (
            <Checkbox
              checked={showMessage}
              inputProps={{ "aria-label": "primary checkbox" }}
              onClick={() => {
                disableMessageLibrary();
              }}
            />
          ) : (
            <Checkbox
              checked={showMessage}
              inputProps={{ "aria-label": "primary checkbox" }}
              onChange={() => {
                enableMessageLibrary();
              }}
            />
          )}
        </TableCell>
        <TableCell align="center" style={{ width: "200px" }}>
          {actionButton ? (
            <div>
              <StyledButton
                //style={styles.styledButton}
                className={props.actionDisableButton ? "disabled" : ""}
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                disabled={props.actionDisableButton ? true : false}
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                Actions
                <ArrowDropDownIcon />
              </StyledButton>
              <Menu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    editField(false);
                    updateButton(false);
                    props.rowActionDisable();
                    props.saveTempRow();
                    props.updateDashboard();
                  }}
                >
                  <ListItemText primary="Edit" />
                </MenuItem>
                {props.active ? (
                  <MenuItem>
                    <ListItemText primary="Deactive" />
                  </MenuItem>
                ) : (
                  <MenuItem>
                    <ListItemText primary="Activate" />
                  </MenuItem>
                )}

                <MenuItem>
                  <ListItemText primary="ADP Dashboard" />
                </MenuItem>
                <MenuItem>
                  <ListItemText primary="View Tree" />
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button
                style={{
                  display: "inline-block",
                  marginRight: "5px",
                  color: "red",
                  backgroundColor: "white",
                  outline: "none",
                }}
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                size="small"
                onClick={() => {
                  props.cancelChanges(props.adpId);
                  editField(true);
                  updateButton(true);
                  props.rowActionEnable();
                  handleClose();
                }}
              >
                Cancel
              </Button>
              <Button
                style={{
                  display: "inline-block",
                  color: "white",
                  backgroundColor: "red",
                  outline: "none",
                }}
                variant="contained"
                color="primary"
                size="small"
                // disable={(Validation("name", props.name) &&
                //         Validation("email", props.email) &&
                //         Validation("mobile", props.mobile) &&
                //         Validation("password", props.password)) ? false : true}
                onClick={handleUpdateClick}
              >
                Update
              </Button>
            </div>
          )}
        </TableCell>
      </StyledRow>

      <Dialog
        open={disableModalopen}
        onClose={() => setDisableModalOpen(false)}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"Disable Message Library"}
        </DialogTitle>
        <DialogContent>Are you sure?</DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              updateMessageLibrary(props.adpId, false);
              setDisableModalOpen(false);
              setShowMessage(0);
            }}
            color="red"
          >
            YES
          </Button>
          <Button
            onClick={() => setDisableModalOpen(false)}
            color="red"
            autoFocus
          >
            NO
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={enableModalopen}
        onClose={() => setEnableModalOpen(false)}
        aria-labelledby="alert-dialog-title"
        fullWidth={true}
      >
        <MessageLibraryPopUp
          disableModal={setEnableModalOpen}
          updateMessageLibrary={updateMessageLibrary}
          adpId={props.adpId}
          firstName={props.firstname}
          lastName={props.lastname}
          mobile={props.mobile}
          defRefLink={
            props.messageDefaults.length
              ? props.messageDefaults.find(
                  (prop) => prop.name === "referral_url"
                ).value
              : ""
          }
          defVidLink={
            props.messageDefaults.length
              ? props.messageDefaults.find(
                  (prop) => prop.name === "video_link3"
                ).value
              : ""
          }
          setShowMessage={setShowMessage}
        />
      </Dialog>
    </>
  );
};

export default TableList;

function updateAdp(adpId, phone, email, password) {
  return apiHandler.put("/update-adp", {
    adpId,
    phone,
    email,
    password,
  });
}

function updateMessageLibrary(adpId, isEnable, messageDetails) {
  apiHandler.post(
    `/admin/update-message-library/${adpId}/${isEnable}`,
    messageDetails
      ? {
          adpId: messageDetails.adp_id,
          firstName: messageDetails.first_name,
          lastName: messageDetails.last_name,
          mobile: messageDetails.mobile,
          refLink: messageDetails.referral_link,
          link1: messageDetails.video_link1,
          link2: messageDetails.video_link2,
          link3: messageDetails.video_link3,
          whatsappGrp: messageDetails.whatsapp_grp,
        }
      : null
  );
}

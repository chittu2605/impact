import React, { useState, useEffect } from "react";
import {
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Paper,
  makeStyles,
  Grid,
  Select,
  MenuItem,
} from "@material-ui/core";
import { apiHandler } from "../../utils/apiConfig";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  button: {
    marginTop: 10,
    backgroundColor: "red",
    color: "white",
  },
});

const MessageLibraryPopUp = ({
  adpId,
  firstName,
  lastName,
  mobile,
  defRefLink,
  defVidLink,
  disableModal,
  updateMessageLibrary,
  setShowMessage,
}) => {
  const [messageDetails, setMessageDetails] = useState(null);
  const [whatsappGroups, setWhatsappGroups] = useState([]);
  const [displayAlert, setDisplayAlert] = useState(false);

  useEffect(() => {
    getWhatsappGroups();
    getAdpMessageDetails();
  }, []);

  const getAdpMessageDetails = async () => {
    const res = await apiHandler.get(`/admin/get-message-lib-details/${adpId}`);
    res.data
      ? setMessageDetails(res.data)
      : setMessageDetails({
          adp_id: adpId,
          first_name: firstName,
          last_name: lastName,
          mobile: mobile,
          referral_link: defRefLink.replace("[[adp_id]]", adpId),
          video_link1: "",
          video_link2: "",
          video_link3: defVidLink,
          whatsapp_grp: "",
        });
  };

  const getWhatsappGroups = async () => {
    const res = await apiHandler.get(`/admin/get-whatsapp-groups`);
    setWhatsappGroups(res.data);
  };

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <DialogTitle id="alert-dialog-title">
        {"Enable Message Library"}
      </DialogTitle>
      <DialogContent className={classes.container}>
        {messageDetails && (
          <Grid container>
            <Grid
              item
              xs={4}
              container
              direction="column"
              align="center"
              justify="center"
            >
              <div>ADP ID</div>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                value={
                  messageDetails && messageDetails.adp_id
                    ? messageDetails.adp_id
                    : adpId
                }
                onChange={(e) => {
                  const value = e.target.value;
                  setMessageDetails((prevState) => {
                    return {
                      ...prevState,
                      adp_id: value,
                    };
                  });
                }}
              />
            </Grid>
            <Grid
              item
              xs={4}
              container
              direction="column"
              align="center"
              justify="center"
            >
              FIRST NAME
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                value={messageDetails.first_name}
                onChange={(e) => {
                  const value = e.target.value;
                  setMessageDetails((prevState) => {
                    return {
                      ...prevState,
                      first_name: value,
                    };
                  });
                }}
              />
            </Grid>
            <Grid
              item
              xs={4}
              container
              direction="column"
              align="center"
              justify="center"
            >
              LAST NAME
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                value={messageDetails.last_name}
                onChange={(e) => {
                  const value = e.target.value;
                  setMessageDetails((prevState) => {
                    return {
                      ...prevState,
                      last_name: value,
                    };
                  });
                }}
              />
            </Grid>
            <Grid
              item
              xs={4}
              container
              direction="column"
              align="center"
              justify="center"
            >
              MOBILE
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                value={messageDetails.mobile}
                onChange={(e) => {
                  const value = e.target.value;
                  setMessageDetails((prevState) => {
                    return {
                      ...prevState,
                      mobile: value,
                    };
                  });
                }}
              />
            </Grid>
            <Grid
              item
              xs={4}
              container
              direction="column"
              align="center"
              justify="center"
            >
              REFERRAL LINK
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                value={messageDetails.referral_link}
                onChange={(e) => {
                  const value = e.target.value;
                  setMessageDetails((prevState) => {
                    return {
                      ...prevState,
                      referral_link: value,
                    };
                  });
                }}
              />
            </Grid>
            <Grid
              item
              xs={4}
              container
              direction="column"
              align="center"
              justify="center"
            >
              VIDEO LINK 1
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                value={messageDetails.video_link1}
                onChange={(e) => {
                  const value = e.target.value;
                  setMessageDetails((prevState) => {
                    return {
                      ...prevState,
                      video_link1: value,
                    };
                  });
                }}
              />
            </Grid>
            <Grid
              item
              xs={4}
              container
              direction="column"
              align="center"
              justify="center"
            >
              VIDEO LINK 2
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                value={messageDetails.video_link2}
                onChange={(e) => {
                  const value = e.target.value;
                  setMessageDetails((prevState) => {
                    return {
                      ...prevState,
                      video_link2: value,
                    };
                  });
                }}
              />
            </Grid>
            <Grid
              item
              xs={4}
              container
              direction="column"
              align="center"
              justify="center"
            >
              VIDEO LINK 3
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                value={messageDetails.video_link3}
                onChange={(e) => {
                  const value = e.target.value;
                  setMessageDetails((prevState) => {
                    return {
                      ...prevState,
                      video_link3: value,
                    };
                  });
                }}
              />
            </Grid>
            <Grid
              item
              xs={4}
              container
              direction="column"
              align="center"
              justify="center"
            >
              Whatsapp Group
            </Grid>
            <Grid item xs={8}>
              <Select
                value={messageDetails.whatsapp_grp}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                onChange={(e) => {
                  const value = e.target.value;
                  setMessageDetails((prevState) => {
                    return {
                      ...prevState,
                      whatsapp_grp: value,
                    };
                  });
                }}
              >
                <MenuItem value=""></MenuItem>
                {whatsappGroups.map((group) => (
                  <MenuItem value={group.name}>{group.name}</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        {displayAlert && (
          <span style={{ color: "red" }}>Select WhatsApp group</span>
        )}
        <Button
          onClick={() => {
            if (messageDetails.whatsapp_grp !== "") {
              updateMessageLibrary(adpId, true, messageDetails);
              disableModal(false);
              setShowMessage(true);
            } else {
              setDisplayAlert(true);
            }
          }}
        >
          SAVE
        </Button>
        <Button onClick={() => disableModal(false)} autoFocus>
          DISCARD
        </Button>
      </DialogActions>
    </Paper>
  );
};

export default MessageLibraryPopUp;

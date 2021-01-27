import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card, CardContent, Typography, Button } from "@material-ui/core";
import { apiHandler } from "../../utils/apiConfig";

import LeadersClubPopup from "../molecules/LeadersClubPopup";

const useStyles = makeStyles({
  root: {
    minWidth: 100,
  },
  text: {
    fontSize: 14,
  },
  bodyText: {
    fontSize: 14,
    textAlign: "left",
  },
  buttonMargin: {
    marginTop: "15px",
  },
});

export const LeadersClub = ({ monthMoney }) => {
  const [leadersData, setLeadersData] = useState({
    percent: 6,
    totalPoints: 0,
  });

  const [openPopup, setOpenPopup] = useState(false);
  const [leadersQualifiers, setLeadersQualifiers] = useState([]);
  useEffect(() => {
    getLeadersData();
  }, []);

  const handleClickOpen = async () => {
    await getLeadersQualifiers();
    setOpenPopup(true);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  const getLeadersData = async () => {
    try {
      const res = await apiHandler.get(`/admin/get-leaders-data`);
      setLeadersData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getLeadersQualifiers = async () => {
    try {
      const res = await apiHandler.get(`/admin/get-leaders-qualifiers`);
      setLeadersQualifiers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const classes = useStyles();
  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.text} color="textSecondary">
            Leaders Club
          </Typography>
          <Grid
            container
            style={{
              marginTop: "10px",
            }}
          >
            <Grid item xs={8}>
              <Typography className={classes.bodyText} color="textSecondary">
                Fund Per
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.bodyText} color="textSecondary">
                {leadersData.percent}%
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography className={classes.bodyText} color="textSecondary">
                Fund Income
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.bodyText} color="textSecondary">
                {(monthMoney * leadersData.percent) / 100}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography className={classes.bodyText} color="textSecondary">
                Collected Points
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.bodyText} color="textSecondary">
                {leadersData.totalPoints}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography className={classes.bodyText} color="textSecondary">
                Point Value
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.bodyText} color="textSecondary">
                {leadersData.totalPoints
                  ? parseFloat(
                      (
                        (monthMoney * leadersData.percent) /
                        100 /
                        leadersData.totalPoints
                      ).toFixed(3)
                    )
                  : 0}
              </Typography>
            </Grid>
          </Grid>
          <div className={classes.buttonMargin}>
            <Button
              variant="outlined"
              color="textSecondary"
              onClick={handleClickOpen}
            >
              <Typography className={classes.bodyText} color="textSecondary">
                Qualifiers
              </Typography>
            </Button>
          </div>
        </CardContent>
      </Card>
      <LeadersClubPopup
        open={openPopup}
        onClose={handleClose}
        rows={leadersQualifiers}
      ></LeadersClubPopup>
    </>
  );
};

export default LeadersClub;

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card, CardContent, Typography, Button } from "@material-ui/core";
import { apiHandler } from "../../utils/apiConfig";

import ChampionClubPopup from "../molecules/ChampionClubPopup";

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

export const ChampionClub = ({ monthMoney }) => {
  const [championData, setChampionData] = useState({
    percent: 0,
    fundAllocated: 0,
    totalPoints: 0,
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [championQualifiers, setChampionQualifiers] = useState([]);
  useEffect(() => {
    getChampionData();
  }, []);

  const handleClickOpen = async () => {
    await getChampionQualifiers();
    setOpenPopup(true);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  const getChampionData = async () => {
    try {
      const res = await apiHandler.get(`/admin/get-champion-data`);
      setChampionData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getChampionQualifiers = async () => {
    try {
      const res = await apiHandler.get(`/admin/get-champion-qualifiers`);
      setChampionQualifiers(res.data);
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
            Champion Club
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
                {championData.percent}%
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography className={classes.bodyText} color="textSecondary">
                Fund Income
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.bodyText} color="textSecondary">
                {monthMoney !== ""
                  ? (monthMoney * championData.percent) / 100
                  : 0}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography className={classes.bodyText} color="textSecondary">
                Collected Points
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.bodyText} color="textSecondary">
                {championData.totalPoints}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography className={classes.bodyText} color="textSecondary">
                Point Value
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.bodyText} color="textSecondary">
                {championData.totalPoints
                  ? parseFloat(
                      (
                        (monthMoney * championData.percent) /
                        100 /
                        championData.totalPoints
                      ).toFixed(3)
                    )
                  : 0}
              </Typography>
            </Grid>
            <Grid item xs={12}></Grid>
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
      <ChampionClubPopup
        open={openPopup}
        onClose={handleClose}
        rows={championQualifiers}
      />
    </>
  );
};

export default ChampionClub;

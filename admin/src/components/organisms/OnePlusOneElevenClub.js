import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card, CardContent, Typography, Button } from "@material-ui/core";
import { apiHandler } from "../../utils/apiConfig";

import OnePlusClubPopup from "../molecules/OnePlusClubPopup";

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

export const OnePlusOneElevenClub = ({ monthMoney }) => {
  const [onePlusData, setOnePlusData] = useState({
    percent: 10,
    totalPoints: 0,
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [onePlusCards, setOnePlusCards] = useState([]);

  useEffect(() => {
    getOnePlusData();
  }, []);

  const handleClickOpen = async () => {
    await getOnePlusCards();
    setOpenPopup(true);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  const getOnePlusData = async () => {
    try {
      const res = await apiHandler.get(`/admin/get-one-plus-one-data`);
      setOnePlusData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOnePlusCards = async () => {
    try {
      const res = await apiHandler.get(`/admin/get-one-plus-cards`);
      setOnePlusCards(res.data);
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
            1 + 1 = 11 Club
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
                {onePlusData.percent}%
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography className={classes.bodyText} color="textSecondary">
                Fund Income
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.bodyText} color="textSecondary">
                {(monthMoney * onePlusData.percent) / 100}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography className={classes.bodyText} color="textSecondary">
                Total Card
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.bodyText} color="textSecondary">
                {onePlusData.totalPoints}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography className={classes.bodyText} color="textSecondary">
                Card Income
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.bodyText} color="textSecondary">
                {onePlusData.totalPoints
                  ? parseFloat(
                      (monthMoney * onePlusData.percent) /
                        100 /
                        onePlusData.totalPoints
                    ).toFixed(3)
                  : 0}
              </Typography>
            </Grid>
          </Grid>
          <div className={classes.buttonMargin}>
            <Button
              variant="outlined"
              onClick={handleClickOpen}
              color="textSecondary"
            >
              <Typography className={classes.bodyText} color="textSecondary">
                Qualifiers
              </Typography>
            </Button>
          </div>
        </CardContent>
      </Card>
      <OnePlusClubPopup
        open={openPopup}
        onClose={handleClose}
        rows={onePlusCards}
      />
    </>
  );
};

export default OnePlusOneElevenClub;

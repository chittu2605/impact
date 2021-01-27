import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card, CardContent, Typography, Button } from "@material-ui/core";
import { apiHandler } from "../../utils/apiConfig";

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

export const MEBClub = ({ monthMoney }) => {
  const [mEBData, setChampionData] = useState({
    percent: 15,
    totalPoints: 0,
  });
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.text} color="textSecondary">
          MEB Club
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
              {mEBData.percent}%
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className={classes.bodyText} color="textSecondary">
              Fund Income
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.bodyText} color="textSecondary">
              {(monthMoney * mEBData.percent) / 100}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className={classes.bodyText} color="textSecondary">
              Collected Points
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.bodyText} color="textSecondary">
              {mEBData.totalPoints}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className={classes.bodyText} color="textSecondary">
              Point Value
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.bodyText} color="textSecondary">
              {mEBData.totalPoints
                ? (monthMoney * mEBData.percent) / 100 / mEBData.totalPoints
                : 0}
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.buttonMargin}>
          <Button variant="outlined" color="textSecondary">
            <Typography className={classes.bodyText} color="textSecondary">
              Qualifiers
            </Typography>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MEBClub;

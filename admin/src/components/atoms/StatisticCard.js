import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    padding: "10px",
  },
  statisticText: {
    fontSize: 20,
    // textAlign: "left",
  },
  bodyText: {
    fontSize: 14,
    // textAlign: "left",
  },
});

export const StatisticCard = ({ cardColor, icon, value, title }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Grid Container>
        <Grid item xs={12}>
          <Typography className={classes.statisticText} color="textSecondary">
            {value === "Not Available" ? 0 : value}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.bodyText} color="textSecondary">
            {title}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StatisticCard;

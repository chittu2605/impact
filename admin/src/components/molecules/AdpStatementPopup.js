import {
  Dialog,
  DialogTitle,
  Grid,
  makeStyles,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableFooter,
  TableCell,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const headerMap = {
  aid: "ADP ID",
  aname: "ADP NAME",
  level: "LEVEL",
  bv: "BV",
  difference: "DIFFERENCE",
  commision: "COMMISION",
};

const AdpStatementPopup = ({
  open,
  onClose,
  incomeDetails,
  statementDetails,
  cycleDetails,
}) => {
  const classes = useStyles();
  let childBVTotal = 0;
  let adpCommision = statementDetails
    ? Math.round(
        (statementDetails.adpDetails.pbv *
          statementDetails.adpDetails.zone_value) /
          100
      )
    : 0;
  let totalIncome = statementDetails
    ? Math.round(
        statementDetails.adpDetails.champion_earnings +
          statementDetails.adpDetails.oneplus_earnings +
          statementDetails.adpDetails.leaders_earnings +
          statementDetails.adpDetails.income_from_child +
          adpCommision
      )
    : 0;
  return (
    <Dialog
      onClose={() => onClose()}
      aria-labelledby="adp-statement-dialog-title"
      open={open}
      fullWidth
      maxWidth="xl"
    >
      <DialogTitle id="adp-statement-dialog-title">ADP Statememt</DialogTitle>
      {statementDetails && (
        <Paper className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={6} container justify="center">
              ADP ID:{incomeDetails.adp_id}
            </Grid>
            <Grid item xs={6} container justify="center">
              ADP NAME:
              {`${incomeDetails.firstname} ${incomeDetails.lastname}`}
            </Grid>
            <Grid item xs={12}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {Object.keys(headerMap).map((key) => (
                        <TableCell
                          key={key}
                          component="th"
                          scope="row"
                          className={classes.cell}
                        >
                          {headerMap[key]}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{incomeDetails.adp_id}</TableCell>
                      <TableCell>{`${incomeDetails.firstname} ${incomeDetails.lastname}`}</TableCell>
                      <TableCell>
                        {statementDetails.adpDetails.zone_value} %
                      </TableCell>
                      <TableCell>{statementDetails.adpDetails.pbv}</TableCell>
                      <TableCell>
                        {statementDetails.adpDetails.zone_value} %
                      </TableCell>
                      <TableCell>
                        {adpCommision}
                        RS
                      </TableCell>
                    </TableRow>
                    {statementDetails.childeDetails.map((child) => {
                      childBVTotal += child.bv;
                      const difference =
                        statementDetails.adpDetails.zone_value -
                        child.zone_value;
                      const commision = child.bv * (difference / 100);
                      //comissionTotal += commision;
                      return (
                        <TableRow key={child.adp_id}>
                          <TableCell>{child.adp_id}</TableCell>
                          <TableCell>
                            {child.firstname + " " + child.lastname}
                          </TableCell>
                          <TableCell>{child.zone_value}%</TableCell>
                          <TableCell>{child.bv}</TableCell>
                          <TableCell>{difference}%</TableCell>
                          <TableCell>{Math.round(commision) + " RS"}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell>Total</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        {statementDetails.adpDetails.pbv + childBVTotal}
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        {Math.round(
                          adpCommision +
                            statementDetails.adpDetails.income_from_child
                        ) + " RS"}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Grid>
            <Grid container>
              <Grid item xs={6} container justify="center">
                <Grid item xs={6} container justify="flex-end">
                  RETAIL PROFIT
                </Grid>
                <Grid item xs={6} container justify="flex-start">
                  :0 RS
                </Grid>
              </Grid>
              <Grid item xs={6} container justify="center">
                <Grid item xs={6} container justify="flex-end">
                  CO-SPONSOR ROYALTY
                </Grid>
                <Grid item xs={6} container justify="flex-start">
                  :{statementDetails.adpDetails.co_sponsor_royality}RS
                </Grid>
              </Grid>
              <Grid item xs={6} container justify="center">
                <Grid item xs={6} container justify="flex-end">
                  CHAMPION CLUB
                </Grid>
                <Grid item xs={6} container justify="flex-start">
                  :{statementDetails.adpDetails.champion_earnings}RS
                </Grid>
              </Grid>
              <Grid item xs={6} container justify="center">
                <Grid item xs={6} container justify="flex-end">
                  1 + 1 = 11 CLUB
                </Grid>
                <Grid item xs={6} container justify="flex-start">
                  :{statementDetails.adpDetails.oneplus_earnings} RS
                </Grid>
              </Grid>
              <Grid item xs={6} container justify="center">
                <Grid item xs={6} container justify="flex-end">
                  LEADERS CLUB
                </Grid>
                <Grid item xs={6} container justify="flex-start">
                  :{statementDetails.adpDetails.leaders_earnings} RS
                </Grid>
              </Grid>
              <Grid item xs={6} container justify="center">
                <Grid item xs={6} container justify="flex-end">
                  INCOME FROM PULL
                </Grid>
                <Grid item xs={6} container justify="flex-start">
                  :{statementDetails.adpDetails.pull_income} RS
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} container justify="center">
                <Grid item xs={6} container justify="flex-end">
                  TOTAL INCOME
                </Grid>
                <Grid item xs={6} container justify="flex-start">
                  :{totalIncome} RS
                </Grid>
              </Grid>
              <Grid item xs={12} container justify="center">
                <Grid item xs={6} container justify="flex-end">
                  PULL INCOME DISBURSED
                </Grid>
                <Grid item xs={6} container justify="flex-start">
                  :
                  {totalIncome <= cycleDetails.pullThreshold
                    ? 0
                    : totalIncome - cycleDetails.pullThreshold}{" "}
                  RS
                </Grid>
              </Grid>
              <Grid item xs={12} container justify="center">
                <Grid item xs={6} container justify="flex-end">
                  INCOME FROM PREVIOUS CYCLE
                </Grid>
                <Grid item xs={6} container justify="flex-start">
                  :{statementDetails.adpDetails.prev_cycle_income} RS
                </Grid>
              </Grid>
              <Grid item xs={12} container justify="center">
                <Grid item xs={6} container justify="flex-end">
                  NET COMMISION
                </Grid>
                <Grid item xs={6} container justify="flex-start">
                  :
                  {statementDetails.adpDetails.co_sponsor_royality +
                    statementDetails.adpDetails.total_income +
                    statementDetails.adpDetails.prev_cycle_income}{" "}
                  RS
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Dialog>
  );
};

export default AdpStatementPopup;

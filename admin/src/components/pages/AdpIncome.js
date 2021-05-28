import {
  Grid,
  makeStyles,
  Paper,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { apiHandler } from "../../utils/apiConfig";
import AdpStatementPopup from "../molecules/AdpStatementPopup";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  cell: {
    width: "160",
  },
});

const headerMap = {
  aid: "ADP ID",
  aname: "ADP NAME",
  amount: "AMOUNT",
  details: "Details",
};

const AdpIncome = () => {
  const [cycleHistory, setCycleHistory] = useState([]);
  const [selectedCycle, setSelectedCycle] = useState("");
  const [cycleIncomes, setCycleIncomes] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [totalItems, setTotalItems] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const classes = useStyles();
  useEffect(() => {
    fetchAllCycles();
  }, []);

  useEffect(() => {
    fetchTotalItems();
    fetchCycleIncomes();
  }, [selectedCycle]);

  useEffect(() => {
    fetchCycleIncomes();
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchStatementDetails();
  }, [selectedItem]);

  const fetchAllCycles = async () => {
    try {
      const res = await apiHandler.get(`/admin/get-all-cylces`);
      setCycleHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCycleChange = (e) => {
    const value = e.target.value;
    setSelectedCycle(value);
  };

  const fetchTotalItems = async () => {
    try {
      const res = await apiHandler.get(
        `/admin/get-total-incomes/${selectedCycle}`
      );
      setTotalItems(res.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCycleIncomes = async () => {
    try {
      const res = await apiHandler.get(
        `/admin/get-cycle-incomes/${selectedCycle}/${page}/${rowsPerPage}`
      );
      setCycleIncomes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStatementDetails = async () => {
    try {
      const res = await apiHandler.get(
        `/admin/adp-statement-details/${selectedItem.adp_id}/${selectedCycle}`
      );
      setSelectedDetails(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  const getPullThreshold = () =>
    cycleHistory.find((history) => history.id === selectedCycle).pullThreshold;

  return (
    <>
      <Grid
        container
        spacing={2}
        style={{
          marginTop: "40px",
          textAlign: "center",
          padding: "1rem",
          margin: "auto",
          width: "90%",
        }}
      >
        <Grid item xs={12}>
          <Paper style={{ textAlign: "center", padding: "1rem" }} elevation={3}>
            <Grid container>
              <Grid
                item
                xs={3}
                container
                direction="column"
                align="center"
                justify="center"
              >
                SELECT CYCLE:
              </Grid>
              <Grid item xs={9} container justify="flex-start">
                <Select
                  value={selectedCycle}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  onChange={handleCycleChange}
                >
                  <MenuItem value=""></MenuItem>
                  {cycleHistory.map((history) => (
                    <MenuItem key={"" + history.id} value={history.id}>
                      {history.toDate}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              {cycleIncomes.length > 0 && (
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
                        {cycleIncomes.map((income, index) => (
                          <TableRow key={"" + index}>
                            <TableCell>{income.adp_id}</TableCell>
                            <TableCell>{`${income.firstname} ${income.lastname}`}</TableCell>
                            <TableCell>
                              {income.overflow > 0
                                ? 0
                                : income.total_income +
                                  income.champion_earnings +
                                  income.prev_cycle_income}
                            </TableCell>
                            <TableCell>
                              <Button
                                style={{
                                  color: "white",
                                  backgroundColor: "red",
                                  outline: "none",
                                }}
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => {
                                  setSelectedItem(income);
                                  setOpenPopup(true);
                                }}
                              >
                                GET DETAILS
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[100, 500, 1000]}
                    component="div"
                    count={totalItems}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <AdpStatementPopup
        open={openPopup}
        onClose={handleClose}
        incomeDetails={selectedItem}
        statementDetails={selectedDetails}
        cycleDetails={
          cycleHistory.length > 0
            ? cycleHistory.find((his) => his.id === selectedCycle)
            : null
        }
      />
    </>
  );
};

export default AdpIncome;

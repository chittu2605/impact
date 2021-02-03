import React, { useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export const ChampionClubPopup = ({ open, onClose, rows }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const classes = useStyles();
  const tableRows = rows ? rows : [];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Dialog
      onClose={() => onClose()}
      aria-labelledby="champion-dialog-title"
      open={open}
    >
      <DialogTitle id="champion-dialog-title">Champion Qualifiers</DialogTitle>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  ADP ID
                </TableCell>
                <TableCell component="th" scope="row">
                  Name
                </TableCell>
                <TableCell component="th" scope="row">
                  PBV
                </TableCell>
                <TableCell component="th" scope="row">
                  New Joinee
                </TableCell>
                <TableCell component="th" scope="row">
                  Joinee BV
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const metSecondCondition = row.new_co_sponsored > 4 && row.current_month_gbv >= 8000
                  return (
                    <TableRow key={row.adp_id}>
                      <TableCell component="th" scope="row">
                        {row.adp_id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.firstname + " " + row.lastname}
                      </TableCell>
                      <TableCell style={{ width: 160 }}>
                        {row.current_month_pbv > 5000 ? row.current_month_pbv : '-'}
                      </TableCell>
                      <TableCell style={{ width: 160 }}>
                        {metSecondCondition ? row.new_co_sponsored : '-'}
                      </TableCell>
                      <TableCell style={{ width: 160 }}>
                        {metSecondCondition ? row.current_month_gbv : '-'}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={tableRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Dialog>
  );
};

export default ChampionClubPopup;

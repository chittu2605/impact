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

export const LeadersClubPopup = ({ open, onClose, rows }) => {
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
      aria-labelledby="leaders-dialog-title"
      open={open}
    >
      <DialogTitle id="leaders-dialog-title">
        Leaders Club Qualifiers
      </DialogTitle>
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
                  Line1 BV
                </TableCell>
                <TableCell component="th" scope="row">
                  Line2 BV
                </TableCell>
                <TableCell component="th" scope="row">
                  Line3 BV
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row.sponsor_id}>
                      <TableCell style={{ width: 160 }}>{row.adp_id}</TableCell>
                      <TableCell style={{ width: 160 }}>
                        {row.firstname + " " + row.lastname}
                      </TableCell>
                      <TableCell style={{ width: 160 }}>
                        {row.line1_bv}
                      </TableCell>
                      <TableCell style={{ width: 160 }}>
                        {row.line2_bv}
                      </TableCell>
                      <TableCell style={{ width: 160 }}>
                        {row.line3_bv}
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

export default LeadersClubPopup;

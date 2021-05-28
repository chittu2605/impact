import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Button,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Input,
} from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import Pagination from "react-js-pagination";
import TableList from "../atoms/TableList";
import { apiHandler } from "../../utils/apiConfig";
const ADPTable = (props) => {
  const [messageDefaults, setMessageDefaults] = useState([]);

  useEffect(() => {
    getAdpMessageDefaults();
  }, []);

  const getAdpMessageDefaults = async () => {
    const res = await apiHandler.get(`/admin/get-message-lib-defaults`);
    setMessageDefaults(res.data);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <h5>ADP List</h5>
        </Grid>
        <Grid item xs={12} sm={6} style={{ textAlign: "left" }}>
          <Input
            placeholder="Search"
            id="filled-basic"
            value={props.searchValue}
            style={{ width: "20%", marginLeft: "10px", marginRight: "10px" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ textAlign: "right", paddingRight: "30px" }}
        >
          <Button
            style={{ color: "white", backgroundColor: "red", outline: "none" }}
            variant="contained"
            color="primary"
            size="small"
            //onClick={() => props.quantityReduced}
          >
            Download All
          </Button>
        </Grid>
      </Grid>
      <Pagination
        // hideDisabled
        prevPageText="prev"
        nextPageText="next"
        firstPageText="first"
        lastPageText="last"
        activePage={props.currentPage}
        itemsCountPerPage={100}
        totalItemsCount={props.count}
        pageRangeDisplayed={5}
        onChange={props.handlePagination}
      />
      <Grid container>
        <Grid item xs={12}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow hover>
                  <TableCell style={{ fontWeight: "900" }}>
                    Serial No.
                  </TableCell>
                  <TableCell style={{ fontWeight: "900" }}>ADP Id</TableCell>
                  <TableCell align="left" style={{ fontWeight: "900" }}>
                    First Name
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "900" }}>
                    Mobile
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "900" }}>
                    Email
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "900" }}>
                    Password
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "900" }}>
                    Message Library
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "900" }}>
                    Button
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.adpItem.map((row, i) => (
                  <TableList
                    key={row.adp_id}
                    adpId={row.adp_id}
                    serialNumber={i + 1 + (props.currentPage - 1) * 100}
                    firstname={row.firstname}
                    lastname={row.lastname}
                    mobile={row.mobile}
                    email={row.email}
                    showMessages={row.show_messages}
                    password={row.password}
                    active={row.success}
                    handleChange={props.handleChange}
                    saveTempRow={() => {
                      props.saveTempRow(row);
                    }}
                    cancelChanges={props.cancelChanges}
                    rowActionDisable={() => {
                      props.rowActionDisable(row);
                    }}
                    rowActionEnable={props.rowActionEnable}
                    actionDisableButton={row.actionDisableButton}
                    updateDashboard={props.updateDashboard}
                    messageDefaults={messageDefaults}
                    // validationValue={props.validationValue}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            // hideDisabled
            prevPageText="prev"
            nextPageText="next"
            firstPageText="first"
            lastPageText="last"
            activePage={props.currentPage}
            itemsCountPerPage={100}
            totalItemsCount={props.count}
            pageRangeDisplayed={5}
            onChange={props.handlePagination}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ADPTable;

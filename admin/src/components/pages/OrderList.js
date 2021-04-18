import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
} from "@material-ui/core";
import { Slate } from "../atoms/Slate";

import { apiHandler } from "../../utils/apiConfig";
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
  oid: "Order ID",
  aid: "ADP ID",
  aname: "ADP NAME",
  amount: "AMOUNT",
  bv: "BV",
  pbv: "PURCHASE BV",
  type: "TYPE",
};

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [totalOrders, setTotalOrders] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    fetchTotalOrders();
  }, []);

  useEffect(() => {
    fetchOrderList();
  }, [page, rowsPerPage]);

  const fetchTotalOrders = async () => {
    try {
      const res = await apiHandler.get(`/admin/get-total-orders`);
      setTotalOrders(res.data.totalOrders);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrderList = async () => {
    try {
      const res = await apiHandler.get(
        `/admin/get-orders-data/${page}/${rowsPerPage}`
      );
      setOrders(res.data);
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

  return (
    <Slate>
      <h1>Order List</h1>
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
        <Paper className={classes.root}>
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
                {orders.map((order) => (
                  <TableRow key={"" + order.oid}>
                    <TableCell>{order.oid}</TableCell>
                    <TableCell>{order.adp_id}</TableCell>
                    <TableCell>{`${order.firstname} ${order.lastname}`}</TableCell>
                    <TableCell>{order.after_discount * order.qty}</TableCell>
                    <TableCell>{order.bv * order.qty}</TableCell>
                    <TableCell>
                      {Math.round(
                        order.bv * order.qty * (order.bv_weightage / 100)
                      )}
                    </TableCell>
                    <TableCell>{order.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[25, 50, 200]}
            component="div"
            count={totalOrders}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </Slate>
  );
};

export default OrderList;

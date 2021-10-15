import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { device } from "../../utils/mediaQueries/device";

const styles = {
  formInput: {
    // width: "65%",
    // [device.mobileL]: {
    //   width: "60%",
    // },
  },
  FormInputBorderColor: {},
  FormInputBorderColor: {},
  button: {
    marginTop: "0.7rem",

    [device.mobileL]: {
      marginLeft: "1rem",
    },
  },

  paper: {
    padding: "1rem",
  },
  grid: {
    // margin: "auto"
  },
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ProductTable(props) {
  const classes = useStyles();
  const { productList } = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Serial Number</TableCell>
            <TableCell align="right">Product Name</TableCell>
            <TableCell align="center">Details</TableCell>
            {/* <TableCell align="right">MRP Price</TableCell>
            <TableCell align="right">Price After discount</TableCell>
            <TableCell align="right">Retail Profit</TableCell>
            <TableCell align="right">Actual Price</TableCell>
            <TableCell align="right">Business Volume</TableCell>
            <TableCell align="right">VDC credit</TableCell>
            <TableCell align="right">VDC Debit</TableCell>
            <TableCell align="right">VDC Admin</TableCell>
            <TableCell align="right">Max Purchase</TableCell>
            <TableCell align="right">Quantity</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {productList.map((row, idx) => (
            <TableRow key={row.name}>
              <TableCell align="right" component="th" scope="row">
                {idx + 1}
              </TableCell>
              <TableCell align="right">{row.product}</TableCell>
              <TableCell align="right">
                {row.details && row.details.length > 0 && (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">MRP Price</TableCell>
                        <TableCell align="right">Discount</TableCell>
                        <TableCell align="right">
                          Price After discount
                        </TableCell>
                        <TableCell align="right">Unit Quantity</TableCell>
                        <TableCell align="right">Unit</TableCell>
                        <TableCell align="right">Retail Profit</TableCell>
                        <TableCell align="right">Actual Price</TableCell>
                        <TableCell align="right">Business Volume</TableCell>
                        <TableCell align="right">VDC credit</TableCell>
                        <TableCell align="right">VDC Debit</TableCell>
                        <TableCell align="right">VDC Admin</TableCell>
                        <TableCell align="right">Max Purchase</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.details.map((elm) => {
                        return (
                          <TableRow>
                            <TableCell align="right">
                              {elm.unit_quantity}
                              {elm.unit}
                            </TableCell>
                            <TableCell align="right">{elm.price}</TableCell>
                            <TableCell align="right">{elm.discount}</TableCell>
                            <TableCell align="right">
                              {elm.after_discount}
                            </TableCell>
                            <TableCell align="right">
                              {elm.unit_quantity}
                            </TableCell>
                            <TableCell align="right">{elm.unit}</TableCell>
                            <TableCell align="right">
                              {elm.retail_profit}
                            </TableCell>
                            <TableCell align="right">
                              {elm.actual_price}
                            </TableCell>
                            <TableCell align="right">{elm.bv}</TableCell>
                            <TableCell align="right">{elm.vdbc}</TableCell>
                            <TableCell align="right">{elm.vdbd}</TableCell>
                            <TableCell align="right">{elm.vdba}</TableCell>
                            <TableCell align="right">
                              {elm.max_purchase}
                            </TableCell>
                            <TableCell align="right">{elm.quantity}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </TableCell>
              {/* <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.after_discount}</TableCell>
              <TableCell align="right">{row.retail_profit}</TableCell>
              <TableCell align="right">{row.actual_price}</TableCell>
              <TableCell align="right">{row.bv}</TableCell>
              <TableCell align="right">{row.vdbc}</TableCell>
              <TableCell align="right">{row.vdbd}</TableCell>
              <TableCell align="right">{row.vdba}</TableCell>
              <TableCell align="right">{row.maxPurchase}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    success: state.updateFranchiseList.success,
    productList: state.updateFranchiseList.productList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getCityAction: bindActionCreators(getCityAction, dispatch),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withStyles(styles)(connector(ProductTable));

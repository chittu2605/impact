import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { device } from "../../utils/mediaQueries/device";
import ReactDataGrid from "react-data-grid";
// import { Editors } from "react-data-grid-addons";
import { Grid } from "@material-ui/core";
import clsx from "clsx";
import styled from "styled-components";

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
  productName: {
    fontSize: "18px",
    textTransform: "uppercase",
    
  },
  dataGrid: {
    marginBottom: "5rem !important",
  },
  deleteContainer: {
    position: "relative",
    display: "inline-block",
    width: "50px",
    height: "15px",
  }
};

const ProductName = styled("div")(styles.productName)
const StyledReactDataGrid = styled(ReactDataGrid)(styles.dataGrid)
const DeleteContainer = styled("span")(styles.deleteContainer)

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// const columns = [
//   { key: 'id', name: 'ID' },
//   { key: 'title', name: 'Title' },
//   { key: 'count', name: 'Count' } ];

// const rows = [{id: 0, title: 'row1', count: 20}, {id: 1, title: 'row1', count: 40}, {id: 2, title: 'row1', count: 60}];


function FranchiseProductTable(props) {
  const classes = useStyles();
  const { productList, className,columns, onRowsUpdate } = props;
  let rows = productList;
  let newRows = rows.map((elm) => {return elm.details})
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className={clsx(classes.grid, className)}>
        {
          rows && rows.map((elm, index) => {
            return (
              <div key={index}>
                <ProductName>{elm.product}<DeleteContainer>{elm.delete}</DeleteContainer></ProductName>
                {
                  elm.details && <StyledReactDataGrid
                  columns={columns}
                  rows={elm.details}
                  onRowsUpdate={({fromRow, toRow, updated}) => {onRowsUpdate(fromRow, toRow, updated, index)}}
                  enableCellSelect={true}
                />
                }
                
                <br></br>
              </div>
            )
          })

        }
        
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    // success: state.updateFranchiseList.success,
    // productList: state.updateFranchiseList.productList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getCityAction: bindActionCreators(getCityAction, dispatch),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withStyles(styles)(connector(FranchiseProductTable));

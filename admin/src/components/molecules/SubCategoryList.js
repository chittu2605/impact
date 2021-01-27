import React from "react";
import CustomTable from "../atoms/CustomTable";
import { getSubCategoryAction } from "../../redux/actions/subCategory";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = {};

class SubCategoryList extends React.Component {
  componentDidMount() {
    // this.props.getSubCategoryAction();
  }

  render() {
    const { classes, className, status } = this.props;
    return (
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          className={clsx(classes.grid, className)}
        >
          <CustomTable
            columns={[{ title: "Category Name", field: "sub_category" }]}
            data={this.props.subCategoryList}
            title="Sub Category"
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.updateSubCategoryList.status,
    subCategoryList: state.updateSubCategoryList.subCategoryList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSubCategoryAction: bindActionCreators(getSubCategoryAction, dispatch),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withStyles(styles)(connector(SubCategoryList));

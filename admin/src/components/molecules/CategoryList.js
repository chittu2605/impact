import React from "react";
import CustomTable from "../atoms/CustomTable";
import { getCategoryAction } from "../../redux/actions/category";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = {};

class CategoryList extends React.Component {
  componentDidMount() {
    this.props.getCategoryAction();
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
            columns={[{ title: "Category Name", field: "category" }]}
            data={this.props.categoryList}
            title="Category"
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.updateCategoryList.status,
    categoryList: state.updateCategoryList.categoryList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryAction: bindActionCreators(getCategoryAction, dispatch),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withStyles(styles)(connector(CategoryList));

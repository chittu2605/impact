import React from "react";
import CustomTable from "../atoms/CustomTable";
import { getCityAction } from "../../redux/actions/city";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = {};

class CityList extends React.Component {
  componentDidMount() {
    this.props.getCityAction();
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
            columns={[{ title: "City Name", field: "city" }]}
            data={this.props.cityList}
            title="City"
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.updateCityList.status,
    cityList: state.updateCityList.cityList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCityAction: bindActionCreators(getCityAction, dispatch),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withStyles(styles)(connector(CityList));

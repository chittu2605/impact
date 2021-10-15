import React from "react";
import { Slate } from "../atoms/Slate";
import AdpInfo from "../molecules/AdpInfo";
import SearchAutoComplete from "../atoms/SearchAutoComplete";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Paper, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { device } from "../../utils/mediaQueries/device";
import clsx from "clsx";
import { updateSelectedAdpSuccess } from "../../redux/actions/adp";
import TextInput from "../atoms/TextInput";
import { apiHandler } from "../../utils/apiConfig";
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

class DebitSMBalance extends React.Component {
  state = {
    amount: 0,
  };

  componentWillMount = () => {
    this.props.updateSelectedAdpSuccess({});
  };

  handleChange = (e) => {
    this.setState({
      amount: e.target.value,
    });
  };

  handleDebitWallet = () => {
    let { adp_id } = this.props;
    let { amount } = this.state;
    if (!adp_id) return alert("Please select an ADP");
    let body = {
      adpId: adp_id,
      balance: amount,
    };
    debitWallet(body).then((response) => {
      alert("Balance debited from Smartmart Wallet.");
      this.props.updateSelectedAdpSuccess({});
      this.setState({
        amount: 0,
      });
    });
  };

  render() {
    const { classes, className, adp_id, firstname, lastname } = this.props;
    return (
      <Slate>
        <SearchAutoComplete />
        <br></br>
        <AdpInfo />
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={8}
            md={8}
            className={clsx(classes.grid, className)}
          >
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  className={clsx(classes.grid, className)}
                >
                  <TextInput
                    label="Amount to Add"
                    value={this.state.amount}
                    handleChange={this.handleChange}
                    type="number"
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  className={clsx(classes.grid, className)}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={this.state.amount == 0}
                    onClick={this.handleDebitWallet}
                  >
                    Debit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Slate>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adp_id: state.updateAdpInfo.adp_id,
    firstname: state.updateAdpInfo.firstname,
    lastname: state.updateAdpInfo.lastname,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSelectedAdpSuccess: bindActionCreators(
      updateSelectedAdpSuccess,
      dispatch
    ),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default withStyles(styles)(connector(DebitSMBalance));

function debitWallet(body) {
  return apiHandler.post("/debit-sm-balance", body);
}

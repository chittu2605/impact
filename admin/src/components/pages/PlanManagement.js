import React from "react";
import { Slate } from "../atoms/Slate";
import { apiHandler } from "../../utils/apiConfig";
import { withStyles } from "@material-ui/core/styles";
import { device } from "../../utils/mediaQueries/device";
import PlanListItem from "../atoms/PlanListItem";
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

class PlanManagement extends React.Component {
  state = {
    planList: [],
    tempPlan: {},
    updating: false,
  };

  componentDidMount = () => {
    getAllPlanManagement().then((response) => {
      this.setState({
        planList: response.data.results,
      });
    });
  };

  handleEditClicked = (row) => {
    let newRow = Object.assign({}, row)
    this.setState({
      tempPlan: newRow,
      updating: true,
    })
  }

  handleCancelClicked = (row) => {
    this.setState({
      tempPlan: {},
      updating: false,
    })
  }

  handleTempPlanChange = (key, value) => {
    let tempPlan = this.state.tempPlan;
    tempPlan[key] = value;
    this.setState({
      tempPlan
    })
  }

  handleUpdate = () => {
    let tempPlan = this.state.tempPlan; 
    let planList = this.state.planList; 
    let body = {
      plan: tempPlan
    }
    updatePlan(body).then((response) => {
      planList && planList.map((elm) => {
        if (elm.id == tempPlan.id) {
          elm.value = tempPlan.value;
          elm.min_value = tempPlan.min_value;
          elm.max_value = tempPlan.max_value;
          elm.value2 = tempPlan.value2;
          elm.value3 = tempPlan.value3;
        }
      })

      this.setState({
        planList,
        tempPlan: {},
        updating: false,
      })
    })
  }

  render() {
    const { classes } = this.props;
    const { planList, updating, tempPlan } = this.state;
    return (
      <Slate>
        <Paper className={classes.paper}>
          <h2>Plan Management</h2>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow hover>
                  <TableCell style={{ fontWeight: "900" }}>
                    Plan Name
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: "900" }}>
                    Name
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "900" }}>
                    Value
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "900" }}>
                    Min Value
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "900" }}>
                    Max Value
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "900" }}>
                    Value 2
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "900" }}>
                    Value 3
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "900", width:"200px" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
              {planList && planList.map((row, i) => {
                return (
                  <PlanListItem
                    key={i} 
                    row={row}
                    handleEditClicked={this.handleEditClicked}
                    handleCancelClicked={this.handleCancelClicked}
                    handleTempPlanChange={this.handleTempPlanChange}
                    handleUpdate={this.handleUpdate}
                    updating={updating}
                    tempPlan={tempPlan}
                  />
                )
              })}
              </TableBody>
            </Table>
          </TableContainer>
         
        </Paper>
      </Slate>
    );
  }
}

export default withStyles(styles)(PlanManagement);

function getAllPlanManagement() {
  return apiHandler.get("/all-plan-management");
}


function updatePlan(body) {
  return apiHandler.post("/update-plan", body);
}

import React from "react";
import {
  Button,
  TextField,
  TableRow,
  TableCell,
  Input,
  Menu,
  MenuItem,
  ListItemText,
} from "@material-ui/core";
import styled from "styled-components";

const styles = {
  styledRow: {
    backgroundColor: "#fafafa",
    "&.disabled": {
      backgroundColor: "#d1d1d1",
    },
  },
  styledButton: {
    color: "white !important",
    backgroundColor: "red !important",
    outline: "none !important",
    "&:hover": {
      backgroundColor: "red !important",
    },
    "&.disabled": {
      backgroundColor: "#d16868 !important",
    },
  },
};

const StyledRow = styled(TableRow)(styles.styledRow);
const StyledButton = styled(Button)(styles.styledButton);

const PlanListItem = (props) => {
  let { 
    row, 
    handleEditClicked, 
    updating, 
    handleCancelClicked,
    tempPlan,
    handleTempPlanChange,
    handleUpdate
  } = props;
  return (
    <StyledRow>
      <TableCell component="th" scope="row">
        {row.plan_name}
      </TableCell>
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell align="center" component="th" scope="row" >
        {
          updating && tempPlan.id == row.id ? (
            <Input
              // type="number"
              value={tempPlan.value}
              disabled={false}
              onChange={(event) => handleTempPlanChange("value", event.target.value)}
              style={{ outline:"none "}}
            />
          ) : (
            <>{row.value}</>
          )
        }
      </TableCell>
      <TableCell align="center" component="th" scope="row">
        {
          updating && tempPlan.id == row.id ? (
            <Input
              // type="number"
              value={tempPlan.min_value}
              disabled={false}
              onChange={(event) => handleTempPlanChange("min_value", event.target.value)}
              style={{ outline:"none "}}
            />
          ) : (
            <>{row.min_value}</>
          )
        }
      </TableCell>
      <TableCell align="center" component="th" scope="row">
      {
          updating && tempPlan.id == row.id ? (
            <Input
              // type="number"
              value={tempPlan.max_value}
              disabled={false}
              onChange={(event) => handleTempPlanChange("max_value", event.target.value)}
              style={{ outline:"none "}}
            />
          ) : (
            <>{row.max_value}</>
          )
        }
      </TableCell>
      <TableCell align="center" component="th" scope="row">
      {
          updating && tempPlan.id == row.id ? (
            <Input
              // type="number"
              value={tempPlan.value2}
              disabled={false}
              onChange={(event) => handleTempPlanChange("value2", event.target.value)}
              style={{ outline:"none "}}
            />
          ) : (
            <>{row.value2}</>
          )
        }
      </TableCell>
      <TableCell align="center" component="th" scope="row">
      {
          updating && tempPlan.id == row.id ? (
            <Input
              // type="number"
              value={tempPlan.value3}
              disabled={false}
              onChange={(event) => handleTempPlanChange("value3", event.target.value)}
              style={{ outline:"none "}}
            />
          ) : (
            <>{row.value3}</>
          )
        }
      </TableCell>
      <TableCell align="center" component="th" scope="row">
        {updating && tempPlan.id == row.id ? (
          <>
            <StyledButton
              style={{
                display: "inline-block",
                color: "white",
                backgroundColor: "red",
                outline: "none",
              }}
              variant="contained"
              color="primary"
              size="small"
              // disable={(Validation("name", props.name) &&
              //         Validation("email", props.email) &&
              //         Validation("mobile", props.mobile) &&
              //         Validation("password", props.password)) ? false : true}
              onClick={handleCancelClicked}
            >
              Cancel
            </StyledButton>
            
            <StyledButton
              style={{
                display: "inline-block",
                color: "white",
                backgroundColor: "red",
                outline: "none",
                marginLeft: "5px"
              }}
              variant="contained"
              color="primary"
              size="small"
              // disable={(Validation("name", props.name) &&
              //         Validation("email", props.email) &&
              //         Validation("mobile", props.mobile) &&
              //         Validation("password", props.password)) ? false : true}
              onClick={handleUpdate}
            >
              Update
            </StyledButton>
          </>
        ) : (
          
          <StyledButton
          className={updating ? "disabled" : ""}
            style={{
              display: "inline-block",
              color: "white",
              backgroundColor: "red",
              outline: "none",
            }}
            variant="contained"
            color="primary"
            size="small"
            disabled={updating}
            onClick={() => {handleEditClicked(row)}}
          >
            Edit
          </StyledButton>
        )}
      </TableCell>
    </StyledRow>
  );
};

export default PlanListItem;

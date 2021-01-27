import React from "react";
// import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, Icon} from "@material-ui/core";
// import AddIcon from '@material-ui/icons/Add';
// import RemoveIcon from '@material-ui/icons/Remove';
import styled  from "styled-components";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  Button
} from "reactstrap";
import TextInput from "components/Input/TextInput";


const style = {
    button: {
        background: "red !important",
        color: "white !important"
    },
    th: {
      fontSize: "0.8rem !important",
      fontWeight: "400 !important",
    },
    cartInput: {
      width: "20px !important",
      padding: "0 !important",
      height: "20px !important",
      borderRadius: "50px",
      textAlign: "center",
      width: "24px",
      height: "24px",
      margin: "0 2px"
    },
    addRemoveButton: {
      width: "24px",
      height: "24px",
      borderRadius: "50px",
      border: 0,
      "i": {
        marginTop: "5px",
      }
    },
    
}


const StyledButton = styled(Button)(style.button)
const StyledTH = styled("th")(style.th)
const StyledTextInput = styled(TextInput)(style.cartInput)
const StyledAddRemoveButton = styled(StyledButton)(style.addRemoveButton)

const cart = (props) => {
    // console.log(props.cartItem);
    return(
            <Table responsive striped bordered hover >
                
                    <thead className="text-primary">
                       <tr  >
                            <StyledTH >Product Name</StyledTH>
                            <StyledTH align="right" >Price</StyledTH>
                            <StyledTH align="center" >Quantity</StyledTH>
                            <StyledTH align="right" >Total Price</StyledTH>
                            <StyledTH align="right" >Discount</StyledTH>
                            <StyledTH align="right" >After Discount</StyledTH>
                            <StyledTH align="right" >Net Price</StyledTH>
                            <StyledTH align="right" >BV</StyledTH>
                            {props.showDiscount && <StyledTH align="right" >Smart Mart Discount</StyledTH>}
                            <StyledTH align="right" >Retail Profit</StyledTH>
                            <StyledTH align="right" >Delete</StyledTH>
                        </tr>
                    </thead>
                    <tbody>

                    {props.cartItem.map((row) => (
                            <tr key={row.product}>
                                <td component="th" scope="row">
                                    {row.product}
                                </td>
                                <td align="right">{row.price}</td>
                                <td align="right" style={{display:"flex", alignItems: "end"}}> 
                                  <div style={{display:"flex", alignItems: "end", marginTop: "7px"}}>
                                    <StyledAddRemoveButton 
                                          style={{padding:"0", outline:"none", minWidth:"10px" }}
                                          variant="contained"
                                          color="primary"
                                          onClick={() => props.quantityReduced(row)}
                                      >
                                          <i className="now-ui-icons ui-1_simple-delete" />
                                      </StyledAddRemoveButton>
                                      <StyledTextInput 
                                          id="filled-basic" 
                                          // variant="style={{}}" 
                                          disabled
                                          color={"white"}
                                          value={row.quantityAdded}
                                          
                                      />
                                      <StyledAddRemoveButton
                                          style={{padding:"0", outline:"none",  minWidth:"10px"}}
                                          variant="contained"
                                          color="primary"
                                          onClick={() =>props.quantityAdded(row)}
                                      >
                                          <i className="now-ui-icons ui-1_simple-add" />
                                      </StyledAddRemoveButton>
                                  </div>
                                    
                                </td>
                                <td align="right">{Number(row.quantityAdded)*Number(row.price)}</td>
                                <td align="right">{row.discount}</td>
                                <td align="right">{Number(row.after_discount)*Number(row.quantityAdded)}</td>
                                <td align="right">{Number(row.after_discount)*Number(row.quantityAdded)}</td>
                                <td align="right">{row.bv}</td>
                                {props.showDiscount && <td align="right">{row.vdba + row.vdbd}</td>}
                                <td align="right">{row.retail_profit}</td>
                                <td align="right">
                                    <StyledButton size="small" fullWidth
                                            variant="contained"
                                            color="red"
                                            onClick={() => props.deleteItem(row)}>Delete</StyledButton>
                                </td>
                            </tr>
                        ))}
                             
                    </tbody>
            </Table>
    );
}

export default cart;
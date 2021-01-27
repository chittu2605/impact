import React from "react";
import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, Icon} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import styled  from "styled-components"


const style = {
    button: {
        background: "red !important",
        color: "white !important"
    }
}


const StyledButton = styled(Button)(style.button)

const cart = (props) => {
    return(
        <TableContainer style={{maxHeight:"500px"}}>
            <Table stickyHeader >
                
                    <TableHead>
                       <TableRow hover >
                            <TableCell style={{fontWeight:"900"}}>Product Name</TableCell>
                            <TableCell align="right" style={{fontWeight:"900"}}>Price</TableCell>
                            <TableCell align="center" style={{fontWeight:"900"}}>Quantity</TableCell>
                            <TableCell align="right" style={{fontWeight:"900"}}>Total Price</TableCell>
                            <TableCell align="right" style={{fontWeight:"900"}}>Discount</TableCell>
                            <TableCell align="right" style={{fontWeight:"900"}}>After Discount</TableCell>
                            <TableCell align="right" style={{fontWeight:"900"}}>Net Price</TableCell>
                            <TableCell align="right" style={{fontWeight:"900"}}>BV</TableCell>
                            <TableCell align="right" style={{fontWeight:"900"}}>Retail Profit</TableCell>
                            <TableCell align="right" style={{fontWeight:"900"}}>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    {props.cartItem.map((row) => (
                            <TableRow key={row.product}>
                                <TableCell component="th" scope="row">
                                    {row.product}
                                </TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right" style={{display:"flex", alignItems: "baseline"}}> 
                                    <StyledButton 
                                        style={{padding:"0", outline:"none", minWidth:"10px" }}
                                        variant="contained"
                                        color="primary"
                                        onClick={() => props.quantityReduced(row)}
                                    >
                                        <RemoveIcon fontSize="small"  />
                                    </StyledButton>
                                    <TextField 
                                        id="filled-basic" 
                                        // variant="style={{}}" 
                                        color={"white"}
                                        value={row.quantityAdded}
                                        inputProps={{style: {width:"40px", marginLeft:"10px", marginRight:"10px", background: "white", textAlign: "center"}} }
                                    />
                                    <StyledButton
                                        style={{padding:"0", outline:"none",  minWidth:"10px"}}
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>props.quantityAdded(row)}
                                    >
                                        <AddIcon fontSize="small"  />
                                    </StyledButton>
                                </TableCell>
                                <TableCell align="right">{Number(row.quantityAdded)*Number(row.price)}</TableCell>
                                <TableCell align="right">{row.discount}</TableCell>
                                <TableCell align="right">{Number(row.after_discount)*Number(row.quantityAdded)}</TableCell>
                                <TableCell align="right">{Number(row.after_discount)*Number(row.quantityAdded)}</TableCell>
                                <TableCell align="right">{row.bv}</TableCell>
                                <TableCell align="right">{row.retail_profit}</TableCell>
                                <TableCell align="right">
                                    <StyledButton size="small" fullWidth
                                            variant="contained"
                                            color="red"
                                            onClick={() => props.deleteItem(row)}>Delete</StyledButton>
                                </TableCell>
                            </TableRow>
                        ))}
                             
                    </TableBody>
            </Table>
        </TableContainer>
    );
}

export default cart;
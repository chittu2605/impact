import React from 'react';
import { Button,  TextField, TableRow, TableCell,Input } from "@material-ui/core";
import styled from "styled-components";
import Search from '@material-ui/icons/Search';
const TableList2 = (props) => {

    const [disbleField, seteditField] = React.useState(true);

    const editField = () => {
        seteditField(false);
    };

    // const styledInput = styled(Input)`
    //     &::before {
    //         padding:0px;

    //     }
    // `
    

    return (
        <TableRow >
            <TableCell component="th" scope="row">
                {props.adpId}
            </TableCell>
            
            <TableCell align="left" >
            {(disbleField) ? props.name : 
                <Input
                id="AdpName"
                defaultValue={props.name}
                disabled={false}
                //disableUnderline
               // onChange={(value) => props.handleChange("AdpName",value)}
                style={{width:"50%", outline:"none "}}
                >
                </Input> }
            </TableCell>
            <TableCell align="left" >
                {(disbleField) ? props.mobile : 
                    <Input
                    id="mobile"
                    defaultValue={props.mobile}
                    disabled={false}
                    //disableUnderline
                // onChange={(value) => props.handleChange("AdpName",value)}
                    style={{width:"50%", outline:"none "}}
                        />}
            </TableCell>
            <TableCell align="left">
                {(disbleField) ? props.email : 
                        <Input
                        id="email"
                        defaultValue={props.email}
                        disabled={false}
                        //disableUnderline
                    // onChange={(value) => props.handleChange("AdpName",value)}
                        style={{width:"50%", outline:"none "}}
                            />}
            </TableCell>
            <TableCell align="left">
                {(disbleField) ? props.password : 
                        <Input
                        id="password"
                        defaultValue={props.password}
                        disabled={false}
                        //disableUnderline
                    // onChange={(value) => props.handleChange("AdpName",value)}
                        style={{width:"50%", outline:"none "}}
                            />}
            </TableCell>
            <TableCell align="left" style={{width:"180px"}} >
                <Button 
                    style={{padding:"3px", outline:"none", display:"block", marginBottom:"3px", width:"100%",marginRight:"0px", boxSizing:"border-box" }}
                    variant="contained"
                    color="primary"
                    size="small"   
                    onClick={editField}
                >
                Edit </Button>
                <Button 
                    style={{padding:"3px", outline:"none",display:"block",marginBottom:"3px", width:"100%"   }}
                    variant="contained"
                    color="primary"
                    size="small" 
                    onClick={() => props.quantityReduced}
                >
                Deactive </Button>
                <Button 
                    style={{padding:"3px", outline:"none", display:"block", marginBottom:"3px", width:"100%"   }}
                    variant="contained"
                    color="primary"
                    size="small" 
                    onClick={() => props.quantityReduced}
                >
                ADP Dashboard</Button>
                <Button 
                    style={{padding:"3px", outline:"none", display:"block", width:"100%"  }}
                    variant="contained"
                    color="primary"
                    size="small" 
                    onClick={() => props.quantityReduced}
                >
                View Tree</Button>
            </TableCell>
        </TableRow>
    )
}

export default TableList2;
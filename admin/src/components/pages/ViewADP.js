import React ,{ Component } from  "react";
import ADPTable from "../molecules/ADPTable";
import { Grid, Paper, Card, CardContent, Typography, CardActions, Button, Divider, InputLabel, Input } from "@material-ui/core";
import { apiHandler } from "../../utils/apiConfig";


class ViewADP extends Component {

    state = {
        adpList :[
        {
            adpId :"XXXXXX",
            firstname:"XXXXXX",
            mobile: "XXXXXXXXXX",
            email:"XXXX@XXXX.XXX",
            password:"XXXXXXXX",
            active:1,
            actionDisableButton:false
            
        }
    ],
        tempRow: {},
        beforeHandleChange : true,
        count: 0,
        currentPage: 1,
        
    }
    // debugger
    // validationValue = (arr) => {
    //    const validation =  arr.reduce( (prev, current) => {
    //             return prev && current;
    //     })
    //     console.log(validation);
    // }

    saveTempRow = (tableRow) => {
        
        if(this.state.beforeHandleChange) {
            let tempObject = {
                ...tableRow
            }
            this.setState({tempRow:tempObject, beforeHandleChange : false});
        }
       
    }

    

    rowActionDisable = (tableRow) => {
        
        const localDashboard = [
            ...this.state.adpList
        ];
        
        for(let i=0; i<localDashboard.length; i++) {
            if(localDashboard[i].adp_id !== tableRow.adp_id) {
                localDashboard[i].actionDisableButton=true;
            } else {
                localDashboard[i].actionDisableButton=false;
                
            }
        }
        this.setState({adpList: localDashboard});
    }

    cancelChanges = (id) => {
        let localDashboard = [
            ...this.state.adpList
        ]
        let temObject= {
            ...this.state.tempRow
        }
        let localnewDashboard = [];
        localDashboard.forEach((elm, i) => {
            //console.log('i', i);
            if (elm.adp_id === this.state.tempRow.adp_id) {
                Object.assign(elm, temObject);
            }
            localnewDashboard.push(elm);
        })
        
        this.setState({adpList:localnewDashboard, tempRow:{}});
    }

    updateDashboard = () => {
        this.setState({beforeHandleChange: true});
        

    }
    

    handleChange = (id,type,value) => {
       //alert("handleChange");
       
        let localDashboard = [
            ...this.state.adpList
        ]
        localDashboard.forEach((elm, i) => {
            if (elm.adp_id === id) elm[type] = value
        })
        this.setState({adpList:localDashboard});
        //console.log(this.state.tempRow);
    }

    rowActionEnable = () => {
        let localDashboard = [
            ...this.state.adpList
        ]
        localDashboard.forEach((elm, i) => {
            elm.actionDisableButton= false;
        })

        this.setState({adpList:localDashboard});
    }


    componentDidMount = () => {
        this.getAdpList()
    }

    getAdpList = (pageNumber) => {
        listAdp(pageNumber).then((response) => {
            let adpList = [];
            let count = response.data.results[0].count;
            response.data && response.data.results.forEach((elm) => {
                let obj = elm;

                obj.actionDisableButton = false;
                adpList.push(obj)
            })
            
            this.setState({
                adpList,
                count,
                currentPage: pageNumber ? pageNumber : 1,

            })
            
        })
    }

    handlePagination = (pageNumber) => {
        this.getAdpList(pageNumber);
        
    }

    render() {
        return (
            <Grid container spacing={2} style={{marginTop:"40px", textAlign:"center", padding: "1rem", margin:"auto", width:"90%"}} >
                 <Grid item xs={12}>
                    <Paper style={{textAlign:"center", padding: "1rem"}} elevation={3}>
                        <ADPTable 
                            adpItem ={this.state.adpList}
                            handleChange={this.handleChange}
                            rowActionDisable={this.rowActionDisable}
                            saveTempRow={this.saveTempRow}
                            cancelChanges={this.cancelChanges}
                            rowActionEnable={this.rowActionEnable}
                            updateDashboard={this.updateDashboard}
                            count={this.state.count}
                            handlePagination={this.handlePagination}
                            currentPage={this.state.currentPage}
                           // validationValue={this.validationValue}
                             />
                    </Paper>
                 </Grid>            
            </Grid>
  
        );
    }
}

export default ViewADP;


function listAdp (pageNumber) {
    return apiHandler.get("/get-adp-list", {
        params: {
            pageNumber: pageNumber ? pageNumber : 1
        }
    })
}



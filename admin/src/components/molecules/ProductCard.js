import React from "react";
import {Card, CardContent, Typography, CardActions, Button, Divider, InputLabel, Input, Grid } from "@material-ui/core";
import Select from "react-select";
import styled  from "styled-components"


const style = {
    button: {
        background: "red !important",
        color: "white !important",
        "&.disabled": {
          background: "grey !important",
        }
    },
    label: {
        marginTop: "15px",
    },

    buttonContainer: {
        position: "absolute",
        left: "0",
        right: "0",
        bottom: "0px",
    },
    select: {
        clear: "both",
        width: "93%",
        margin: "auto",
    },
}


const StyledButton = styled(Button)(style.button)
const StyledLabel = styled(InputLabel)(style.label)
const StyledButtonContainer = styled(CardActions)(style.buttonContainer)
const StyledSelect = styled(Select)(style.select);

class ProductCard extends React.Component {
    state = {
        quantity: 1,
        productOptions: [],
        selectedProductOption: {},
    }

    handleQuantityChange = (value) => {
        this.setState({
            quantity: value
        })
    }

    componentDidMount = () => {
        debugger
        let productOptionsDetails = this.props.product.details;
        let productOptions = [];
        let selectedProductOption = [];
        productOptionsDetails && productOptionsDetails.forEach((elm, i) => {
            elm.label = `${elm.unit_quantity} ${elm.unit}`;
            elm.value = elm.id;
            productOptions.push(elm);
        })
        if (productOptions && productOptions.length > 0) {
            selectedProductOption = productOptions[0]
        }
        this.setState({
            productOptions ,
            selectedProductOption
        })
    }

    handleChange = (selectedOption) => {
        this.setState({
            selectedProductOption: selectedOption,
        })
    }

    render () {
        let props = this.props;
        let { selectedProductOption, productOptions } = this.state;
        
        return(
            <Card variant="outlined" style={{height:"240px", position: "relative"}}>   
            <CardContent>
                <Typography variant="h6" component="h2">
                    {props.product.product}
                </Typography>
                <Typography variant="body2" component="p">
                    Price : {selectedProductOption.price}
                    <br></br>
                    Discount : {selectedProductOption.discount}
                    <br />
                    Rs.{selectedProductOption.actual_price}
                    <br></br>
                    BV : {selectedProductOption.bv}
                    <br></br>
                </Typography>
            </CardContent>
            <StyledSelect 
                        options={productOptions}
                        value={selectedProductOption}
                        onChange={this.handleChange}
                    />
            <StyledButtonContainer>
                <Grid container spacing={3}>
                    <Grid item xs={2} >
                        <StyledLabel shrink>Qty:</StyledLabel>
                    </Grid>
                    <Grid item xs={2} >
                        <Input 
                            id="quantity" 
                            value={this.state.quantity} 
                            onChange={(e) => { this.handleQuantityChange(e.target.value) }} 
                            inputProps={{style: {textAlign: "center"}} }
                        />
                    </Grid>
                    
                    <Grid item xs={8} >
                        <StyledButton size="small" fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                let newProduct = {
                                    ...props.product,
                                    ...selectedProductOption,
                                    quantityAdded: this.state.quantity
                                };
                                props.cartAdded(newProduct)
                            }}>Add to Cart</StyledButton>
                    </Grid>
                </Grid>
                
                
                
            </StyledButtonContainer>
        </Card>
        )
    }
}

// const ProductCard = (props) => {

//     const [name, setName] = React.useState('1');


//     const handleChange = (value) => {
//         setName(value);
//     };

//     return(
//         <Card variant="outlined" style={{height:"240px", position: "relative"}}>   
//             <CardContent>
//                 <Typography variant="h6" component="h2">
//                     {props.product.product}
//                 </Typography>
//                 <Typography variant="body2" component="p">
//                     Discount : {props.product.discount}
//                     <br />
//                     Rs.{props.product.price}
//                 </Typography>
//             </CardContent>
//             <StyledButtonContainer>
//                 <Grid container spacing={3}>
//                     <Grid item xs={2} >
//                         <StyledLabel shrink>Qty:</StyledLabel>
//                     </Grid>
//                     <Grid item xs={2} >
//                         <Input 
//                             id="quantity" 
//                             value={name} onChange={(e) => { handleChange(e.target.value) }} 
//                             inputProps={{style: {textAlign: "center"}} }
//                         />
//                     </Grid>
//                     <Grid item xs={8} >
//                         <StyledButton size="small" fullWidth
//                             variant="contained"
//                             color="primary"
//                             onClick={() => {
//                                 let newProduct = {
//                                     ...props.product,
//                                     quantityAdded: name
//                                 };
//                                 props.cartAdded(newProduct)
//                             }}>Add to Cart</StyledButton>
//                     </Grid>
//                 </Grid>
                
                
                
//             </StyledButtonContainer>
//         </Card>
//     );
// }

export default ProductCard;
import React, { useState, forwardRef } from "react";
import styled from "styled-components";
import NotAvailable from "../../assets/images/image-not-available.jpg";
import Select from "react-select";
import { device } from "../../constants/mediaQueries/device";
const styles = {
    card: {
        width: "95%",
        display: "inline-block",
        margin: "0.5rem",
        backgroundSize: "cover",
        transition: "0.2s",
        boxShadow: "1px 1px 7px 0px rgba(0, 0, 0, 0.21)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        
        "&:hover": {
            transform: "scale(1.05)",
            zIndex:"500"
        },
        [device.tablet]: {
            width: "200px",
        }
    },
    cardImage: {
        // width: "100%",
        backgroundSize: "cover",
        height: "190px",
        margin: "0.2rem",
        backgroundPosition: "center",
        display: "inline-block",
        float: "left",
        width: "45%",
        [device.tablet]: {
            width: "100%",
            display: "block",
            float: "none",
            height: "200px",

        }
    },
    cardBody: {
        padding: "0.25rem",
        display: "inline-block",
        width: "50%",
        float: "right",
        position: "relative",
        [device.tablet]: {
            width: "100%",
            display: "block",
            float: "none",
        }
    },
    cardTitle: {
        textAlign: "center",
        fontSize: "1rem",
        marginBottom: "1rem",

        color: "red",
        fontWeight: 500,
        display: "-webkit-box",
        "-webkit-line-clamp": "2",
        "-webkit-box-orient": "vertical",
        maxHeight: "48px",
        overflow: "hidden",
        height: "38px",

    },
    cardUnit: {
        fontSize: "12px",
        margin: 0,
        float: "right"
        
    },
    mrp: {
        color: "red",
        textDecoration: "line-through",
        fontSize: "14px",
        // marginRight: "1.5rem",
        display: "inline-block",
        // width: "60px",
        float: "left",
        textAlign: "left",
        clear: "both",
        marginLeft: "10px",
        [device.tablet]: {
            fontSize: "18px",
        }

    },
    price: {
        color: "green",
        float: "right",
        marginRight: "10px",
        fontSize: "14px",
        [device.tablet]: {
            fontSize: "18px",
        }

    },
    
    savedText: {
        fontSize: "12px",
        color: "#0e5d1f",
        margin: 0,
        textAlign: "center",
        clear: "both"
    },
    vdb: {
        textAlign: "center",
        color: "#e88657",
        fontSize: "14px",
        // margin: "1rem",
        [device.tablet]: {
            marginBottom: "1rem",
        }
        
        
    },
    vcb: {
        color: "#e88657",
        paddingBottom: "0.3rem"
    },
    mp:{
        fontSize: "12px",
        margin: 0,
        // float: "left"
        textAlign: "center",
        position: "absolute",
        bottom: "38px",
        left: "50%",

        
        transform: "translate(-50%, 0)",

        [device.tablet]: {
            bottom: "42px",
        }

        
    },
    discountStamp: {
        position: "absolute",
        top: "4px",
        left: 0,
        zIndex: "0",
        color: "white",
        width: "35px",
        fontSize: "10px",
        "&::before": {
            content: "''",
            width: "85px",
            height: "100px",
            background: "red",
            position: "absolute",
            borderRadius: "50%",
            zIndex: "-1",
            top: '-14px',
            left: "-80px",
            transform: "translate(38px, -45px)",
        },

        [device.tablet]: {
            right: "0px",
            left: "initial",
            "&::before": {
                content: "''",
                width: "100px",
                height: "100px",
                background: "red",
                position: "absolute",
                borderRadius: "50%",
                zIndex: "-1",
                top: "0%",
                right: "0%",
                left: "initial",
                transform: "translate(38px, -45px)",
            },
        }
    },
    link : {
        textAlign: "center",
        color:"blue",
        fontSize: "10px",
        "&:hover": {
            textDecoration:"underline"
        },

        [device.tablet]: {
            fontSize: "12px",
        }
    },

    onlyPrice: {
        clear: "both",
        display: "inline-block",
        fontSize: "10px", 
        verticalAlign: "middle",  
        [device.tablet]: {
            fontSize: "16px",
        }
    },
    bestPrice: {
        display: "inline-block",
        marginRight: "5px",
        textTransform: "uppercase",
        fontSize: '10px',
        verticalAlign: "middle",
        [device.tablet]: {
            fontSize: '13px',
        }
    },
    bestPriceWrapper: {
        paddingBottom: "0",
        [device.tablet]: {
            paddingBottom: "21px",
        }
        
    },
    select: {
        clear: "both",
        marginBottom: "0.5rem",
    }
    
}

const Card = styled("div")(styles.card);
const CardImage = styled("div")(styles.cardImage);
const CardBody = styled("div")(styles.cardBody);
const CardTitle = styled("h5")(styles.cardTitle);
const CardUnit = styled("span")(styles.cardUnit);
const CardMRP = styled("span")(styles.mrp);
const CardPrice = styled("span")(styles.price);
const CardSavedAmount = styled("p")(styles.savedText);
const CardVDB = styled("p")(styles.vdb);
const CardVCB = styled(CardVDB)(styles.vcb);
const CardMP = styled("span")(styles.mp);
const CardOnlyPrice = styled("span")(styles.onlyPrice);
const CardDiscountStamp = styled("span")(styles.discountStamp);
const Link = styled("p")(styles.link);
const CardBestPrice = styled(CardSavedAmount)(styles.bestPrice);
const CardBestPriceWrapper = styled(CardSavedAmount)(styles.bestPriceWrapper);
const StyledSelect = styled(Select)(styles.select);

class ProductCard extends React.Component {
    state = {
        productOptions: [],
        selectedProductOption: {},
    }

    componentDidMount = () => {
        let productOptionsDetails = this.props.details;
        let productOptions = [];
        let selectedProductOption = [];
        productOptionsDetails && productOptionsDetails.forEach((elm, i) => {
            elm.label = `${elm.unit_quantity} ${elm.unit}`;
            elm.value = elm.id;
            productOptions.push(elm);
        })
        if (productOptionsDetails && productOptionsDetails.length > 0) {
            selectedProductOption = productOptionsDetails[0]
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

        const saving = selectedProductOption.discount ;
        const noDiscount = selectedProductOption.price === selectedProductOption.after_discount;
        const discountPercent = !noDiscount ? `${Math.round((saving/selectedProductOption.price)*100)}% OFF` : 0;
    
       
        const {forwardRef} = props;
        return (
            <Card className="card" data-toggle="tooltip" data-placement="top" title={props.product} ref={forwardRef}>
                {!noDiscount && discountPercent != "0% OFF" && <CardDiscountStamp>{discountPercent}</CardDiscountStamp> }
                <CardImage style={{backgroundImage: "url(./" + (props.imageUrl != null ? `${props.imageUrl}` : NotAvailable) + ")"}}/>
                {/* <img src={props.imageUrl}/> */}
                <CardBody className="card-body">
                    <CardTitle className="card-title" dataToggle="tooltip" dataPlacement="bottom" title={props.product}>{props.product}</CardTitle>
                    <StyledSelect 
                        options={productOptions}
                        value={selectedProductOption}
                        onChange={this.handleChange}
                    />
                    {/* <CardUnit className="card-text">Units: {props.quantity} {props.unit}</CardUnit> */}
                    {
                        noDiscount ? (
                            <CardBestPriceWrapper>
                            <CardBestPrice>{noDiscount && "Best Price"}</CardBestPrice>
    
                            <CardOnlyPrice>{`${selectedProductOption.currency} ${selectedProductOption.price}`}</CardOnlyPrice>
    
                            </CardBestPriceWrapper>
                        ) : (
                            <> 
                                <CardMRP>{`${selectedProductOption.currency} ${selectedProductOption.price}`}</CardMRP>
                                <CardPrice>{`${selectedProductOption.currency} ${selectedProductOption.after_discount}`}</CardPrice>
                            </>
                        )
                    }

            
                    <CardSavedAmount>{!noDiscount && `YOU SAVE ${saving} ${selectedProductOption.currency}`}</CardSavedAmount>
                    {
                        (selectedProductOption.vdbd || selectedProductOption.vdba) && (selectedProductOption.vdbd + selectedProductOption.vdba) != "0" ? (
                            <CardVDB style={{visibility: (selectedProductOption.vdbd || 0) + (selectedProductOption.vdba || 0) != 0 ? "visible": "hidden"}} dataToggle="tooltip" dataPlacement="bottom" title="Smart Mart Discount Debit">{`SMDD: ${selectedProductOption.currency} ${selectedProductOption.vdbd + selectedProductOption.vdba}`}</CardVDB>
                        ) : (
                            <CardVCB style={{visibility: selectedProductOption.vdbc != 0 ? "visible": "hidden"}} dataToggle="tooltip" dataPlacement="bottom" title="Smart Mart Discount Credit">{`SMDC: ${selectedProductOption.currency} ${selectedProductOption.vdbc}`}</CardVCB>
                        )
                    }
                    {
                        selectedProductOption.bv != 0 ? (
                            <CardMP dataToggle="tooltip" dataPlacement="bottom" title="Business Volume">{`BV: ${selectedProductOption.bv}`}</CardMP>
                        ) : (
                            selectedProductOption.max_purchase != null && selectedProductOption.max_purchase != 0 &&  <CardMP dataToggle="tooltip" dataPlacement="bottom" title="Maximum quantity you can purchase">{`MP: ${selectedProductOption.max_purchase}`}</CardMP>
                        )
                    }
                    {selectedProductOption.max_purchase != null && selectedProductOption.max_purchase != 0 &&  <CardMP dataToggle="tooltip" dataPlacement="bottom" title="Maximum quantity you can purchase">{`MP: ${selectedProductOption.max_purchase}`}</CardMP>}
    
                    
                    
                    <Link onClick={() => {props.handleReadMoreclicked(props.productData)}}>Read more</Link>
                    
                    
                    
                </CardBody>
            </Card>
        )
    }
}



export default forwardRef((props, innerRef) => (
    <ProductCard forwardRef={innerRef} {...props} />
  ));
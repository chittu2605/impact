import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Divider,
  InputLabel,
  Grid,
} from "@material-ui/core";
import Select from "react-select";
import styled from "styled-components";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";

const style = {
  card: {
    width: "225px",
    height: "260px",
    display: "inline-block",
    margin: "5px 8px 0 0",
    boxShadow: "0 0 0px #b6b6b6",
    transition: "0.2s",
    transform: "scale(1)",
    border: "1px solid #f2f2f2",
    overflow: "visible !important",
    "&:hover": {
      boxShadow: "0 0 4px #b6b6b6",
      transform: "scale(1.05)",
      transition: "0.2s",
    },
  },
  button: {
    background: "red !important",
    color: "white !important",
    "&.disabled": {
      background: "grey !important",
    },
  },
  label: {
    marginTop: "15px",
  },

  buttonContainer: {
    // position: "absolute",
    left: "0",
    right: "0",
    bottom: "20px",
  },
  inputGroup: {
    position: "relative",
    display: "table",
    borderCollapse: "separate",
    // width: "90px",
    ".input-group-addon": {
      borderRight: 0,
      padding: "0 0px",
      height: "auto",
      fontSize: "12px",
      color: "#999",
      font: "12px/16px ProximaNovaA-Regular",
      width: "50%",
      borderColor: " #e0e0e0",
      display: "inline-block",
      ".input-group-text": {
        padding: "0 10px",
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
      },
    },
    ".form-control": {
      width: "50%",
      display: "inline-block",
      padding: "5px 0",
      textAlign: "center",
      borderRadius: "0.25rem",
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
    },
  },

  addCartButton: {
    height: "25px",
  },

  cardContent: {
    height: "180px",
    textAlign: "center",
    padding: "10px",
  },
  select: {
    clear: "both",
    width: "93%",
    margin: "auto",
  },
  productName: {
    color: "red",
    fontWeight: "700",
    marginBottom: "1rem",
    fontSize: "1rem",
    display: "-webkit-box",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical",
    maxHeight: "48px",
    overflow: "hidden",
  },
};

const StyledCard = styled(Card)(style.card);
const StyledButton = styled(Button)(style.button);
const StyledLabel = styled(InputLabel)(style.label);
const StyledButtonContainer = styled(CardActions)(style.buttonContainer);
const StyledInputGroup = styled(InputGroup)(style.inputGroup);
const StyledAddCartButton = styled(StyledButton)(style.addCartButton);
const StyledCardContent = styled(CardContent)(style.cardContent);
const StyledSelect = styled(Select)(style.select);
const StyledProductName = styled("div")(style.productName);
class ProductCard extends React.Component {
  state = {
    quantity: 1,
    productOptions: [],
    selectedProductOption: {},
  };

  handleQuantityChange = (value) => {
    this.setState({
      quantity: value,
    });
  };

  componentDidMount = () => {
    let productOptionsDetails = this.props.product.details;
    let productOptions = [];
    let selectedProductOption = [];
    productOptionsDetails &&
      productOptionsDetails.forEach((elm, i) => {
        elm.label = `${elm.unit_quantity} ${elm.unit}`;
        elm.value = elm.id;
        productOptions.push(elm);
      });
    if (productOptions && productOptions.length > 0) {
      selectedProductOption = productOptions[0];
    }
    this.setState({
      productOptions,
      selectedProductOption,
    });
  };

  handleChange = (selectedOption) => {
    this.setState({
      selectedProductOption: selectedOption,
    });
  };

  render() {
    let props = this.props;
    let { selectedProductOption, productOptions } = this.state;

    return (
      <StyledCard variant="outlined">
        <StyledCardContent>
          <StyledProductName
            dataToggle="tooltip"
            dataPlacement="bottom"
            title={props.product.product}
          >
            {props.product.product}
          </StyledProductName>
          <Typography variant="body2" component="p">
            Actual Price : RS.{selectedProductOption.price}
            <br></br>
            DISCOUNT : {selectedProductOption.discount}
            <br />
            You Pay : RS.{selectedProductOption.actual_price}
            <br></br>
            BV : {selectedProductOption.bv}
            <br></br>
            {(selectedProductOption.vdbd || selectedProductOption.vdba) &&
            selectedProductOption.vdbd + selectedProductOption.vdba != "0" ? (
              <span
                dataToggle="tooltip"
                dataPlacement="bottom"
                title="Smart Mart Discount Debit"
              >{`SMDD: ${selectedProductOption.currency} ${
                selectedProductOption.vdbd + selectedProductOption.vdba
              }`}</span>
            ) : (
              <span
                dataToggle="tooltip"
                dataPlacement="bottom"
                title="Smart Mart Discount Credit"
              >{`SMDC: ${selectedProductOption.currency} ${selectedProductOption.vdbc}`}</span>
            )}
          </Typography>
        </StyledCardContent>
        <StyledSelect
          options={productOptions}
          value={selectedProductOption}
          onChange={this.handleChange}
        />
        <StyledButtonContainer>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <StyledInputGroup>
                <InputGroupAddon addonType="addon">
                  {/* <InputGroupText>Qty</InputGroupText> */}
                  Qty
                </InputGroupAddon>
                <Input
                  id="quantity"
                  value={this.state.quantity}
                  onChange={(e) => {
                    this.handleQuantityChange(e.target.value);
                  }}
                  inputProps={{ style: { textAlign: "center" } }}
                />
              </StyledInputGroup>
            </Grid>

            {/* <Grid item xs={1} ></Grid> */}
            <Grid item xs={6}>
              <StyledAddCartButton
                size="small"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  let newProduct = {
                    ...props.product,
                    ...selectedProductOption,
                    quantityAdded: this.state.quantity,
                  };
                  props.cartAdded(newProduct);
                }}
              >
                Add
              </StyledAddCartButton>
            </Grid>
          </Grid>
        </StyledButtonContainer>
      </StyledCard>
    );
  }
}

export default ProductCard;

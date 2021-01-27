import React from "react";
import { Grid, Paper, Card, CardContent, Typography, CardActions, Button, Divider, InputLabel, Input } from "@material-ui/core";
import Select from "react-select";
import ProductCard from "../molecules/ProductCard";


const BuyProductList = (props) => {

    return (
        <div>
            <Grid container spacing={2} style={{ marginTop: "10px", marginBottom: "10px" }}>
                <Grid item xs={12} sm={3}>
                    <Select
                        placeholder="Product Type"
                        options={props.productTypeOptions}
                        value={props.selectedProductType}
                        onChange={(value) => {
                            props.handleChange("selectedProductType", value);
                        }}
                    />
                </Grid>
                
                <Grid item xs={12} sm={3}>
                    <Select
                        placeholder="City"
                        options={props.cityOptions}
                        value={props.selectedCity}
                        onChange={(value) => {
                            props.handleChange("selectedCity", value);
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Select
                        placeholder="Franchise"
                        options={props.franchiseOptions}
                        value={props.selectedFranchise}
                        onChange={(value) => {
                            props.handleChange("selectedFranchise", value);
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Select
                        placeholder="Category"
                        options={props.categoryOptions}
                        value={props.selectedCategory}
                        isDisabled={props.selectedCity.label === undefined ? true : false}
                        onChange={(value) => {
                            props.handleChange("selectedCategory", value);
                        }}

                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Select
                        placeholder="Sub Category"
                        options={props.subCategoryOptions}
                        value={props.selectedSubCategory}
                        isDisabled={props.selectedCategory.label === undefined ? true : false}
                        onChange={(value) => {
                            props.handleChange("selectedSubCategory", value);
                        }}

                    />
                </Grid>
            </Grid>
            <Divider variant="middle" />
            <Grid container spacing={2} style={{ marginTop: "10px", overflow: "scrollX" }} >

                {props.productList.map(product => {
                    return <Grid item xs={12}  sm={3} >
                                <ProductCard product={product} cartAdded={props.cartAdded} />
                            </Grid>

                })}

            </Grid>
        </div>
    )
}

export default BuyProductList;
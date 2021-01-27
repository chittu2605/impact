import React from "react";
import Select from "react-select";
import ProductCard from "../Molecule/ProductCard";


const BuyProductList = (props) => {

    return (
        <div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-5">
                <div className="col">
                    <Select
                        placeholder="Product Type"
                        options={props.productTypeOptions}
                        value={props.selectedProductType}
                        onChange={(value) => {
                            props.handleChange("selectedProductType", value);
                        }}
                    />
                </div>
                <br></br>

                <div className="col">
                    <Select
                        placeholder="City"
                        options={props.cityOptions}
                        value={props.selectedCity}
                        onChange={(value) => {
                            props.handleChange("selectedCity", value);
                        }}
                    />
                </div>
                <br></br>
                <div className="col">
                    <Select
                        placeholder="Franchise"
                        options={props.franchiseOptions}
                        value={props.selectedFranchise}
                        onChange={(value) => {
                            props.handleChange("selectedFranchise", value);
                        }}
                    />
                </div>
                <br></br>
                <div className="col">
                    <Select
                        placeholder="Category"
                        options={props.categoryOptions}
                        value={props.selectedCategory}
                        isDisabled={props.selectedCity.label === undefined ? true : false}
                        onChange={(value) => {
                            props.handleChange("selectedCategory", value);
                        }}

                    />
                </div>
                <br></br>
                <div className="col">
                    <Select
                        placeholder="Sub Category"
                        options={props.subCategoryOptions}
                        value={props.selectedSubCategory}
                        isDisabled={props.selectedCategory.label === undefined ? true : false}
                        onChange={(value) => {
                            props.handleChange("selectedSubCategory", value);
                        }}

                    />
                </div>
                <br></br>
            </div>
            <br></br>
            <div className="text-center">

                {props.productList.map((product, i) => {
                    return (//<div class="col">
                                <ProductCard key={i + Math.random()} product={product} cartAdded={props.cartAdded} />
                            //</div>
                            )

                })}

            </div>
        </div>
    )
}

export default BuyProductList;
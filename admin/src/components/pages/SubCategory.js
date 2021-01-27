import React from "react";
import { rem } from "polished";
import { withStyles } from '@material-ui/core/styles';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Slate } from "../atoms/Slate"
import { Container } from "@material-ui/core";
import AddSubCategoryForm from "../atoms/AddSubCategoryForm";

import SubCategoryList from "../molecules/SubCategoryList";
import SelectCategory from "../atoms/SelectCategory";

const useStyles = makeStyles((theme) => ({
    

}));
              


class SubCategory extends React.Component {
    state = {};

    

    render () {
        return (
            <Slate> 
                <SelectCategory />
                <AddSubCategoryForm />
                <SubCategoryList />
            </Slate>
        )
    }
}


export default SubCategory;

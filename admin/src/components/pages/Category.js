import React from "react";
import { rem } from "polished";
import { withStyles } from '@material-ui/core/styles';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Slate } from "../atoms/Slate"
import { Container } from "@material-ui/core";
import AddCategoryForm from "../atoms/AddCategoryForm";

import CategoryList from "../molecules/CategoryList";

const useStyles = makeStyles((theme) => ({
    

}));
              


class Category extends React.Component {
    state = {};

    

    render () {
        return (
            <Slate> 
                <AddCategoryForm />
                <CategoryList />
            </Slate>
        )
    }
}


export default Category;

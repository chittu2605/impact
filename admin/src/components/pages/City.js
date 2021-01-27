import React from "react";
import { rem } from "polished";
import { withStyles } from '@material-ui/core/styles';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Slate } from "../atoms/Slate"
import { Container } from "@material-ui/core";
import AddCityForm from "../atoms/AddCityForm";

import CityList from "../molecules/CityList";

const useStyles = makeStyles((theme) => ({
    

}));
              


class City extends React.Component {
    state = {};

    

    render () {
        return (
            <Slate> 
                <AddCityForm />
                <CityList />
            </Slate>
        )
    }
}


export default City;

// *https://www.registers.service.gov.uk/registers/country/use-the-api*
// import fetch from 'cross-fetch';
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { device } from "../../utils/mediaQueries/device";
import { getSelectedAdpAction } from "../../redux/actions/adp";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const styles = {
  formInput: {
    width: "65%",
    [device.mobileL]: {
      width: "60%",
    },
  },
  FormInputBorderColor: {},
  FormInputBorderColor: {},
  button: {
    marginTop: "0.7rem",

    [device.mobileL]: {
      marginLeft: "1rem",
    },
  },

  paper: {
    padding: "1rem",
  },
  grid: {
    // margin: "auto"
  },
};

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function Asynchronous(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { classes, className } = props;

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  const handleChange = (event) => {
    // console.log(event.target.value)
    setLoading(true);
    axios
      .get(`${window.API_URL}list-adp`, {
        params: {
          adp_subset: event.target.value,
        },
      })
      .then((response) => {
        let results = response.data.results
        results.forEach((item) => {
          item.adp_id = item.adp_id.toString();
        })
        // console.log(results)

        setOptions(results);
        setLoading(false);
      })
      // .catch((error) => {
      //   console.log(error)
      //   debugger
      //   if (error.response.status === 403) { alert("Session timed out"); window.location.replace(window.location.origin)}
      //   throw error;
      // });
  };

  const handleSelectAdp = (value) => {
    let adp_id = value ? value.adp_id : "";
    props.getSelectedAdpAction(adp_id);
  };
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        className={clsx(classes.grid, className)}
      >
        <Autocomplete
          id="asynchronous-demo"
          style={{ width: 300 }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          //   getOptionSelected={(option, value) => option.name === value.name}
          onChange={(e, value) => handleSelectAdp(value)}
          getOptionLabel={(option) => option.adp_id}
          options={options}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search ADP"
              variant="outlined"
              onChange={handleChange}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    // status: state.updateLoginStatus.status,
    // password: state.updateLoginStatus.password,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSelectedAdpAction: bindActionCreators(getSelectedAdpAction, dispatch),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withStyles(styles)(connector(Asynchronous));

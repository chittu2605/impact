import React from "react";
import styled from "styled-components";
import TextInput from "components/Input/TextInput";
import axios from "axios";
import AsyncSelectInput from "components/Input/AsyncSelctInput";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateRepurchaseAdpDetails } from "../../redux/actions/rePurchase";

const styles = {
  wrapper: {
    padding: "1rem",
  },
  button: {
    background: "red !important",
    color: "white !important",
    marginRight: "1rem !important",
    "&.disabled": {
      background: "grey !important",
    },
    "&.grey": {
      background: "black !important",
    },
  },
};

const Wrapper = styled("div")(styles.wrapper);
class SelectAdpRepurchase extends React.Component {
  state = {
    adpOption: [],
  };

  // handleInputChange = (value) => {
  //   alert(value);
  // };

  handleChange = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
  };

  loadOptions = (inputValue, callback) => {
    if (inputValue.length > 3 && inputValue.length < 11) {
      getAdpByPhone(inputValue).then(({ data }) => {
        if (data.result && data.result.length > 0) {
          let adpOption = [];
          data.result.forEach((element) => {
            let obj = {
              value: element.adp_id,
              label: `${element.adp_id} - ${element.firstname} ${element.lastname}`,
              name: `${element.firstname} ${element.lastname}`,
              sponsorId: element.sponsor_id,
              sponsorName: element.sponsor_name,
              mobile: element.mobile,
              pan: element.pan,
            };
            adpOption.push(obj);
          });
          this.setState(
            {
              adpOption,
            },
            () => {
              callback(this.state.adpOption);
            }
          );
        }
      });
    }
  };

  componentDidMount = () => {
    this.setLoggedInAdpDetails();
  };

  setLoggedInAdpDetails = () => {
    let { currentAdp, name, updateRepurchaseAdpDetails } = this.props;
    let adpDetail = {
      adpId: currentAdp,
      adpName: name,
    };
    updateRepurchaseAdpDetails(adpDetail);
  };

  handleChangeSelect = (selectedOption) => {
    if (!selectedOption) return this.setLoggedInAdpDetails();
    let obj = {
      adpId: selectedOption.value,
      adpName: selectedOption.name,
      sponsorId: selectedOption.sponsorId,
      sponsorName: selectedOption.sponsorName,
      mobile: selectedOption.mobile,
      pan: selectedOption.pan,
    };
    this.props.updateRepurchaseAdpDetails(obj);
  };

  render() {
    let { adpOption } = this.state;
    let { adpName, adpId, sponsorId, sponsorName, mobile, pan } = this.props;
    return (
      <Wrapper className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-lg-4">
        <div className="col">
          <AsyncSelectInput
            label="Phone Number"
            isClearable
            // onInputChange={this.handleInputChange}
            isSearchable
            onChange={this.handleChangeSelect}
            loadOptions={this.loadOptions}
            showLabel
            placeholder="Search"
          />
        </div>
        <div className="col">
          <TextInput
            label="ADP ID"
            type="text"
            value={adpId}
            // onChange={handleChange}
            // onBlur={handleBlur}
            disabled
            showLabel
          />
        </div>
        <div className="col">
          <TextInput
            label="ADP Name"
            type="text"
            value={adpName}
            // onChange={handleChange}
            // onBlur={handleBlur}
            disabled
            showLabel
          />
        </div>

        <div className="col">
          <TextInput
            label="Sponsor ID"
            type="text"
            value={sponsorId}
            // onChange={handleChange}
            // onBlur={handleBlur}
            disabled
            showLabel
          />
        </div>

        <div className="col">
          <TextInput
            label="Sponsor Name"
            type="text"
            value={sponsorName}
            // onChange={handleChange}
            // onBlur={handleBlur}
            disabled
            showLabel
          />
        </div>

        <div className="col">
          <TextInput
            label="Mobile"
            type="text"
            value={mobile}
            // onChange={handleChange}
            // onBlur={handleBlur}
            disabled
            showLabel
          />
        </div>

        <div className="col">
          <TextInput
            label="PAN"
            type="text"
            value={pan}
            // onChange={handleChange}
            // onBlur={handleBlur}
            disabled
            showLabel
          />
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adpId: state.updateRepurchaseAdpDetails.adpId,
    adpName: state.updateRepurchaseAdpDetails.adpName,
    sponsorId: state.updateRepurchaseAdpDetails.sponsorId,
    sponsorName: state.updateRepurchaseAdpDetails.sponsorName,
    mobile: state.updateRepurchaseAdpDetails.mobile,
    pan: state.updateRepurchaseAdpDetails.pan,
    currentAdp: state.updateLoginStatus.adpId,
    name: state.updateLoginStatus.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateRepurchaseAdpDetails: bindActionCreators(
      updateRepurchaseAdpDetails,
      dispatch
    ),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SelectAdpRepurchase);

function getAdpByPhone(phoneNumber) {
  return axios.get(`/adp/get-adp-by-phone`, {
    params: {
      phone: phoneNumber,
    },
  });
}

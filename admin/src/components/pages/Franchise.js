import React from "react";
import { Slate } from "../atoms/Slate";
import SearchAutoComplete from "../atoms/SearchAutoComplete";
import AdpInfo from "../molecules/AdpInfo";
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import FranchiseDetailsForm from "../molecules/FranchiseDetailsForm";
import axios from "axios";
import { updateSelectedAdpSuccess } from "../../redux/actions/adp";
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import { apiHandler } from "../../utils/apiConfig";
class Franchise extends React.Component {
    state = {
        franchiseName: "",
        franchiseAddress: "",
        franchisePhone: "",
        // isFranchise: false,
        
    }

    handleFranchiseDetailsChange = (type, data) => {
        this.setState({
            [type]: data,
        })
    }

    createFranchise = (body) => {
        addFranchise(body).then((response) => {
            if (body.franchise_id && body.editFranchise) {
                toast("Sample Franchise Updated");
            } else if (body.franchise_id) {
                toast("Franchise Updated");
            } else {
                toast("Franchise Created");
            }
            
            this.props.history.push("/dashboard")
            this.props.updateSelectedAdpSuccess({})
        })
    }

    componentWillMount = () => {
        this.props.updateSelectedAdpSuccess({})
    }


    render () {
        return (
            <Slate>
                <SearchAutoComplete />
                <br></br>
                <AdpInfo />
                <br></br>
                {this.props.adp_id && <FranchiseDetailsForm 
                    handleFranchiseDetailsChange={this.handleFranchiseDetailsChange}
                    franchiseName={this.state.franchiseName}
                    franchiseAddress={this.state.franchiseAddress}
                    franchisePhone={this.state.franchisePhone}
                    createFranchise={this.createFranchise}
                    {...this.props}
                />}
                
            </Slate>
        )
    }
}




const mapStateToProps = state => {
	return {
		adp_id: state.updateAdpInfo.adp_id,
		firstname: state.updateAdpInfo.firstname,
		lastname: state.updateAdpInfo.lastname,
		user_type: state.updateAdpInfo.user_type,
		franchise_name: state.updateAdpInfo.franchise_name,
		franchise_address: state.updateAdpInfo.franchise_address,
		franchise_number: state.updateAdpInfo.franchise_number,
	};
  };
  
  const mapDispatchToProps = dispatch => {
	return {
		updateSelectedAdpSuccess: bindActionCreators(updateSelectedAdpSuccess, dispatch),
	};
  };
  
  const connector = connect(mapStateToProps, mapDispatchToProps);
  
  export default connector(withRouter(Franchise));

  function addFranchise (body) {
    return apiHandler.post(`/add-franchise`, body)
  }
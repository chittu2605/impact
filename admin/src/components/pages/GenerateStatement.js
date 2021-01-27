import React from "react";
import Layout from "../organisms/Layout";
import { Slate } from "../atoms/Slate"
import { apiHandler } from "../../utils/apiConfig";
// import ContentLoader from "../atoms/ContentLoader";


class GenerateStatement extends React.Component {
  state = {
    adpId: "",
    data: {},
  };

  handleClick = () => {
    let { adpId } = this.state;
    generateStatement(adpId).then((response) => {
      this.setState({
        data: response.data.result,
      })
    })
  }

  render () {
    let { adpId, data } = this.state;

    let allKeys = Object.keys(data);
      return (
          <Slate>
            <h1>Generate Statement</h1>

            <input 
              type="text"
              value={adpId}
              onChange={(e) => {this.setState({adpId: e.target.value})}}
            />

            <button 
              onClick={this.handleClick}
            >Generate</button>

            <div>
              {allKeys && allKeys.map((key) => {
                return <div>{`${key}: ${data[key]}`}</div>
              })}
            </div>
          </Slate>
          
      )
  }
}

export default GenerateStatement

function generateStatement(adpId) {
  return apiHandler.get(`/generate-statement`, {
    params: {
      adpId: adpId,
    }
  });
}

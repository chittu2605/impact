import React from "react";
import PanelHeader from "components/PanelHeader/PanelHeader";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import BuyProducts from "components/Forms/BuyProducts";
import SelectAdpRepurchase from "components/Molecule/SelectAdpRepurchase";

class RePurchase extends React.Component {
  state = {
  };

  toggleBuyProducts = () => {
    this.setState({
    })
  }

  render() {
    let { showBuyProducts } = this.state;
    return (
      <>
        <PanelHeader size="sm" />
				<div className="content">
					<Row>
						<Col md="12">
							<Card>
								<CardHeader>
                  <h5 className="title">Re Purchase</h5>
                </CardHeader>
                    <SelectAdpRepurchase />
                    <hr></hr>
                    <BuyProducts 
                      rePurchase
                    />
                    <hr></hr>
                    
								
                
							</Card>
						</Col>
					</Row>
				</div>
      </>
    );
  }
}

export default RePurchase;

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
import AddAdpForm from "components/Forms/AddAdpForm";
import BuyProducts from "components/Forms/BuyProducts";

class AddADP extends React.Component {
  state = {
    showBuyProducts: false,
  };

  toggleBuyProducts = () => {
    this.setState({
      showBuyProducts: !this.state.showBuyProducts,
    });
  };

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
                  <h5 className="title">
                    Add ADP {showBuyProducts && "/ Buy Products"}
                  </h5>
                </CardHeader>
                {showBuyProducts ? (
                  <BuyProducts
                    toggleBuyProducts={this.toggleBuyProducts}
                    addAdp
                  />
                ) : (
                  <AddAdpForm toggleBuyProducts={this.toggleBuyProducts} />
                )}
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default AddADP;

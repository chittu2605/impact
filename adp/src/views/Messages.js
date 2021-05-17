import React, { useState, useEffect } from "react";
import PanelHeader from "components/PanelHeader/PanelHeader";
import { apiHandler } from "config/apiConfig";
import {
  Button,
  CardHeader,
  Card,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Messages = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleClick = (type) => {
    fetchMessages(type);
  };

  const fetchMessages = async (type) => {
    try {
      const res = await apiHandler.get(`/get-messages/${type}`);
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row style={{ height: "80vh" }}>
          <Col md="12">
            <Card style={{ minHeight: "80%", overflow: "hidden" }}>
              <CardHeader>
                <h5 className="title">Messages</h5>
              </CardHeader>
              <hr />
              <div className="row">
                <div className="col ml-2">
                  <Dropdown isOpen={dropdownOpen} toggle={toggle} size="lg">
                    <DropdownToggle caret>Select Type</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => handleClick("Impact")}>
                        {"IMPACT"}
                      </DropdownItem>
                      <DropdownItem onClick={() => handleClick("Gaumata")}>
                        {"GAUMATA"}
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
              <Container>
                {messages.map((message, index) => (
                  <>
                    <Row>
                      <Col>
                        <br />
                        <pre>{message}</pre>
                        <Button
                          className="float-right"
                          onClick={() => copyToClipBoard(message)}
                        >
                          Copy
                        </Button>
                      </Col>
                    </Row>
                    <hr />
                  </>
                ))}
              </Container>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Messages;

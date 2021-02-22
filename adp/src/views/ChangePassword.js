import React, { useState, useEffect } from "react";

import PanelHeader from "components/PanelHeader/PanelHeader";
import { apiHandler } from "config/apiConfig";

import {
  CardHeader,
  Card,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import Container from "reactstrap/lib/Container";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const handleClick = () => {
    if (oldPassword === "" || newPassword1 === "" || newPassword2 === "") {
      alert("All fields are mandatory");
    } else if (newPassword1 === newPassword2) {
      changePassowrd(oldPassword, newPassword1);
    } else {
      resetAllFields();
      alert("Passwords did not match");
    }
  };

  const changePassowrd = async (oldPassword, newPassword) => {
    try {
      const res = await apiHandler.post(`/change-password`, {
        oldPassword,
        newPassword,
      });
      if (res.status === 200) {
        resetAllFields();
        alert("Password change Success");
      } else {
        resetAllFields();
        alert("Unable to change Password");
      }
    } catch (error) {
      resetAllFields();
      console.log(error);
      alert("Unable to change Password");
    }
  };

  const resetAllFields = () => {
    setOldPassword("");
    setNewPassword1("");
    setNewPassword2("");
  };
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row style={{ height: "80vh" }}>
          <Col md="12">
            <Card style={{ minHeight: "80%", overflow: "hidden" }}>
              <CardHeader>
                <h5 className="title">Change Password</h5>
              </CardHeader>
              <hr />
              <Container>
                <Row>
                  <Col lg="4">
                    <Form>
                      <FormGroup>
                        <Label for="oldPassword">Old Password:</Label>
                        <Input
                          type="password"
                          id="oldPassword"
                          value={oldPassword}
                          onChange={(e) => {
                            setOldPassword(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="newPassword1">Enter New Password:</Label>
                        <Input
                          type="password"
                          id="newPassword1"
                          value={newPassword1}
                          onChange={(e) => {
                            setNewPassword1(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="newPassword1">Reenter New Password:</Label>
                        <Input
                          type="password"
                          id="newPassword2"
                          value={newPassword2}
                          onChange={(e) => {
                            setNewPassword2(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <Button onClick={handleClick}>Submit</Button>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ChangePassword;

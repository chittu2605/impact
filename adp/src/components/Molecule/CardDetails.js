import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "reactstrap";
import { apiHandler } from "config/apiConfig";
const CardDetails = ({ card }) => {
  const [cycles, setCycles] = useState([]);
  useEffect(() => {
    fetchCycles();
  }, []);
  const fetchCycles = async () => {
    try {
      const res = await apiHandler.get(`/get-card-cycles/${card.id}`);
      setCycles(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const tableRows = cycles.map((cycle) => (
    <tr key={cycle.cycleId}>
      <td>{cycle.cycleId}</td>
      <td>{cycle.cardIncome}</td>
      <td>{new Date(cycle.date).toLocaleDateString()}</td>
    </tr>
  ));
  const expiryDate = card.expired_on
    ? new Date(card.expired_on).toLocaleDateString()
    : "NA";

  return (
    <Container>
      <Row>
        <Col>
          <Row xs="2" className="mb-2">
            <Col xs="6">
              <Row xs="2">
                <Col>Card Type</Col>
                <Col>: {card.card_type}</Col>
              </Row>
            </Col>
            <Col xs="6">
              <Row xs="2">
                <Col>Card ID</Col>
                <Col>: {card.id}</Col>
              </Row>
            </Col>
          </Row>
          <Row xs="2" className="mb-2">
            <Col xs="6">
              <Row xs="2">
                <Col>Quantity</Col>
                <Col>: {card.qty}</Col>
              </Row>
            </Col>
            <Col xs="6">
              <Row xs="2">
                <Col>Date of Expiry</Col>
                <Col>: {expiryDate}</Col>
              </Row>
            </Col>
          </Row>
          <Row xs="2">
            <Col xs="6">
              <Row xs="2">
                <Col>Date of Issue</Col>
                <Col>: {new Date(card.created_on).toLocaleDateString()}</Col>
              </Row>
            </Col>
            <Col xs="6"></Col>
          </Row>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          {" "}
          <Table>
            <thead>
              <tr>
                <th scope="col">Cycle ID</th>
                <th scope="col">Card Income</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default CardDetails;

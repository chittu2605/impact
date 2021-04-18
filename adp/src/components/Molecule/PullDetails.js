import { apiHandler } from "config/apiConfig";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "reactstrap";

const PullDetails = () => {
  const [pullData, setPullData] = useState([]);
  useEffect(() => {
    fetchTopPullQualifiers();
  }, []);

  const fetchTopPullQualifiers = async () => {
    try {
      const res = await apiHandler.get(`/get-pull-qualifiers`);
      setPullData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const tableRows = pullData.map((qualifier, index) => (
    <tr key={qualifier.adp_id}>
      <td>{index + 1}</td>
      <td>{qualifier.adp_id}</td>
      <td>{`${qualifier.firstname} ${qualifier.lastname}`}</td>
      <td>{qualifier.purchase_points}</td>
      <td>{qualifier.join_points}</td>
      <td>{qualifier.total_points}</td>
    </tr>
  ));

  return (
    <Container>
      {" "}
      <Row>
        <Col>
          {" "}
          <Table>
            <thead>
              <tr>
                <th scope="col">RANK</th>
                <th scope="col">ADP ID</th>
                <th scope="col">NAME</th>
                <th scope="col">PURCHASE POINTS</th>
                <th scope="col">JOINING POINTS</th>
                <th scope="col">TOTAL POINTS</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default PullDetails;

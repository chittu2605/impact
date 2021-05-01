import { apiHandler } from "config/apiConfig";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "reactstrap";

const PullDisbusrion = ({ cycleId }) => {
  const [pullData, setPullData] = useState([]);
  useEffect(() => {
    fetchCyclePullData();
  }, []);

  const fetchCyclePullData = async () => {
    try {
      const res = await apiHandler.get(`/cyle-pull-data/${cycleId}`);
      setPullData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const tableRows = pullData.map((data) => (
    <tr key={data.adp_id}>
      <td>{data.adpId}</td>
      <td>{data.name}</td>
      <td>{data.amount}</td>
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
                <th scope="col">ADP ID</th>
                <th scope="col">NAME</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default PullDisbusrion;

import React, { useState, useEffect } from "react";
import PanelHeader from "components/PanelHeader/PanelHeader";
import { apiHandler } from "config/apiConfig";
import { CardHeader, Card, Row, Col, Table } from "reactstrap";

const Voucher = () => {
  const [vouchers, setVouchers] = useState([]);
  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const res = await apiHandler.get(`/get-vouchers`);
      setVouchers(res.data);
    } catch (error) {
      console.log(error);
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
                <h5 className="title">VOUCHERS</h5>
              </CardHeader>
              <hr />
              {vouchers && vouchers.length ? (
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Voucher Code</th>
                      <th>Expiry Date</th>
                      <th>Voucher Type</th>
                      <th>Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {vouchers.map((voucher, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{voucher.voucherCode}</td>
                        <td>{voucher.expiryDate}</td>
                        <td>{voucher.voucherType}</td>
                        <td>{voucher.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div>No Vouchers Available</div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Voucher;

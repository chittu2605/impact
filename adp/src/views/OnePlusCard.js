import React, { useState, useEffect } from "react";
import PanelHeader from "components/PanelHeader/PanelHeader";
import { apiHandler } from "config/apiConfig";
import {
  CardHeader,
  Card,
  Row,
  Col,
  Table,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import CardDetails from "components/Molecule/CardDetails";

const OnePlusCard = () => {
  const [cards, setCards] = useState([]);
  const [noCosponsor, setNoCosponsor] = useState(0);
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  useEffect(() => {
    fetchCards();
  }, []);

  const openDetails = (card) => {
    setSelectedCard(card);
    setModelOpen(true);
  };

  const closeModel = () => setModelOpen(false);

  const fetchCards = async () => {
    try {
      const res = await apiHandler.get(`/get-cards`);
      setCards(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getNoCoSponsered = async () => {
    try {
      const res = await apiHandler.get(`/no-co-sponsored`);
      setNoCosponsor(res.data.noCoSponsored);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row style={{ height: "80vh" }}>
          <Col md="12">
            <Card style={{ minHeight: "80%", overflow: "hidden" }}>
              <CardHeader>
                <h5 className="title">CARDS</h5>
              </CardHeader>
              <hr />
              {cards && cards.length ? (
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Type</th>
                      <th>Quantity</th>
                      <th>Issued Date</th>
                      <th>Cycles To Expire</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cards.map((card, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{card.card_type}</td>
                        <td>{card.qty}</td>
                        <td>{new Date(card.created_on).toLocaleString()}</td>
                        <td>
                          {card.valid_till > 0
                            ? card.valid_till + " Cycles"
                            : "NA"}
                        </td>
                        <td>{!card.expiry_cycle && noCosponsor< 3 ?  <span style={{ color: 'red' }}>INACTIVE</span>: "ACTIVE"}</td>
                        <td>
                          <Button onClick={() => openDetails(card)}>
                            Details
                          </Button>
                        </td>
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
      <Modal isOpen={modelOpen} toggle={closeModel} size="lg">
        <ModalHeader>Card Details</ModalHeader>
        <ModalBody>
          <CardDetails card={selectedCard} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default OnePlusCard;

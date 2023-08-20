import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Row, Col, Card, Button, Badge,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { fetchDragons, reserveDragon, cancelDragonReservation } from '../redux/dragons/dragonsSlice';
import '../styles/dragons.css';

const Dragon = ({ dragon }) => {
  const dispatch = useDispatch();

  const handleReserveDragon = () => {
    dispatch(reserveDragon(dragon.dragonId));
  };

  const handleCancelReserveDragon = () => {
    dispatch(cancelDragonReservation(dragon.dragonId));
  };

  return (
    <Card className="dragon-card">
      <Container className="card-container">
        <Row className="row">
          <Col md={4} style={{ marginBottom: '2%' }}>
            <Card.Img className="dragon-image" variant="top" src={dragon.flickrImages[0]} alt={`Imagen de ${dragon.dragonName}`} />
          </Col>
          <Col md={8}>
            <Card.Body className="dragon-content">
              <Card.Title className="dragon-title">{dragon.dragonName}</Card.Title>
              <Card.Text>
                {dragon.reserved && <Badge bg="primary" className="">Reserved</Badge>}
                {dragon.description}
              </Card.Text>
              {dragon.reserved ? (
                <Button variant="primary" style={{ background: 'white', color: 'gray', border: '1px solid gray' }} onClick={handleCancelReserveDragon}>
                  Cancel Reservation
                </Button>
              ) : (
                <Button variant="primary" onClick={handleReserveDragon}>
                  Reserve Dragon
                </Button>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

Dragon.propTypes = {
  dragon: PropTypes.shape({
    dragonId: PropTypes.string.isRequired,
    dragonName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    flickrImages: PropTypes.arrayOf(PropTypes.string).isRequired,
    reserved: PropTypes.bool.isRequired,
  }).isRequired,
};

function Dragons() {
  const dispatch = useDispatch();
  const dragons = useSelector((state) => state.dragons.list);

  useEffect(() => {
    if (dragons.length === 0) {
      dispatch(fetchDragons());
    }
  }, [dispatch, dragons]);

  return (
    <div>
      {dragons.map((dragon) => (
        <Dragon key={dragon.dragonId} dragon={dragon} />
      ))}
    </div>
  );
}

export default Dragons;

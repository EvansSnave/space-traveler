import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Row, Col, Card, Button,
} from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import PropTypes from 'prop-types';
import { fetchRockets, setSelectedRocket, cancelReserveRocket } from '../redux/rockets/rocketsSlice';
import '../styles/rockets.css';

const Rocket = ({ rocket }) => {
  const dispatch = useDispatch();
  const handleCancelReserveRocket = () => {
    dispatch(cancelReserveRocket(rocket.rocket_id));
  };
  const handleReserveRocket = () => {
    dispatch(setSelectedRocket(rocket));
  };
  return (
    <Card className="rocket-card" style={{ border: 'none' }}>
      <Container className="card-container">
        <Row className="row">
          <Col md={4} style={{ marginBottom: '2%' }}>
            <Card.Img className="rocket-image" variant="top" src={rocket.flickr_images[0]} alt={`Imagen de ${rocket.rocket_name}`} style={{ borderRadius: '0' }} data-testid="rocket-image" />
          </Col>
          <Col md={8}>
            <Card.Body className="rocket-content">
              <Card.Title className="rocket-title">{rocket.rocket_name}</Card.Title>
              <Card.Text>
                {rocket.reserved && <Badge bg="primary" className="">Reserved</Badge>}
                {rocket.description}
              </Card.Text>
              {rocket.reserved ? (
                <Button
                  variant="primary"
                  style={{
                    background: 'white',
                    color: 'gray',
                    border: '1px solid gray',
                  }}
                  onClick={handleCancelReserveRocket}
                >
                  Cancel Reservation
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleReserveRocket}
                  data-testid="reserve-button"
                >
                  Reserve Rocket
                </Button>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

Rocket.propTypes = {
  rocket: PropTypes.shape({
    rocket_id: PropTypes.string.isRequired,
    rocket_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    flickr_images: PropTypes.arrayOf(PropTypes.string).isRequired,
    reserved: PropTypes.bool.isRequired,
  }).isRequired,
};

function Rockets() {
  const rockets = useSelector((state) => state.rockets);
  const dispatch = useDispatch();
  useEffect(() => {
    if (rockets.length === 0) {
      dispatch(fetchRockets());
    }
  }, [dispatch, rockets]);
  return (
    <div>
      {rockets.map((rocket) => (
        <Rocket key={rocket.rocket_id} rocket={rocket} />
      ))}
    </div>
  );
}
export { Rocket };
export default Rockets;

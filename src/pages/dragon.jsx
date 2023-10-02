import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
} from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import PropTypes from 'prop-types';
import {
  fetchDragons,
  setSelectedDragon,
  cancelReserveDragon,
} from '../redux/dragons/dragonsSlice';
import '../styles/dragons.css';

const Dragon = ({ dragon }) => {
  const dispatch = useDispatch();
  const handleCancelReserveDragon = () => {
    dispatch(cancelReserveDragon(dragon.dragon_id));
  };
  const handleReserveDragon = () => {
    dispatch(setSelectedDragon(dragon));
  };
  return (
    <Card className="dragon-card" style={{ border: 'none' }}>
      <Container className="card-container">
        <Row className="row">
          <Col md={4} style={{ marginBottom: '2%' }}>
            <Card.Img
              className="dragon-image"
              variant="top"
              src={dragon.flickr_images[0]}
              alt={`Imagen de ${dragon.dragon_name}`}
              style={{ borderRadius: '0' }}
              data-testid="dragon-image"
            />
          </Col>
          <Col md={8}>
            <Card.Body className="dragon-content">
              <Card.Title className="dragon-title">
                {dragon.dragon_name}
              </Card.Title>
              <Card.Text>
                {dragon.reserved && (
                  <Badge bg="primary" className="">
                    Reserved
                  </Badge>
                )}
                {dragon.description}
              </Card.Text>
              {dragon.reserved ? (
                <Button
                  variant="primary"
                  style={{
                    background: 'white',
                    color: 'gray',
                    border: '1px solid gray',
                  }}
                  onClick={handleCancelReserveDragon}
                >
                  Cancel Reservation
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleReserveDragon}
                  data-testid="reserve-button"
                >
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
    dragon_id: PropTypes.string.isRequired,
    dragon_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    flickr_images: PropTypes.arrayOf(PropTypes.string).isRequired,
    reserved: PropTypes.bool.isRequired,
  }).isRequired,
};

function Dragons() {
  const dragons = useSelector((state) => state.dragons);
  const dispatch = useDispatch();
  useEffect(() => {
    if (dragons.length === 0) {
      dispatch(fetchDragons());
    }
  }, [dispatch, dragons]);
  return (
    <div>
      {dragons.map((dragon) => (
        <Dragon key={dragon.dragon_id} dragon={dragon} />
      ))}
    </div>
  );
}
export { Dragon };
export default Dragons;

import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRocketsFromAPI, reserveInServer, reserveRocket } from '../redux/rockets/rocketSlice';

const CreateRocketsUI = ({
  id, name, description, image, handleButton,
}) => (
  <li>
    <img src={image} alt="Rocket shiping to space" />
    <div>
      <p>{name}</p>
      <p>{description}</p>
      <button onClick={() => handleButton(id)} type="button">Reserve rocket</button>
    </div>
  </li>
);

CreateRocketsUI.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  handleButton: PropTypes.func.isRequired,
};

const RenderRockets = () => {
  const dispatch = useDispatch();
  const rocketsArr = useSelector((state) => state.rocketSlice.rockets);
  const handleButton = (id) => {
    dispatch(reserveRocket(id));
    dispatch(reserveInServer(id));
  };
  useEffect(() => {
    dispatch(getRocketsFromAPI());
  }, [dispatch]);
  return (
    <ul>
      {rocketsArr.map((rocket) => (
        <CreateRocketsUI
          key={rocket.id}
          id={rocket.id}
          name={rocket.rocket_name}
          description={rocket.description}
          image={rocket.flickr_images}
          handleButton={handleButton}
        />
      ))}
    </ul>
  );
};

export default RenderRockets;

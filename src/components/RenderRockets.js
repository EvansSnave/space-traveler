import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRocketsFromAPI } from '../redux/rockets/rocketSlice';

const CreateRocketsUI = ({
  id, name, description, image,
}) => (
  <li>
    <img src={image} alt="Rocket shiping to space" />
    <div>
      <p>{name}</p>
      <p>{description}</p>
      <p>{id}</p>
    </div>
  </li>
);

CreateRocketsUI.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

const RenderRockets = () => {
  const dispatch = useDispatch();
  const rocketsArr = useSelector((state) => state.rocketSlice.rockets);
  useEffect(() => {
    dispatch(getRocketsFromAPI());
  }, [dispatch]);
  return (
    <div>
      {rocketsArr.map((rocket) => (
        <CreateRocketsUI
          key={rocket.id}
          id={rocket.id}
          name={rocket.rocket_name}
          description={rocket.description}
          image={rocket.flickr_images}
        />
      ))}
    </div>
  );
};

export default RenderRockets;

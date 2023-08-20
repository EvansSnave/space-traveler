import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rocketsReducer from '../../redux/rockets/rocketsSlice';
import Rockets, { Rocket } from '../../pages/rockets';

const mockRocket = {
  rocket_id: '1',
  rocket_name: 'Rocket 1',
  description: 'desc1',
  flickr_images: ['image1'],
  reserved: false,
};

const store = configureStore({ reducer: { rockets: rocketsReducer } });

describe('<Rocket /> component', () => {
  it('displays rocket details', () => {
    render(
      <Provider store={store}>
        <Rocket rocket={mockRocket} />
      </Provider>,
    );

    expect(screen.getByText(mockRocket.rocket_name)).toBeInTheDocument();
    expect(screen.getByAltText(`Imagen de ${mockRocket.rocket_name}`)).toBeInTheDocument();
    expect(screen.getByTestId('rocket-image')).toHaveAttribute('src', mockRocket.flickr_images[0]);
  });

  it('handles reservation button click', () => {
    render(
      <Provider store={store}>
        <Rocket rocket={mockRocket} />
      </Provider>,
    );

    const button = screen.getByTestId('reserve-button');
    fireEvent.click(button);
  });
});

describe('<Rockets /> container', () => {
  it('renders Rockets component', () => {
    const { container } = render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    expect(container.firstChild).toBeDefined();
  });
});

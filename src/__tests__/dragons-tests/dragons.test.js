import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import dragonsReducer, { fetchDragons, reserveDragon, cancelDragonReservation } from '../../redux/dragons/dragonsSlice';
import Dragons from '../../pages/dragons';

jest.mock('axios');

describe('dragonsSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { dragons: dragonsReducer } });
  });

  test('fetches dragons from API and updates state', async () => {
    const mockData = [
      {
        id: '1', name: 'Dragon 1', description: 'desc1', flickr_images: ['image1'], reserved: false,
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockData });

    await store.dispatch(fetchDragons());

    expect(store.getState().dragons.list[0].dragonId).toEqual('1');
    expect(store.getState().dragons.list[0].dragonName).toEqual('Dragon 1');
  });

  test('reserves a dragon', () => {
    const initialState = { list: [{ dragonId: '1', reserved: false }] };
    const action = reserveDragon('1');
    const state = dragonsReducer(initialState, action);
    expect(state.list[0].reserved).toBe(true);
  });

  test('cancels dragon reservation', () => {
    const initialState = { list: [{ dragonId: '1', reserved: true }] };
    const action = cancelDragonReservation('1');
    const state = dragonsReducer(initialState, action);
    expect(state.list[0].reserved).toBe(false);
  });
});

describe('Dragons Component', () => {
  let store;
  const mockData = [
    {
      id: '1', name: 'Dragon 1', description: 'desc1', flickr_images: ['image1'], reserved: false,
    },
  ];

  beforeEach(() => {
    store = configureStore({ reducer: { dragons: dragonsReducer } });
    axios.get.mockResolvedValueOnce({ data: mockData });
  });

  test('renders Dragons component', async () => {
    render(
      <Provider store={store}>
        <Dragons />
      </Provider>,
    );

    const dragonCard = await screen.findByText('Dragon 1');
    expect(dragonCard).toBeInTheDocument();
  });

  test('reserves a dragon', async () => {
    render(
      <Provider store={store}>
        <Dragons />
      </Provider>,
    );

    const reserveButton = await screen.findByText('Reserve Dragon');
    fireEvent.click(reserveButton);

    await waitFor(() => {
      expect(store.getState().dragons.list[0].reserved).toBe(true);
    });
  });

  test('cancels a dragon reservation', async () => {
    render(
      <Provider store={store}>
        <Dragons />
      </Provider>,
    );

    const reserveButton = await screen.findByText('Reserve Dragon');
    fireEvent.click(reserveButton);

    await waitFor(() => {
      expect(store.getState().dragons.list[0].reserved).toBe(true);
    });

    const cancelButton = await screen.findByText('Cancel Reservation');
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(store.getState().dragons.list[0].reserved).toBe(false);
    });
  });
});

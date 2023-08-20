import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import rocketsReducer, { fetchRockets, setSelectedRocket, cancelReserveRocket } from '../../redux/rockets/rocketsSlice';

jest.mock('axios');

describe('rocketsSlice', () => {
  let store;
  const mockData = [
    {
      id: '1', name: 'Rocket 1', description: 'desc1', flickr_images: ['image1'], reserved: false,
    },
  ];

  beforeEach(() => {
    store = configureStore({ reducer: { rockets: rocketsReducer } });
    axios.get.mockResolvedValueOnce({ data: mockData });
  });

  test('fetches rockets from API and updates state', async () => {
    await store.dispatch(fetchRockets());

    expect(store.getState().rockets[0].rocket_id).toEqual('1');
    expect(store.getState().rockets[0].rocket_name).toEqual('Rocket 1');
  });

  test('sets selected rocket and updates reservation status', async () => {
    await store.dispatch(fetchRockets());

    const rocketData = { rocket_id: '1', rocket_name: 'Rocket 1' };
    await store.dispatch(setSelectedRocket(rocketData));

    expect(store.getState().rockets[0].reserved).toBe(true);
  });

  test('cancels rocket reservation', async () => {
    await store.dispatch(fetchRockets());

    const rocketData = { rocket_id: '1', rocket_name: 'Rocket 1' };
    await store.dispatch(setSelectedRocket(rocketData));

    await store.dispatch(cancelReserveRocket('1'));

    expect(store.getState().rockets[0].reserved).toBe(false);
  });
});

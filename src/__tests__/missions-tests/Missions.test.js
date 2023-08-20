import '@testing-library/jest-dom';
import React from 'react';
import {
  render, screen, waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import Missions from '../../pages/missions'; // Make sure this path is correct
import missionsReducer from '../../redux/missions/missionsSlice';

jest.mock('axios');

// Mock data for testing
const mockMissions = [
  {
    mission_id: '1',
    mission_name: 'Test Mission 1',
    description: 'This is a test mission',
    reserved: false,
  },
  {
    mission_id: '2',
    mission_name: 'Test Mission 2',
    description: 'This is another test mission',
    reserved: false,
  },
];

describe('Missions', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        missions: missionsReducer,
      },
    });
    axios.get.mockResolvedValueOnce({ data: mockMissions });
  });

  test('renders Missions component', async () => {
    render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );
    const missionName1 = await screen.findByText(mockMissions[0].mission_name);
    const missionName2 = await screen.findByText(mockMissions[1].mission_name);
    expect(missionName1).toBeInTheDocument();
    expect(missionName2).toBeInTheDocument();
  });

  test('dispatches fetchMissions action when mounted and missions array is empty', async () => {
    render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
  });

  test('renders MissionList component when not loading', async () => {
    render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );
    const missionName1 = await screen.findByText(mockMissions[0].mission_name);
    const missionName2 = await screen.findByText(mockMissions[1].mission_name);
    expect(missionName1).toBeInTheDocument();
    expect(missionName2).toBeInTheDocument();
  });
});

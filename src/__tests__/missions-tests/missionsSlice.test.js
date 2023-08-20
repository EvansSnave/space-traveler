import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import missionsReducer, { reserveMission, leaveMission, fetchMissions } from '../../redux/missions/missionsSlice';

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

jest.mock('axios');

describe('missions reducer', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        missions: missionsReducer,
      },
      preloadedState: {
        missions: {
          missions: mockMissions,
          loading: false,
        },
      },
    });
  });

  test('should handle initial state', () => {
    const actual = store.getState().missions;
    expect(actual.missions).toEqual(mockMissions);
    expect(actual.loading).toBe(false);
  });

  // Test reserveMission action
  test('should handle reserveMission', () => {
    store.dispatch(reserveMission('1'));
    const actual = store.getState().missions;
    expect(actual.missions[0].reserved).toBe(true);
  });

  // Test leaveMission action
  test('should handle leaveMission', () => {
    store.dispatch(leaveMission('1'));
    const actual = store.getState().missions;
    expect(actual.missions[0].reserved).toBe(false);
  });

  // Test fetchMissions action
  test('should handle fetchMissions', async () => {
    axios.get.mockResolvedValueOnce({ data: mockMissions });
    await store.dispatch(fetchMissions());
    const actual = store.getState().missions;
    expect(actual.missions).toEqual(mockMissions);
    expect(actual.loading).toBe(false);
  });
});

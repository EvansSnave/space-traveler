import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import MissionList from '../../components/MissionList';

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

describe('MissionList', () => {
  test('renders MissionList component with correct data', async () => {
    render(
      <Provider store={store}>
        <MissionList missions={mockMissions} />
      </Provider>,
    );

    // Check that the MissionList component is rendered with correct data
    mockMissions.forEach((mission) => {
      expect(screen.getByText(mission.mission_name)).toBeInTheDocument();
      expect(screen.getByText(mission.description)).toBeInTheDocument();
    });
  });

  // Add more tests as needed...
});

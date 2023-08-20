import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { useDispatch } from 'react-redux';
import { reserveMission, leaveMission } from '../redux/missions/missionsSlice';
import '../styles/MissionList.css';

const MissionList = ({ missions }) => {
  const dispatch = useDispatch();

  const handleJoinMission = (missionId) => {
    dispatch(reserveMission(missionId));
  };

  const handleLeaveMission = (missionId) => {
    dispatch(leaveMission(missionId));
  };

  return (
    <div className="mission-list">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mission</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => {
            const {
              mission_id: missionId,
              mission_name: missionName,
              description, reserved,
            } = mission;
            return (
              <tr key={missionId}>
                <td className="mission-name">{missionName}</td>
                <td className="mission-description">{description}</td>
                <td>
                  {reserved ? (
                    <Badge bg="primary" className="mission-status">ACTIVE MEMBER</Badge>
                  ) : (
                    <Badge bg="secondary" className="mission-status">NOT A MEMBER</Badge>
                  )}
                </td>
                <td>
                  {reserved ? (
                    <Button type="submit" variant="outline-secondary" className="join-button" onClick={() => handleLeaveMission(missionId)}>Leave Mission</Button>
                  ) : (
                    <Button type="submit" variant="outline-secondary" className="join-button" onClick={() => handleJoinMission(missionId)}>Join Mission</Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

MissionList.propTypes = {
  missions: PropTypes.arrayOf(
    PropTypes.shape({
      mission_id: PropTypes.string.isRequired,
      mission_name: PropTypes.string.isRequired,
      description: PropTypes.string,
      reserved: PropTypes.bool,
    }),
  ).isRequired,
};

export default MissionList;

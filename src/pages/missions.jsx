import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMissions } from '../redux/missions/missionsSlice';
import MissionList from '../components/MissionList';

const Missions = () => {
  const { missions, isLoading } = useSelector((state) => state.missions);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!isLoading && !missions.length) {
      dispatch(fetchMissions());
    }
  }, [dispatch, missions, isLoading]);

  return (
    <div>
      {!isLoading && <MissionList missions={missions} />}
    </div>
  );
};

export default Missions;

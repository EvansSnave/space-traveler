import { configureStore } from '@reduxjs/toolkit';
import missionsReducer from './missions/missionsSlice';
import rocketsReducer from './rockets/rocketsSlice';

const rootReducer = {
  missions: missionsReducer,
  rockets: rocketsReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

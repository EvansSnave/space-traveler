import { configureStore } from '@reduxjs/toolkit';
import rockets from './rockets/rocketSlice';

const store = configureStore({
  reducer: {
    rocketSlice: rockets,
  },
});

export default store;

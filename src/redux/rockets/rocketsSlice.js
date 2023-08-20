/* eslint-disable max-len */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRockets = createAsyncThunk('rockets/fetchRockets', async () => {
  const response = await axios.get('https://api.spacexdata.com/v4/rockets');
  return response.data.map((rocket) => ({
    rocket_id: rocket.id,
    rocket_name: rocket.name,
    description: rocket.description,
    flickr_images: rocket.flickr_images,
    reserved: false,
  }));
});

export const setSelectedRocket = createAsyncThunk('rockets/setSelectedRocket', async (rocketData) => rocketData);

export const cancelReserveRocket = createAsyncThunk('rockets/cancelReserveRocket', async (rocketId) => rocketId);

export const rocketsSlice = createSlice({
  name: 'rockets',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRockets.fulfilled, (state, action) => action.payload);
    builder.addCase(setSelectedRocket.fulfilled, (state, action) => {
      const selectedRocketId = action.payload.rocket_id;
      return state.map((rocket) => (rocket.rocket_id === selectedRocketId ? { ...rocket, reserved: true } : rocket));
    });
    builder.addCase(cancelReserveRocket.fulfilled, (state, action) => {
      const rocketId = action.payload;
      return state.map((rocket) => (rocket.rocket_id === rocketId ? { ...rocket, reserved: false } : rocket));
    });
  },
});

export default rocketsSlice.reducer;

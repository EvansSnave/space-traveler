/* eslint-disable max-len */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDragons = createAsyncThunk('dragons/fetchDragons', async () => {
  const response = await axios.get('https://api.spacexdata.com/v4/dragons');
  return response.data.map((dragon) => ({
    dragon_id: dragon.id,
    dragon_name: dragon.name,
    description: dragon.description,
    flickr_images: dragon.flickr_images,
    reserved: false,
  }));
});

export const cancelReserveDragon = createAsyncThunk('dragons/cancelReserveDragon', async (dragonId) => dragonId);

export const setSelectedDragon = createAsyncThunk('dragons/setSelectedDragon', async (dragonData) => dragonData);

const initialState = [];

export const dragonsSlice = createSlice({
  name: 'dragons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDragons.fulfilled, (state, action) => action.payload);
    builder.addCase(setSelectedDragon.fulfilled, (state, action) => {
      const selectedDragonId = action.payload.dragon_id;
      return state.map((dragon) => (dragon.dragon_id === selectedDragonId ? { ...dragon, reserved: true } : dragon));
    });
    builder.addCase(cancelReserveDragon.fulfilled, (state, action) => {
      const dragonId = action.payload;
      return state.map((dragon) => (dragon.dragon_id === dragonId ? { ...dragon, reserved: false } : dragon));
    });
  },
});

export default dragonsSlice.reducer;

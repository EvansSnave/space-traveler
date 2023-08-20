// src/redux/dragons/dragonsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDragons = createAsyncThunk(
  'dragons/fetchDragons',
  async () => {
    const response = await axios.get('https://api.spacexdata.com/v4/dragons');
    return response.data.map((dragon) => ({
      dragonId: dragon.id,
      dragonName: dragon.name,
      description: dragon.description,
      flickrImages: dragon.flickr_images,
      reserved: false,
    }));
  },
);

export const dragonsSlice = createSlice({
  name: 'dragons',
  initialState: { list: [] },
  reducers: {
    reserveDragon: (state, action) => {
      const newState = state.list.map((dragon) => {
        if (dragon.dragonId !== action.payload) return dragon;
        return { ...dragon, reserved: true };
      });
      state.list = newState;
    },
    cancelDragonReservation: (state, action) => {
      const newState = state.list.map((dragon) => {
        if (dragon.dragonId !== action.payload) return dragon;
        return { ...dragon, reserved: false };
      });
      state.list = newState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDragons.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const { reserveDragon, cancelDragonReservation } = dragonsSlice.actions;

export default dragonsSlice.reducer;

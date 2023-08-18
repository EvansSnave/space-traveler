import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const URL = 'https://api.spacexdata.com/v4/rockets/';
export const getRocketsFromAPI = createAsyncThunk('rocketSlice/getRockets', async () => {
  const formatRes = (res) => {
    const data = res.map((obj) => ({
      id: obj.id,
      rocket_name: obj.name,
      description: obj.description,
      flickr_images: obj.flickr_images[0],
    }));
    return data;
  };
  const response = await axios.get(URL);
  return formatRes(response.data);
});

export const reserveInServer = createAsyncThunk('rocketSlice/reserveRocket', async (id) => {
  const response = await axios.get(`${URL}${id}`);
  response.data.reserved = true;
  await axios.put(URL, response);
});

const rocketSlice = createSlice({
  name: 'rocketSlice',
  initialState: [],
  reducers: {
    reserveRocket: (state, action) => {
      const getBookedRocket = state.rockets.map((reserve) => {
        if (reserve.id !== action.payload) return reserve;
        return { ...reserve, reserved: true };
      });
      state.rockets = getBookedRocket;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRocketsFromAPI.pending, (state) => {
        state.status = 'Loading';
      })
      .addCase(getRocketsFromAPI.fulfilled, (state, action) => {
        state.status = 'Success';
        state.rockets = action.payload;
      })
      .addCase(getRocketsFromAPI.rejected, (state, action) => {
        state.status = 'Fail';
        state.error = action.error.message;
      });
  },
});

export const { reserveRocket } = rocketSlice.actions;
export default rocketSlice.reducer;

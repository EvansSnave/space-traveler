import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const URL = 'https://api.spacexdata.com/v4/rockets';
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

const initialState = {
  rockets: [],
};

const rocketSlice = createSlice({
  name: 'rocketSlice',
  initialState,
  reducers: {

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

export default rocketSlice.reducer;

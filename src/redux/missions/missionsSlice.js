import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMissions = createAsyncThunk(
  'missions/fetchMissions',
  async () => {
    const response = await axios.get('https://api.spacexdata.com/v3/missions');
    return response.data.map((mission) => ({
      mission_id: mission.mission_id,
      mission_name: mission.mission_name,
      description: mission.description,
      reserved: false,
    }));
  },
);

export const missionsSlice = createSlice({
  name: 'missions',
  initialState: { missions: [], loading: false },
  reducers: {
    leaveMission: (state, action) => {
      const mission = state.missions.find((mission) => mission.mission_id === action.payload);
      if (mission) {
        mission.reserved = false;
      }
    },
    reserveMission: (state, action) => {
      const mission = state.missions.find((mission) => mission.mission_id === action.payload);
      if (mission) {
        mission.reserved = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMissions.fulfilled, (state, action) => {
      state.missions = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchMissions.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { reserveMission, leaveMission } = missionsSlice.actions;

export default missionsSlice.reducer;

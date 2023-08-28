import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  value: [],
};
const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    addToPlaylist: (state, action) => {
      if (state.value.find((item) => action.payload.id === item.id)) {
        state;
      } else {
        state = state.value.push(action.payload);
      }
    },
    deleteFromPlaylist: (state, action) => {
      let { id } = action.payload;
      let arr = state.value.filter((item) => item.id !== id);
      state.value = arr;
    },
  },
});

export const { addToPlaylist, deleteFromPlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;

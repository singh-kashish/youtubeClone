import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Video } from "../src/types/VideoLoadTypes";

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
    clearPlaylist: (state, action) => {
      state.value = [];
    },
    playPlaylist: (state, action) => {
        let videos = action.payload;
        videos.concat().sort((a,b)=>a.positionInPlaylist>b.postionInPlaylist);
        videos.map((vid)=>{
          if (state?.value?.find((item) => vid?.video_id === item?.id)) {
            state;
          } else {
            state.value.push(vid.video);
          }
        });
    },
  },
});

export const {
  addToPlaylist,
  deleteFromPlaylist,
  clearPlaylist,
  playPlaylist,
} = playlistSlice.actions;

export default playlistSlice.reducer;

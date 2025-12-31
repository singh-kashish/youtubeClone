// reduxReducers/playlistSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Video } from "../src/types/VideoLoadTypes";

interface PlaylistState {
  value: Video[];
}
const initialState: PlaylistState = { value: [] };

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    addToPlaylist(state, action: PayloadAction<Video>) {
      if (!state.value.find((v) => v.id === action.payload.id)) {
        state.value.push(action.payload);
      }
    },
    deleteFromPlaylist(state, action: PayloadAction<{ id: string }>) {
      state.value = state.value.filter((v) => v.id !== action.payload.id);
    },
    clearPlaylist(state) {
      state.value = [];
    },
    playPlaylist(state, action: PayloadAction<Video[]>) {
      // If videos have positionInPlaylist, sort by it; otherwise, just set
      state.value = action.payload
        .slice()
        .sort(
          (a, b) =>
            ((a as any).positionInPlaylist ?? 0) -
            ((b as any).positionInPlaylist ?? 0)
        );
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

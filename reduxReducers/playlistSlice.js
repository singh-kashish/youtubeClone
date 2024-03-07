import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Video } from "../src/types/Video";

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
<<<<<<< HEAD
    clearPlaylist: (state, action) => {
      state.value = [];
    },
  },
});

export const { addToPlaylist, deleteFromPlaylist, clearPlaylist } =
  playlistSlice.actions;
=======
    clearPlaylist:(state,action)=>{
      state.value=[];
    }
  },
});

export const { addToPlaylist, deleteFromPlaylist,clearPlaylist } = playlistSlice.actions;
>>>>>>> eb42cc4a041953e03bb2dac83cfbbef5be7febfb

export default playlistSlice.reducer;

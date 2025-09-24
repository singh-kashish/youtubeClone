// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Video } from "../src/types/VideoLoadTypes";

// const initialState = {
//   value: [],
// };
// const playlistSlice = createSlice({
//   name: "playlist",
//   initialState,
//   reducers: {
//     addToPlaylist: (state, action) => {
//       if (state.value.find((item) => action.payload.id === item.id)) {
//         state;
//       } else {
//         state = state.value.push(action.payload);
//       }
//     },
//     deleteFromPlaylist: (state, action) => {
//       let { id } = action.payload;
//       let arr = state.value.filter((item) => item.id !== id);
//       state.value = arr;
//     },
//     clearPlaylist: (state, action) => {
//       state.value = [];
//     },
//     playPlaylist: (state, action) => {
//         let videos = action.payload;
//         videos.concat().sort((a,b)=>a.positionInPlaylist>b.postionInPlaylist);
//         videos.map((vid)=>{
//           if (state?.value?.find((item) => vid?.video_id === item?.id)) {
//             state;
//           } else {
//             state.value.push(vid.video);
//           }
//         });
//     },
//   },
// });

// export const {
//   addToPlaylist,
//   deleteFromPlaylist,
//   clearPlaylist,
//   playPlaylist,
// } = playlistSlice.actions;

// export default playlistSlice.reducer;


// reduxReducers/playlistSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Video } from "../src/types/VideoLoadTypes";

// interface PlaylistState {
//   value: Video[];
// }
// const initialState: PlaylistState = { value: [] };

// const playlistSlice = createSlice({
//   name: "playlist",
//   initialState,
//   reducers: {
//     addToPlaylist(state, action: PayloadAction<Video>) {
//       if (!state.value.find((v) => v.id === action.payload.id)) {
//         state.value.push(action.payload);
//       }
//     },
//     deleteFromPlaylist(state, action: PayloadAction<{ id: string }>) {
//       state.value = state.value.filter((v) => v.id !== action.payload.id);
//     },
//     clearPlaylist(state) {
//       state.value = [];
//     },
//     playPlaylist(state, action: PayloadAction<Video[]>) {
//       // If videos have positionInPlaylist, sort by it; otherwise, just set
//       state.value = action.payload
//         .slice()
//         .sort(
//           (a, b) =>
//             ((a as any).positionInPlaylist ?? 0) -
//             ((b as any).positionInPlaylist ?? 0)
//         );
//     },
//   },
// });

// export const {
//   addToPlaylist,
//   deleteFromPlaylist,
//   clearPlaylist,
//   playPlaylist,
// } = playlistSlice.actions;
// export default playlistSlice.reducer;

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
      // Append playlist videos to the end of the queue, skipping duplicates
      const playlistVideos = action.payload
        .slice()
        .sort(
          (a, b) =>
            ((a as any).positionInPlaylist ?? 0) -
            ((b as any).positionInPlaylist ?? 0)
        );
      const existingIds = new Set(state.value.map((v) => v.id));
      const newVideos = playlistVideos.filter((v) => v && !existingIds.has(v.id));
      state.value = [...state.value, ...newVideos];
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

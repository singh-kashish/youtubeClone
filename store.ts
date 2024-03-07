import { configureStore } from "@reduxjs/toolkit";
import suggestedVideoSlice from "./reduxReducers/suggestedVideoSlice";
import playlistSlice from "./reduxReducers/playlistSlice";

const store = configureStore({
  reducer: {
    suggestedVideo: suggestedVideoSlice,
    playlist: playlistSlice,
  },
});
export type rootState = ReturnType<typeof store.getState>;
export default store;
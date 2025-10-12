// reduxReducers/suggestedVideoSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { typeOfList } from "../src/types/models";
import { VideoWithProfileAndCommentsWithProfiles } from "../src/types/models";

export interface SuggestedVideoState {
  videos: Record<typeOfList, VideoWithProfileAndCommentsWithProfiles[]>;
  cache: Record<string, any>;
  displayList: typeOfList;
  currentDisplayListIndex: number;
  currentDisplayListOffset: number;
}

const initialState: SuggestedVideoState = {
  videos: {
    created_at: [],
    id: [],
    user_id: [],
    description: [],
    dislikes: [],
    likes: [],
    thumbnailUrl: [],
    title: [],
    videoStatus: [],
    videoUrl: [],
    viewCount: [],
  },
  cache: {},
  displayList: "id",
  currentDisplayListIndex: 0,
  currentDisplayListOffset: 10,
};

const suggestedVideoSlice = createSlice({
  name: "suggestedVideo",
  initialState,
  reducers: {
    loadVideos: (
      state,
      action: PayloadAction<{
        listType: typeOfList;
        videos: VideoWithProfileAndCommentsWithProfiles[];
        type: "LOAD_VIDEOS";
      }>
    ) => {
      const { listType, videos } = action.payload;
      state.videos[listType] = Array.isArray(videos) ? videos : [];
    },
    appendVideos: (
      state,
      action: PayloadAction<{
        listType: typeOfList;
        videos: VideoWithProfileAndCommentsWithProfiles[];
        type: "LOAD_MORE_VIDEOS";
      }>
    ) => {
      const { listType, videos } = action.payload;
      if (Array.isArray(videos)) {
        state.videos[listType] = [...(state.videos[listType] || []), ...videos];
      }
    },
    resetVideos: (state, action: PayloadAction<typeOfList>) => {
      const listType = action.payload;
      state.videos[listType] = [];
    },
    changeDisplayList: (state, action: PayloadAction<typeOfList>) => {
      const listType = action.payload;
      state.displayList = listType;
    },
  },
});

export const { loadVideos, appendVideos, resetVideos, changeDisplayList } =
  suggestedVideoSlice.actions;
export default suggestedVideoSlice.reducer;

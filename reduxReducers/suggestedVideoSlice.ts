import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Video, SuggestedVideoState, VideosWithProfile } from "../src/types/VideoRedux";
import { typeOfList } from "../src/types/VideoLoadTypes";
// In your hook, Redux slice, API modules:
import { Profile, LoadVideosResponse } from "../src/types/models";
import { VideoWithProfile } from "../src/types/VideoLoadTypes";

// Define the initial state for suggested videos
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
  currentDisplayListOffset:10,
};

// Redux slice for suggested videos
const suggestedVideoSlice = createSlice({
  name: "suggestedVideo",
  initialState,
  reducers: {
    loadVideos: (
      state,
      action: PayloadAction<{ listType: typeOfList; videos: VideosWithProfile; type: "LOAD_VIDEOS" }>
    ) => {
      const { listType, videos } = action.payload;

      // Replace the videos array for the current listType
      // Make sure videos is always an array or set it to an empty array if null
      state.videos[listType] = videos || [];
    },

    appendVideos: (
      state,
      action: PayloadAction<{ listType: typeOfList; videos: VideosWithProfile; type: "LOAD_MORE_VIDEOS" }>
    ) => {
      const { listType, videos } = action.payload;

      // Make sure that state.videos[listType] is an array before appending
      if (Array.isArray(videos)) {
        state.videos[listType] = [...(state.videos[listType] || []), ...videos];
      }
    },

    resetVideos: (state, action: PayloadAction<typeOfList>) => {
      const listType = action.payload;

      // Reset the array for the given listType
      state.videos[listType] = [];
    },
    // change displayListType
    changeDisplayList:(state, action: PayloadAction<typeOfList>)=>{
      const listType = action.payload;
      state.displayList = listType;
    }
  },
});

// Export actions and reducer
export const { loadVideos, appendVideos, resetVideos, changeDisplayList } = suggestedVideoSlice.actions;
export default suggestedVideoSlice.reducer;

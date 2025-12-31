import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VideosWithProfile } from "../src/types/VideoRedux";
import { typeOfList } from "../src/types/VideoLoadTypes";

type PaginationState = {
  offset: number;
  hasMore: boolean;
};

type SuggestedVideoState = {
  videos: Record<typeOfList, VideosWithProfile>;
  pagination: Record<typeOfList, PaginationState>;
  displayList: typeOfList;
};

const initialPagination = (): PaginationState => ({
  offset: 0,
  hasMore: true,
});

const initialState: SuggestedVideoState = {
  videos: {
    id: [],
    viewCount_desc: [],
    viewCount_asc: [],
    likes_desc: [],
    created_at_desc: [],
    created_at_asc: [],
  },
  pagination: {
    id: initialPagination(),
    viewCount_desc: initialPagination(),
    viewCount_asc: initialPagination(),
    likes_desc: initialPagination(),
    created_at_desc: initialPagination(),
    created_at_asc: initialPagination(),
  },
  displayList: "id",
};

const suggestedVideoSlice = createSlice({
  name: "suggestedVideo",
  initialState,
  reducers: {
    changeDisplayList: (state, action: PayloadAction<typeOfList>) => {
      state.displayList = action.payload;
    },

    appendVideos: (
      state,
      action: PayloadAction<{ listType: typeOfList; videos: VideosWithProfile }>
    ) => {
      const { listType, videos } = action.payload;
      state.videos[listType].push(...videos);
    },
    
    advanceOffset: (
    state,
    action: PayloadAction<{ listType: typeOfList; pageSize: number }>
  ) => {
    const { listType, pageSize } = action.payload;
    state.pagination[listType].offset += pageSize;
  },

    updatePagination: (
      state,
      action: PayloadAction<{
        listType: typeOfList;
        offset: number;
        hasMore: boolean;
      }>
    ) => {
      const { listType, offset, hasMore } = action.payload;
      state.pagination[listType] = { offset, hasMore };
    },

    resetPagination: (state, action: PayloadAction<typeOfList>) => {
      state.videos[action.payload] = [];
      state.pagination[action.payload] = initialPagination();
    },
  },
});

export const {
  appendVideos,
  updatePagination,
  advanceOffset,
  changeDisplayList,
  resetPagination,
} = suggestedVideoSlice.actions;


export default suggestedVideoSlice.reducer;

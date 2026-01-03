import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Video_Icon } from "../src/types/interaces";

type SortBy = "recent" | "older" | "high" | "low";

type SuggestedVideoState = {
  videos: Video_Icon[];
  offset: number;
  pageSize: number;
  hasMore: boolean;
  loading: boolean;
  sortBy: SortBy;
};

const initialState: SuggestedVideoState = {
  videos: [],
  offset: 0,
  pageSize: 12,
  hasMore: true,
  loading: false,
  sortBy: "recent",
};

const suggestedVideoSlice = createSlice({
  name: "suggestedVideo",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },

    appendVideos(state, action: PayloadAction<Video_Icon[]>) {
      const existingIds = new Set(state.videos.map(v => v.id));

      const uniqueIncoming = action.payload.filter(
        v => !existingIds.has(v.id)
      );

      state.videos.push(...uniqueIncoming);
      state.loading = false;

      if (uniqueIncoming.length < state.pageSize) {
        state.hasMore = false;
      }
    },

    advanceOffset(state) {
      state.offset += state.pageSize;
    },

    resetPagination(state) {
      state.videos = [];
      state.offset = 0;
      state.hasMore = true;
      state.loading = false;
    },

    setSortBy(state, action: PayloadAction<SortBy>) {
      state.sortBy = action.payload;
    },
  },
});

export const {
  startLoading,
  appendVideos,
  advanceOffset,
  resetPagination,
  setSortBy,
} = suggestedVideoSlice.actions;

export default suggestedVideoSlice.reducer;

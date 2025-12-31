// reduxReducers/suggestedVideoSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type HeaderDensityState = {
  cache: Record<string, unknown>;
  headerDensityClicked: boolean;
};

const initialState: HeaderDensityState = {
  headerDensityClicked:false,
  cache: {},
};

const headerDensity = createSlice({
  name: "headerdensity",
  initialState,
  reducers: {
    changeHeaderDensity: (state) => {
      state.headerDensityClicked = !state.headerDensityClicked;
    },
    resetHeaderDensity: (state) => {
      state.headerDensityClicked = true;
    },
  },
});


export const { changeHeaderDensity, resetHeaderDensity } = headerDensity.actions;
export default headerDensity.reducer;

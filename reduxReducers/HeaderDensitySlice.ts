import { createSlice } from "@reduxjs/toolkit";

type HeaderDensityState = {
  headerDensityClicked: boolean;
};

const initialState: HeaderDensityState = {
  headerDensityClicked: false,
};

const headerDensitySlice = createSlice({
  name: "headerDensity",
  initialState,
  reducers: {
    changeHeaderDensity(state) {
      state.headerDensityClicked = !state.headerDensityClicked;
    },
    resetHeaderDensity(state) {
      state.headerDensityClicked = false;
    },
  },
});

export const { changeHeaderDensity, resetHeaderDensity } =
  headerDensitySlice.actions;

export default headerDensitySlice.reducer;

import { createSlice,PayloadAction } from "@reduxjs/toolkit";
const initialState = {
    value:[],
};
const suggestedVideoSlice = createSlice({
    name: 'suggestedVideo',
    initialState,
    reducers:{
        descendingViews(state){
            state = state;
        }
    }
});

export const {descendingViews} = suggestedVideoSlice.actions;
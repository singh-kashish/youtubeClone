import { configureStore,ThunkAction,Action } from "@reduxjs/toolkit";
import suggestedVideoSlice from './reduxReducers/suggestedVideoSlice';
import playlistSlice from './reduxReducers/playlistSlice';

export const store = configureStore({
    reducer:{
        suggestedVideo:suggestedVideoSlice,
        playlist:playlistSlice,
    }
});

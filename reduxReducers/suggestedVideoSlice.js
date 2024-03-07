import { createSlice} from "@reduxjs/toolkit";
const initialState = {
    videos:[],
};
const suggestedVideoSlice = createSlice({
    name: 'suggestedVideo',
    initialState,
    reducers:{
        descendingViews(state){
            state = state;
        },
        loadVideos(state,action){
            state.videos.push(action.payload);
        }
    }
});

export const {descendingViews,loadVideos} = suggestedVideoSlice.actions;
export default suggestedVideoSlice.reducer;
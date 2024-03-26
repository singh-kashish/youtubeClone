import { createSlice} from "@reduxjs/toolkit";
const initialState = {
    videos:[],
};
const suggestedVideoSlice = createSlice({
    name: 'suggestedVideo',
    initialState,
    reducers:{
        sortVideos(state,action){
            const sortType = action.payload;
            state.videos.sort((a,b)=>{
                if(sortType==="descViews"){
                    return b.viewCount-a.viewCount;
                } else if(sortType==="asscViews"){
                    return a.viewCount-b.viewCount
                } else {
                    return 0;
                }
            })
        },
        loadVideos(state,action){
            state.videos = action.payload;
        }
    }
});

export const {sortVideos,loadVideos} = suggestedVideoSlice.actions;
export default suggestedVideoSlice.reducer;
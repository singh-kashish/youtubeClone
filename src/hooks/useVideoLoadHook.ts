import { useEffect, useState } from "react";
import { supabase } from "../components/utils/supabase";
import { useDispatch } from "react-redux";
import { loadVideos, appendVideos } from "../../reduxReducers/suggestedVideoSlice";
import { LoadVideosResponse, typeOfList } from "../types/VideoLoadTypes";
import { PostgrestError } from "@supabase/supabase-js";
 import {loadVideosPaginated}  from "../modules/loadVideosPaginated";
import { useSelector } from "react-redux";
import { rootState } from "../../store";

// Custom hook for loading videos
const useVideoLoadHook = (
  index: number,
  offset: number,
  order: boolean,
): LoadVideosResponse => {
  const [videoState, setVideoState] = useState<LoadVideosResponse>({
    loading: true,
    video: [],
    error: null,
  });
const displayListType:typeOfList = useSelector((store:rootState)=>store.suggestedVideo.displayList);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVideos = async () => {
      setVideoState((prevState) => ({ ...prevState, loading: true }));
      try {
        // Load videos with profiles
        const { video, error,loading } = await loadVideosPaginated({
          index,
          offset,
          order,
          displayListType,
        });
        if(!loading && video && error===null){
          setVideoState({video,error,loading});
        }
        // Dispatch the action based on whether we're paginating or doing the first load
        if(videoState.loading===false &&  videoState.video!==null && videoState.video!==undefined ) {
          // First load or reset when switching displayListType
          dispatch(loadVideos({ displayListType, videos: videoState?.video, type:"LOAD_VIDEOS" }));
        }else if (videoState && videoState.video!==null && videoState?.video?.length!==undefined && videoState?.video?.length > index+offset+2) {
          // If we're adding more videos (pagination), append them
          dispatch(appendVideos({ displayListType, videos: videoState?.video, type:"LOAD_MORE_VIDEOS" }));
         }
      } catch (error: any) {
        setVideoState({
          loading: false,
          video: null,
          error: { message: error.message } as PostgrestError,
        });
      } finally{
         
      }
    };

    fetchVideos();
  }, [index, offset, order, displayListType]);

  return videoState;
};


export default useVideoLoadHook;
// src/hooks/useVideoLoadHook.ts
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadVideos, appendVideos } from "../../reduxReducers/suggestedVideoSlice";
import { LoadVideosResponse, typeOfList } from "../types/VideoLoadTypes";
import { PostgrestError } from "@supabase/supabase-js";
import { loadVideosPaginated } from "../modules/loadVideosPaginated";
import { rootState } from "../../store";

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
  const displayListType: typeOfList = useSelector((store: rootState) => store.suggestedVideo.displayList);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVideos = async () => {
      setVideoState((prevState) => ({ ...prevState, loading: true }));
      try {
        const { video, error, loading } = await loadVideosPaginated({
          index,
          offset,
          order,
          displayListType,
        });
        setVideoState({ video, error, loading });

        if (!loading && video && error === null) {
          dispatch(loadVideos({ listType: displayListType, videos: video, type: "LOAD_VIDEOS" }));
        } else if (video && video.length > index + offset + 2) {
          dispatch(appendVideos({ listType: displayListType, videos: video, type: "LOAD_MORE_VIDEOS" }));
        }
      } catch (error: any) {
        setVideoState({
          loading: false,
          video: null,
          error: { message: error.message } as PostgrestError,
        });
      }
    };

    fetchVideos();
  }, [index, offset, order, displayListType, dispatch]);

  return videoState;
};

export default useVideoLoadHook;

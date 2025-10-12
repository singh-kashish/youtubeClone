// src/hooks/useVideoLoadHook.ts

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadVideos, appendVideos } from "../../reduxReducers/suggestedVideoSlice";
import { LoadVideosResponse, typeOfList } from "../types/models";
import { PostgrestError } from "@supabase/supabase-js";
import { loadVideosPaginated } from "../modules/loadVideosPaginated";
import { rootState } from "../../store";

/**
 * Load videos with pagination and push into Redux slices by list type.
 * Returns local state for immediate UI consumption.
 */
const useVideoLoadHook = (
  index: number,
  offset: number,
  order: boolean
): LoadVideosResponse => {
  const [videoState, setVideoState] = useState<LoadVideosResponse>({
    loading: true,
    video: null,
    error: null,
  });

  const displayListType: typeOfList = useSelector(
    (store: rootState) => store.suggestedVideo.displayList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    let cancelled = false;

    const fetchVideos = async () => {
      setVideoState((prev) => ({ ...prev, loading: true }));

      try {
        const { video, error, loading } = await loadVideosPaginated({
          index,
          offset,
          order,
          displayListType,
        });

        if (cancelled) return;

        setVideoState({ video, error, loading });

        // Push into Redux on successful fetch
        if (!loading && video && !error) {
          // Initial load/replace
          dispatch(
            loadVideos({
              listType: displayListType,
              videos: video,
              type: "LOAD_VIDEOS",
            })
          );

          // If we were fetching more (append), a simple heuristic:
          // If we already had items and received new ones, append.
          // You can also drive append via explicit action param.
          if (video.length > 0 && index > 0) {
            dispatch(
              appendVideos({
                listType: displayListType,
                videos: video,
                type: "LOAD_MORE_VIDEOS",
              })
            );
          }
        }
      } catch (err: any) {
        if (cancelled) return;
        setVideoState({
          loading: false,
          video: null,
          error: { message: err?.message ?? "Unknown error" } as PostgrestError,
        });
      }
    };

    fetchVideos();
    return () => {
      cancelled = true;
    };
  }, [index, offset, order, displayListType, dispatch]);

  return videoState;
};

export default useVideoLoadHook;

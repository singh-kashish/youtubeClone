import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../store";
import {
  startLoading,
  appendVideos,
} from "../../reduxReducers/suggestedVideoSlice";
import { fetchVideosFromSupabase } from "../supabase/queries/fetchVideosFromSupabase";

export default function useVideoLoadHook() {
  const dispatch = useDispatch();

  const { offset, pageSize, sortBy, hasMore, loading } = useSelector(
    (state: rootState) => state.suggestedVideo
  );

  useEffect(() => {
    if (!hasMore || loading) return;

    let cancelled = false;

    const load = async () => {
      dispatch(startLoading());

      const { data, error } = await fetchVideosFromSupabase({
        offset,
        limit: pageSize,
        sortBy,
      });

      if (!cancelled && !error && data) {
        dispatch(appendVideos(data));
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [offset, sortBy]);

  return null;
}

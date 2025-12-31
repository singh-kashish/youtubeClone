import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../store";
import {
  appendVideos,
  updatePagination,
} from "../../reduxReducers/suggestedVideoSlice";
import { normalizeVideos } from "../utils/normalizeVideo";

const useVideoLoadHook = (pageSize: number) => {
  const dispatch = useDispatch();

  const { displayList, videos, pagination } = useSelector(
    (state: rootState) => state.suggestedVideo
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const currentVideos = videos[displayList] ?? [];
  const { offset, hasMore } = pagination[displayList] ?? {
    offset: 0,
    hasMore: true,
  };

  const lastUnderscore = displayList.lastIndexOf("_");
  const field = lastUnderscore === -1 ? displayList : displayList.slice(0, lastUnderscore);
  const order = lastUnderscore === -1 ? "desc" : displayList.slice(lastUnderscore + 1);
  const ascending = order === "asc";

  useEffect(() => {
    if (loading || !hasMore) return;

    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("video")
        .select(
          `
          id,
          title,
          description,
          videoUrl,
          thumbnailUrl,
          viewCount,
          likes,
          dislikes,
          videoStatus,
          created_at,
          user_id,
          profiles (
            id,
            username,
            full_name,
            avatar_url
          )
        `
        )
        .eq("videoStatus", true)
        .not("created_at", "is", null)
        .order(field, { ascending })
        .range(offset, offset + pageSize - 1);

      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      const fetched = data ?? [];
      const normalized = normalizeVideos(fetched);

      if (normalized.length > 0) {
        dispatch(
          appendVideos({
            listType: displayList,
            videos: normalized,
          })
        );
      }

      /** STEP 4 — STOP CONDITION */
      dispatch(
        updatePagination({
          listType: displayList,
          offset: offset + fetched.length,
          hasMore: fetched.length === pageSize,
        })
      );

      setLoading(false);
    };

    fetchVideos();
  }, [displayList, offset, ascending]);

  return {
    video: currentVideos,
    loading,
    error,
    hasMore,
  };
};

export default useVideoLoadHook;

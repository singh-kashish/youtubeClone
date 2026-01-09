import { useState } from "react";
import { useSafeEffect } from "./useSafeEffect";
import { getVideosByUserId } from "../supabase/queries/videos";
import { Video } from "../types/db";
import { VideoRow } from "../types/dbRows";
import { mapVideoRow } from "../mappers/videoMapper";

export function useVideosByUserId(
  userId,
  enabled = true
) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useSafeEffect(
    () => {
      if (!userId) return;

      setLoading(true);

      getVideosByUserId(userId).then(({ data, error }) => {
        if (error) {
          console.error("getVideosByUserId error:", error);
          setVideos([]);
          setLoading(false);
          return;
        }

        const rows = (data ?? []);
        setVideos(rows);
        setLoading(false);
      });
    },
    [userId],
    enabled && !!userId
  );

  return { videos, loading };
}

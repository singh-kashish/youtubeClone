// src/hooks/useVideosByUserId.ts
import { useState } from "react";
import { useSafeEffect } from "./useSafeEffect";
import { getVideosByUserId } from "../supabase/queries/videos";
import { Video } from "../types/db";

export function useVideosByUserId(
  userId?: string,
  enabled = true
) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  useSafeEffect(
    () => {
      if (!userId) return;

      setLoading(true);
      getVideosByUserId(userId).then(({ data }) => {
        setVideos(data ?? []);
        setLoading(false);
      });
    },
    [userId],
    enabled && !!userId
  );

  return { videos, loading };
}

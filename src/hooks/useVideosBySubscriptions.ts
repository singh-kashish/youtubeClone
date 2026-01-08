// src/hooks/useVideosBySubscriptions.ts
import { useState } from "react";
import { useSafeEffect } from "./useSafeEffect";
import { getVideosBySubscriptions } from "../supabase/queries/subscriptions";
import { Video } from "../types/db";

export function useVideosBySubscriptions(
  userId?: string,
  enabled = true
) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

  useSafeEffect(
    () => {
      if (!userId) return;

      setLoading(true);

      getVideosBySubscriptions(userId).then(({ data, error }) => {
        if (error || !data) {
          setVideos([]);
          setLoading(false);
          return;
        }

        const flattened: Video[] =
          data.flatMap((row: any) =>
            row.profiles?.video ?? []
          );

        setVideos(flattened);
        setLoading(false);
      });
    },
    [userId],
    enabled && !!userId
  );

  return { videos, loading };
}

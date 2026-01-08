// src/hooks/useLikedVideosByUserId.ts
import { useState } from "react";
import { useSafeEffect } from "./useSafeEffect";
import { getLikedVideosByUserId } from "../supabase/queries/likedVideosByUser";
import { Video_Icon } from "../types/interaces";

export function useLikedVideosByUserId(
  userId?: string,
  enabled = true
) {
  const [videos, setVideos] = useState<Video_Icon[]>([]);
  const [loading, setLoading] = useState(false);

  useSafeEffect(
    () => {
      if (!userId) return;

      setLoading(true);
      getLikedVideosByUserId(userId).then(({ data }) => {
        const mapped: Video_Icon[] =
          data
            ?.map((row: any) => row.video)
            .filter(Boolean) ?? [];

        setVideos(mapped);
        setLoading(false);
      });
    },
    [userId],
    enabled && !!userId
  );

  return { videos, loading };
}

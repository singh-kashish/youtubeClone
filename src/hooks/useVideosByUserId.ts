// src/hooks/useVideosByUserId.ts
import { useEffect, useState } from "react";
import { getVideosByUserId } from "../api/queries";
import { Video_Icon } from "../types/interfaces";

export function useVideosByUserId(userId?: string) {
  const [videos, setVideos] = useState<Video_Icon[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    let mounted = true;
    setLoading(true);

    getVideosByUserId(userId)
      .then(({ data }) => {
        if (mounted) setVideos(data ?? []);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [userId]);

  return { videos, loading };
}

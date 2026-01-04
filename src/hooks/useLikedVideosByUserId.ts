// src/hooks/useLikedVideosByUserId.ts
import { useEffect, useState } from "react";
import { getLikedVideosByUserId } from "../supabase/queries";
import { likedVideo } from "../types/interaces";

export function useLikedVideosByUserId(userId?: string) {
  const [videos, setVideos] = useState<likedVideo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    let mounted = true;
    setLoading(true);

    getLikedVideosByUserId(userId)
      .then(({ data }) => {
        if (!mounted) return;

        const mapped =
          data?.map((row) => ({
            ...row.video,
            liked: row.liked,
          })) ?? [];

        setVideos(mapped);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [userId]);

  return { videos, loading };
}

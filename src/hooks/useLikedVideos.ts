import { useEffect, useState, useCallback } from "react";
import { likedVideosService } from "../modules/likedVideoService";
import { LikedVideoWithVideo } from "../types/VideoLoadTypes";
import { PostgrestError } from "@supabase/supabase-js";

interface UseLikedVideoReturn {
  likedVideos: LikedVideoWithVideo[];
  loading: boolean;
  error: PostgrestError | null;
  refetch: () => Promise<void>;
}

export function useLikedVideos(user_id?: string): UseLikedVideoReturn {
  const [likedVideos, setLikedVideos] = useState<LikedVideoWithVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(!!user_id);
  const [error, setError] = useState<PostgrestError | null>(null);

  const fetchLiked = useCallback(async () => {
    if (!user_id) {
      setLikedVideos([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await likedVideosService.getLikedVideos(user_id);

      if (error) setError(error);
      setLikedVideos(data ?? []);
    } catch (err) {
      setError({
        message: (err as Error)?.message || "Unknown error",
        details: "",
        hint: "",
        code: "unknown",
      });
      setLikedVideos([]);
    } finally {
      setLoading(false);
    }
  }, [user_id]);

  useEffect(() => {
    void fetchLiked();
  }, [fetchLiked]);

  return { likedVideos, loading, error, refetch: fetchLiked };
}

export default useLikedVideos;

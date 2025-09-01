// src/hooks/useLikedComments.ts
import { useState, useEffect } from "react";
import { likedVideosService } from "../modules/likedVideoService";
import { LikedVideo } from "../types/VideoLoadTypes";
import { PostgrestError } from "@supabase/supabase-js";

interface UseLikedVideoReturn {
  likedVideo: LikedVideo | null;
  loading: boolean;
  error: PostgrestError | null;
}

export function useLikedVideo(user_id: string, video_id: string): UseLikedVideoReturn {
  const [likedVideo, setLikedVideo] = useState<LikedVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const res = await likedVideosService.getLikedVideo(user_id, video_id);
      setLikedVideo(res.likedVideo);
      setError(res.error);
      setLoading(false);
    }
    if (user_id && video_id) fetch();
  }, [user_id, video_id]);

  return { likedVideo, loading, error };
}

// src/hooks/useLikedVideos.ts
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { LikedVideoRow } from "../types/interaces";
import { getLikedVideosByUserId } from "../supabase/queries";

export function useLikedVideos(userId?: string) {
  const [data, setData] = useState<LikedVideoRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!userId) return;

    let mounted = true;
    setLoading(true);
     const likeVid=getLikedVideosByUserId(userId);
    return () => {
      mounted = false;
    };
  }, [userId]);

  return { data, loading, error };
}

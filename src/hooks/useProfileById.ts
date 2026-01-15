import { useEffect, useState } from "react";
import { SupabaseResponse } from "../types/supabase";
import { ProfileWithVideos, Video } from "../types/interaces";
import { supabase } from "../utils/supabase";

/* ===================== HOOK STATE ===================== */

interface UseProfileWithVideosState {
  profile: ProfileWithVideos | null;
  videos: Video[];
  loading: boolean;
  error: string | null;
}

/* ===================== HOOK ===================== */

export function useProfileWithVideos(userId?: string) {
  const [state, setState] = useState<UseProfileWithVideosState>({
    profile: null,
    videos: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!userId) return;

    let isMounted = true;

    const fetchProfile = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const { data, error }: SupabaseResponse<ProfileWithVideos> =
        await supabase
          .from("profiles")
          .select(`
            id,
            username,
            full_name,
            avatar_url,

            subscribers!subscribers_subscribed_to_id_fkey (
              id,
              user_id,
              subscribed_to_id
            ),

            video (
              id,
              title,
              description,
              videoUrl,
              thumbnailUrl,
              viewCount,
              videoStatus,
              created_at,
              likes,
              dislikes,
              user_id,

              profiles (
                id,
                username,
                avatar_url
              )
            )
          `)
          .eq("id", userId)
          .order("created_at", { foreignTable: "video", ascending: false })
          .single();

      if (!isMounted) return;

      if (error) {
        setState({
          profile: null,
          videos: [],
          loading: false,
          error: error.message ?? "Failed to fetch profile",
        });
        return;
      }

      setState({
        profile: data,
        videos: data?.video ?? [], // ✅ ALWAYS array-safe
        loading: false,
        error: null,
      });
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return state;
}

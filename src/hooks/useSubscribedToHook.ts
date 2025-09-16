import { useEffect, useState } from "react";
import { supabase } from "../components/utils/supabase"; // adjust if your import differs

export default function useSubscribedToHook(user_id: string | null) {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!user_id) {
      console.log("[useSubscribedToHook] No user_id provided");
      return;
    }

    let isMounted = true;
    setLoading(true);

    async function fetchVideos() {
      try {
        const { data, error } = await supabase
          .from("video")
          .select(
            `
            id, created_at, title, user_id, description, likes, dislikes, videoUrl, videoStatus, viewCount, thumbnailUrl,
            profiles ( id, username, full_name, avatar_url, updated_at )
          `
          )
          .eq("user_id", user_id);

        if (error) throw error;

        if (isMounted) {
          setVideos(data || []);
          setError(null);

          // ✅ Clean structured logging
          console.log(
            "[useSubscribedToHook] videos fetched:",
            data?.length ?? 0
          );
          console.log("[useSubscribedToHook] videos:", data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          console.error("[useSubscribedToHook] error:", err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchVideos();

    // 🔄 Supabase realtime subscription
    const channel = supabase
      .channel("videos-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "videos" },
        (payload) => {
          console.log("[useSubscribedToHook] realtime payload:", payload);
          fetchVideos();
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [user_id]);

  return { videos, error, loading };
}

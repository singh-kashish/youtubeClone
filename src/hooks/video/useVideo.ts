import {useState, useEffect} from "react";
import { getVideoById } from "../../supabase/queries";
import { supabase } from "../../utils/supabase";
export function useVideo(videoId?: string) {
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function fetchVideo() {
    if (!videoId) return;
    setLoading(true);
    const { data } = await getVideoById(videoId);
    setVideo(data);
    setLoading(false);
  }

  useEffect(() => {
    if (!videoId) return;

    fetchVideo();

    const channel = supabase
      .channel(`video-${videoId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "video",
          filter: `id=eq.${videoId}`,
        },
        payload => {
          setVideo((prev: any) =>
            prev
              ? {
                  ...prev,
                  ...payload.new,
                  profiles: prev.profiles,
                }
              : payload.new
          );
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [videoId]);

  return { video, loading, refetchVideo: fetchVideo };
}

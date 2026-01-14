import { useState, useEffect, useRef } from "react";
import { supabase } from "../../utils/supabase";
import { getVideoById } from "../../supabase/queries";
import { incrementView } from "../../supabase/mutations";
import toast from "react-hot-toast";

export function useVideo(videoId?: string) {
  const [video, setVideo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Prevent duplicate view updates (StrictMode-safe)
  const viewToastRef = useRef<string | null>(null);

  /* --------------------------------------------
   * RESET STATE WHEN VIDEO ID CHANGES
   * ------------------------------------------ */
  useEffect(() => {
    if (!videoId) return;
    setVideo(null);
  }, [videoId]);

  /* --------------------------------------------
   * FETCH VIDEO
   * ------------------------------------------ */
  async function fetchVideo() {
    if (!videoId) return;

    setLoading(true);
    const { data } = await getVideoById(videoId);

    setVideo(prev => {
      if (!prev || prev?.id !== data?.id) {
        // New video → trust backend
        return data;
      }

      // Same video → protect viewCount
      return {
        ...data,
        viewCount: Math.max(
          prev?.viewCount ?? 0,
          data?.viewCount ?? 0
        ),
      };
    });

    setLoading(false);
  }

  /* --------------------------------------------
   * INITIAL LOAD + REALTIME UPDATES
   * ------------------------------------------ */
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
          setVideo((prev:any) => {
            if (!prev || prev.id !== payload.new.id) {
              return payload.new;
            }

            return {
              ...prev,
              ...payload.new,
              viewCount: Math.max(
                prev.viewCount ?? 0,
                payload.new.viewCount ?? 0
              ),
              profiles: prev.profiles,
            };
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [videoId]);

  /* --------------------------------------------
   * VIEW COUNT INCREMENT (ONCE PER SESSION)
   * ------------------------------------------ */
  useEffect(() => {
    if (!videoId) return;

    const key = `viewed-${videoId}`;
    if (sessionStorage.getItem(key)) return;

    sessionStorage.setItem(key, "true");

    // Toast: loading
    viewToastRef.current = toast.loading("Updating view count...");

    // Optimistic UI update
    setVideo((prev:any) =>
      prev
        ? { ...prev, viewCount: (prev?.viewCount ?? 0) + 1 }
        : prev
    );

    incrementView(videoId)
      .then(() => {
        toast.success("View count updated successfully!", {
          id: viewToastRef?.current ?? undefined,
        });
      })
      .catch(() => {
        toast.error("Failed to update view count", {
          id: viewToastRef?.current ?? undefined,
        });
      });
  }, [videoId]);

  return {
    video,
    loading,
    refetchVideo: fetchVideo,
  };
}

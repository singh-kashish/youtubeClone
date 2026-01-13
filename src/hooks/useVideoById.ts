import { useRouter } from "next/router";
import { useState } from "react";
import { getVideoById } from "../supabase/queries";
import { Video } from "../types/db";
import { useSafeEffect } from "./useSafeEffect";

export function useVideoById() {
  const router = useRouter();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);

  useSafeEffect(
    () => {
      if (!router.isReady) return;
      const id = router.query.video_id as string;
      if (!id) return;

      setLoading(true);
      getVideoById(id)
        .then(({ data }) => setVideo(data))
        .finally(() => setLoading(false));
    },
    [router.isReady, router.query.video_id],
    router.isReady
  );

  return { video, loading };
}

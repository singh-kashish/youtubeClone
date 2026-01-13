import { useState } from "react";
import { updateVideo } from "../supabase/mutations";
import { Video } from "../types/db";

export function useEditVideo() {
  const [loading, setLoading] = useState(false);

  async function editVideo(
    videoId: string,
    payload: Partial<Video>
  ) {
    setLoading(true);
    try {
      return await updateVideo(videoId, payload);
    } finally {
      setLoading(false);
    }
  }

  return { editVideo, loading };
}

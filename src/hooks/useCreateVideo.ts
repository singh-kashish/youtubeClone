import { useState } from "react";
import { addVideo } from "../supabase/mutations";
import { Video } from "../types/db";

export function useCreateVideo() {
  const [loading, setLoading] = useState(false);

  async function createVideo(payload: Omit<Video, "created_at">) {
    setLoading(true);
    try {
      return await addVideo(payload);
    } finally {
      setLoading(false);
    }
  }

  return { createVideo, loading };
}

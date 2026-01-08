// src/supabase/queries/videos.ts
import { supabase } from "../../utils/supabase";
export async function getVideosByUserId(userId: string) {
  return supabase
    .from("video")
    .select(`
      id,
      title,
      description,
      videoUrl,
      thumbnailUrl,
      viewCount,
      likes,
      dislikes,
      videoStatus,
      created_at,
      user_id,
      profiles:profiles!video_user_id_fkey (  -- ✅ IMPORTANT
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .eq("user_id", userId);
};

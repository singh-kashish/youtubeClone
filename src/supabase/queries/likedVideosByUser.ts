// src/api/queries/likes.ts
import { supabase } from "../../utils/supabase";

export function getLikedVideosByUserId(userId: string) {
  return supabase
    .from("likedVideos")
    .select(`
      id,
      liked,
      video:video_id (
        id,
        title,
        description,
        thumbnailUrl,
        videoUrl,
        viewCount,
        videoStatus,
        user_id,
        profiles (
          id,
          username,
          full_name,
          avatar_url
        )
      )
    `)
    .eq("user_id", userId)
    .eq("liked", true);
}

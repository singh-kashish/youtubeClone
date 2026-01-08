// src/api/queries/subscriptions.ts
import { supabase } from "../../utils/supabase";

export function getVideosBySubscriptions(userId: string) {
  return supabase
    .from("subscribers")
    .select(`
      subscribed_to_id,
      profiles:profiles!subscribers_subscribed_to_id_fkey (
        id,
        username,
        full_name,
        avatar_url,
        video (
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
          profiles (
            id,
            username,
            full_name,
            avatar_url
          )
        )
      )
    `)
    .eq("user_id", userId);
}


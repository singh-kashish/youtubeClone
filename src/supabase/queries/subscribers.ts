// src/api/queries/subscribers.ts
import { supabase } from "../../utils/supabase";

export function getSubscribedProfiles(userId: string) {
  return supabase
    .from("subscribers")
    .select(`
      id,
      user_id,
      subscribed_to_id,
      profiles!subscribers_subscribed_to_id_fkey (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .eq("user_id", userId);
}

import { supabase } from "../components/utils/supabase";
import { Profile, LoadProfilesResponse, ProfileWithVideos } from "../types/Profile";
import { PostgrestError } from "@supabase/supabase-js";

export const profileService = {
  async fetchProfiles(): Promise<LoadProfilesResponse> {
    const { data, error } = await supabase.from("profiles").select("*");
    return {
      profiles: data ?? null,
      error,
      loading: false,
    };
  },

  async fetchProfileById(id: string): Promise<{ profileWithVideos: ProfileWithVideos | null; error: PostgrestError | null; loading: boolean }> {
    const { data, error } = await supabase.from("profiles")
    .select(`*,video(id, title, description, videoUrl, thumbnailUrl, created_at, user_id, likes, dislikes, videoStatus, viewCount,profiles(avatar_url,full_name,id,username,updated_at))`).eq("id", id).single();
    return {
      profileWithVideos: data ?? null,
      error,
      loading: false,
    };
  },

  async fetchSubscriberCount(user_id: string): Promise<{ count: number | null; error: PostgrestError | null; loading: boolean }> {  
    const { data, error } = await supabase.from("subscribers").select("*", { count: 'exact' }).eq("subscribed_to_id", user_id);
    return {
      count: data?.length ?? null,
      error,
      loading: false,
    };
  },

  async fetchProfilesByName(name: string): Promise<LoadProfilesResponse> {
    const { data, error } = await supabase.from("profiles").select("*").ilike("full_name", `%${name}%`);
    return {
      profiles: data ?? null,
      error,
      loading: false,
    };
  },
};

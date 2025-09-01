import { supabase } from "../components/utils/supabase";
import { LikedVideo } from "../types/VideoLoadTypes";
import { PostgrestError } from "@supabase/supabase-js";

export const likedVideosService = {
  async getLikedVideo(user_id: string, video_id: string): Promise<{ likedVideo: LikedVideo | null; error: PostgrestError | null; loading: boolean }> {
    const { data, error } = await supabase
      .from("likedVideos")
      .select("*")
      .eq("user_id", user_id)
      .eq("video_id", video_id)
      .single();

    return {
      likedVideo: data ?? null,
      error,
      loading: false,
    };
  },

  async updateLikedVideo(data: Omit<LikedVideo, "id" | "created_at">): Promise<{ error: PostgrestError | null }> {
    // Delete existing row
    await supabase.from("likedVideos").delete().match({ user_id: data.user_id, video_id: data.video_id });

    // Insert new row
    const { error } = await supabase.from("likedVideos").insert([data]);
    return { error };
  },

  async deleteLikedVideo(id: string): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase.from("likedVideos").delete().eq("id", id);
    return { error };
  },
};

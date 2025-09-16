// src/modules/videoService.ts
import { supabase } from "../components/utils/supabase";
import { Video, LoadVideoResponse, LoadVideosResponse, VideoWithProfile } from "../types/VideoLoadTypes";

export const videoService = {
  // Fetch a single video by ID
  async fetchVideoById(id: string): Promise<LoadVideoResponse> {
    const { data, error } = await supabase
      .from("video")
      .select("*, profiles(*), comment(*, profiles(*))")
      .eq("id", id)
      .single(); // `single()` ensures only one result

    return {
      VideoWithProfile: data ? {
        ...data,
        profiles: data.profiles || null, // Ensure profiles are attached, or set to null
      } : null,
      error,
      loading: false,
    };
  },

  // Fetch multiple videos with profiles
  async fetchVideos(orderBy: keyof Video = "created_at", ascending = false): Promise<LoadVideosResponse> {
    const { data, error } = await supabase
      .from("video")
      .select("*, profiles(*)")
      .order(orderBy, { ascending });

    return {
      video: data ? data.map((video) => ({
        ...video,
        profiles: video.profiles || null, // Adding profiles to each video item
      })) : null,
      error,
      loading: false,
    };
  },
  // Fetch video by uploader id
  async fetchVideosByUploaderId(orderBy: keyof Video = "created_at", ascending = true,user_id:string): Promise<LoadVideosResponse>{
    const {data, error} = await supabase
    .from("video")
    .select("*, profiles(*)")
    .eq(user_id, user_id);
    
    return {
      video: data ? data.map((video) => ({
        ...video,
        profiles: video.profiles || null, // Adding profiles to each video item
      })) : null,
      error,
      loading: false,
    };
    
}
};

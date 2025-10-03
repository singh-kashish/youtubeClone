// src/modules/videoService.ts
import { supabase } from "../components/utils/supabase";
import {
  Video,
  LoadVideoResponse,
  LoadVideosResponse,
  VideoInsertInput,
  VideoUpdateInput,
  SupabaseOpResult,
} from "../types/UnifiedVideoTypes";

export const videoService = {
  async fetchVideoById(id: string): Promise<LoadVideoResponse> {
    try {
      const { data, error } = await supabase
        .from("video")
        .select("*, profiles(*), comment(*, profiles(*))")
        .eq("id", id)
        .single();
      return {
        VideoWithProfile: data
          ? { ...(data as any), profiles: (data as any).profiles || null, comment: (data as any).comment || null }
          : null,
        error,
        loading: false,
      };
    } catch (error: any) {
      return { VideoWithProfile: null, error, loading: false };
    }
  },

  async fetchVideos(orderBy: keyof Video = "created_at", ascending = false): Promise<LoadVideosResponse> {
    try {
      const { data, error } = await supabase
        .from("video")
        .select("*, profiles(*)")
        .order(ascending?"asc":"desc");
      return {
        video: data ? data.map((v: any) => ({ ...v, profiles: v.profiles || null })) : null,
        error,
        loading: false,
      };
    } catch (error: any) {
      return { video: null, error, loading: false };
    }
  },

  async fetchVideosByUploaderId(user_id: string, orderBy: keyof Video = "created_at", ascending = true): Promise<LoadVideosResponse> {
    try {
      const { data, error } = await supabase
        .from("video")
        .select("*, profiles(*)")
        .eq("user_id", user_id) // FIXED
        .order(ascending ? "asc" : "desc");
      return {
        video: data ? data.map((v: any) => ({ ...v, profiles: v.profiles || null })) : null,
        error,
        loading: false,
      };
    } catch (error: any) {
      return { video: null, error, loading: false };
    }
  },

  async addVideo(payload: VideoInsertInput): Promise<SupabaseOpResult<Video>> {
    try {
      const toInsert = {
        title: payload.title,
        user_id: payload.user_id,
        description: payload.description ?? null,
        videoUrl: payload.videoUrl ?? null,
        thumbnailUrl: payload.thumbnailUrl ?? null,
        videoStatus: payload.videoStatus,
        likes: payload.likes ?? 0,
        dislikes: payload.dislikes ?? 0,
        viewCount: payload.viewCount ?? 0,
        created_at: payload.created_at ?? null, // include client timestamp if provided
      };
      const { data, error } = await supabase.from("video").insert([toInsert]).select().single();
      return { data: (data as Video) ?? null, error };
    } catch (error: any) {
      return { data: null, error };
    }
  },

  async updateVideo(payload: VideoUpdateInput): Promise<SupabaseOpResult<Video>> {
    try {
      const { id, ...fields } = payload;
      const { data, error } = await supabase.from("video").update(fields).eq("id", id).select().single();
      return { data: (data as Video) ?? null, error };
    } catch (error: any) {
      return { data: null, error };
    }
  },
};

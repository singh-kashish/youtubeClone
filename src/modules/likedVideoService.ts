// src/modules/likedVideosService.ts
import { supabase } from "../components/utils/supabase";
import { LikedVideo, LikedVideoWithVideo } from "../types/VideoLoadTypes";
import { PostgrestError } from "@supabase/supabase-js";

type ServiceResult<T> = {
  data: T | null;
  error: PostgrestError | null;
  loading: boolean;
};

export const likedVideosService = {
  async getLikedVideo(
    user_id: string,
    video_id: string
  ): Promise<ServiceResult<LikedVideoWithVideo>> {
    try {
      const { data, error } = await supabase
        .from("likedVideos")
        .select("*, video(*)")
        .eq("user_id", user_id)
        .eq("video_id", video_id)
        .single();

      return {
        data: (data as LikedVideoWithVideo) ?? null,
        error,
        loading: false,
      };
    } catch (err) {
      return {
        data: null,
        error: {
          message: (err as Error)?.message || "Unknown error",
          details: "",
          hint: "",
          code: "unknown",
        },
        loading: false,
      };
    }
  },

  async getLikedVideos(
    user_id: string
  ): Promise<ServiceResult<LikedVideoWithVideo[]>> {
    try {
      const { data, error } = await supabase
        .from("likedVideos")
        .select("*, video(*,profiles(*))")
        .eq("user_id", user_id);

      return {
        data: (data as LikedVideoWithVideo[]) ?? [],
        error,
        loading: false,
      };
    } catch (err) {
      return {
        data: null,
        error: {
          message: (err as Error)?.message || "Unknown error",
          details: "",
          hint: "",
          code: "unknown",
        },
        loading: false,
      };
    }
  },

  // Keeps your semantics (delete then insert). If your table has a unique constraint on (user_id, video_id),
  // consider using upsertLikedVideo instead for atomic behavior.
  async updateLikedVideo(
    payload: Omit<LikedVideo, "id" | "created_at">
  ): Promise<{ error: PostgrestError | null }> {
    try {
      const del = await supabase
        .from("likedVideos")
        .delete()
        .match({ user_id: payload.user_id, video_id: payload.video_id });

      if (del.error) {
        return { error: del.error };
      }

      const { error } = await supabase.from("likedVideos").insert([payload]);
      return { error: error ?? null };
    } catch (err) {
      return {
        error: {
          message: (err as Error)?.message || "Unknown error",
          details: "",
          hint: "",
          code: "unknown",
        },
      };
    }
  },

  // Safer alternative if you have a unique constraint on (user_id, video_id)
  async upsertLikedVideo(
    payload: Omit<LikedVideo, "id" | "created_at">
  ): Promise<{ error: PostgrestError | null }> {
    try {
      const { error } = await supabase
        .from("likedVideos")
        .upsert(payload, {
          onConflict: "user_id,video_id",
          ignoreDuplicates: false,
        });
      return { error: error ?? null };
    } catch (err) {
      return {
        error: {
          message: (err as Error)?.message || "Unknown error",
          details: "",
          hint: "",
          code: "unknown",
        },
      };
    }
  },

  async deleteLikedVideo(id: string): Promise<{ error: PostgrestError | null }> {
    try {
      const { error } = await supabase.from("likedVideos").delete().eq("id", id);
      return { error: error ?? null };
    } catch (err) {
      return {
        error: {
          message: (err as Error)?.message || "Unknown error",
          details: "",
          hint: "",
          code: "unknown",
        },
      };
    }
  },
};

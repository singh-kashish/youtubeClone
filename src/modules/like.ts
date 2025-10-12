// src/modules/like.ts

import { supabase } from "../components/utils/supabase";
import { LikedVideo } from "../types/VideoLoadTypes";

/**
 * Get likes rows by video id
 */
export const getLikesByVideo = async (videoId: string): Promise<LikedVideo[]> => {
  const { data, error } = await supabase
    .from("likedVideos")
    .select("*")
    .eq("video_id", videoId);
  if (error) throw error;
  return data ?? [];
};

/**
 * Add like/dislike; returns inserted row id
 */
export const addLikeOnVideo = async (dto: {
  video_id: string;
  user_id: string;
  liked: boolean;
}): Promise<{ id: string }> => {
  const { data, error } = await supabase
    .from("likedVideos")
    .insert([dto])
    .select("id")
    .single();
  if (error) throw error;
  return data as { id: string };
};

/**
 * Modify like/dislike by row id
 */
export const modifyLikeOnVideo = async (
  id: string,
  isLike: boolean
): Promise<LikedVideo> => {
  const { data, error } = await supabase
    .from("likedVideos")
    .update({ liked: isLike })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as LikedVideo;
};

/**
 * Remove like/dislike by row id
 */
export const removeLikeOnVideo = async (id: string): Promise<{ id: string }> => {
  const { data, error } = await supabase
    .from("likedVideos")
    .delete()
    .eq("id", id)
    .select("id")
    .single();
  if (error) {
    throw error;
  }
  return data as { id: string };
};

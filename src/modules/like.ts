// // src/modules/like.ts
// import { supabase } from "../components/utils/supabase";

// type LikedVideoRow = {
//   id: string;
//   user_id: string | null;
//   liked: boolean | null;
// };

// export async function addLikeOnVideo(like: { video_id: string; user_id: string; liked: boolean }) {
//   const { data, error } = await supabase
//     .from("likedVideos")
//     .insert([like])
//     .select()
//     .single();
//   if (error) throw error;
//   return data as { id: string; user_id: string | null; video_id: string | null; liked: boolean | null };
// }

// export async function removeLikeOnVideo(id: string) {
//   const { data, error } = await supabase
//     .from("likedVideos")
//     .delete()
//     .eq("id", id)
//     .select()
//     .single();
//   if (error) throw error;
//   return data as LikedVideoRow;
// }

// export async function modifyLikeOnVideo(id: string, liked: boolean) {
//   const { data, error } = await supabase
//     .from("likedVideos")
//     .update({ liked })
//     .eq("id", id)
//     .select()
//     .single();
//   if (error) throw error;
//   return data as LikedVideoRow;
// }

// export async function getLikesByVideo(videoId: string) {
//   const { data, error } = await supabase
//     .from("likedVideos")
//     .select("id, user_id, liked")
//     .eq("video_id", videoId);
//   if (error) throw error;
//   return (data ?? []) as LikedVideoRow[];
// }

// src/services/likedVideoService.ts
// import { supabase } from "../components/utils/supabase";
// import { LoadLikedVideoResponse, LikedVideo } from "../types/VideoLoadTypes";

// export const likedVideoService = {
//   async fetchLikedVideo(userId: string, videoId: string): Promise<LoadLikedVideoResponse> {
//     const { data, error } = await supabase
//       .from("likedVideos")
//       .select("*")
//       .eq("user_id", userId)
//       .eq("video_id", videoId)
//       .single();

//     return {
//       video: data as LikedVideo | null,
//       error,
//       loading: false,
//     };
//   },

//   async likeVideo(userId: string, videoId: string, liked: boolean): Promise<{ likedVideo: LikedVideo | null; error: any }> {
//     const { data, error } = await supabase.from("likedVideos").upsert({
//       user_id: userId,
//       video_id: videoId,
//       liked,
//     }, { onConflict: ["user_id", "video_id"] });

//     return {
//       likedVideo: data?.[0] ?? null,
//       error,
//     };
//   },
// };

import toast from "react-hot-toast";
import { supabase } from "../components/utils/supabase";
import { LikedVideo } from "../types/VideoLoadTypes";
import { PostgrestError } from "@supabase/supabase-js";

export const getLikesByVideo = async (videoId: string): Promise<LikedVideo[]> => {
  const { data, error } = await supabase.from("likedVideos").select("*").eq("video_id", videoId);
  if (error) throw error;
  return data ?? [];
};

export const addLikeOnVideo = async (dto: { 'video_id': string; 'user_id': string; 'liked': boolean }): Promise<LikedVideo> => {
  const { data, error } = await supabase.from("likedVideos").insert([dto]).select('id').single();
  if (error) throw error;
  return data as string & LikedVideo;
};

export const modifyLikeOnVideo = async (id: string, isLike: boolean): Promise<LikedVideo> => {
  const { data, error } = await supabase.from("likedVideos").update({ liked: isLike }).eq("id", id).single();
  if (error) throw error;
  return data;
};
export const removeLikeOnVideo = async (id: string): Promise<LikedVideo> => {
  const { data, error } = await supabase.from("likedVideos").delete().eq("id", id).single();
  if (error){ throw error; }
  return data;
};
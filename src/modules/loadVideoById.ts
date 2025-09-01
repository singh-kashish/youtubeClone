// // src/modules/video.ts
// import { supabase } from "../components/utils/supabase";
// import { TablesInsert, TablesUpdate } from "../../lib/database.types";
// import { VideoWithProfile, LoadVideoResponse } from "../types/VideoLoadTypes";
// import { PostgrestError } from "@supabase/supabase-js";

// export async function loadVideoById(video_id: string): Promise<LoadVideoResponse> {
//   try {
//     const { data, error } = await supabase
//       .from("video")
//       .select(`
//         id,
//         created_at,
//         description,
//         dislikes,
//         likes,
//         thumbnailUrl,
//         title,
//         videoStatus,
//         videoUrl,
//         viewCount,
//         user_id,
//         profiles (
//           id,
//           username,
//           avatar_url,
//           full_name,
//           updated_at
//         ),
//         comment (
//           *,
//           profiles (
//             id,
//             username,
//             avatar_url,
//             full_name,
//             updated_at
//           ),
//           likedComments (
//             id,
//             user_id,
//             like
//           )
//         )
//       `)
//       .eq("id", video_id)
//       .single();

//     if (error || !data) {
//       return { VideoWithProfile: null, loading: false, error };
//     }
//     return { VideoWithProfile: data as VideoWithProfile, loading: false, error: null };
//   } catch (error: any) {
//     return { VideoWithProfile: null, loading: false, error: { message: error.message } as PostgrestError };
//   }
// }

// export async function incrementVideoViewCount(video_id: string, currentViewCount: number) {
//   const { error } = await supabase
//     .from("video")
//     .update({ viewCount: currentViewCount + 1 })
//     .eq("id", video_id);
//   if (error) throw error;
// }

// export async function addVideo(video: TablesInsert<"video">) {
//   const { data, error } = await supabase
//     .from("video")
//     .insert([video])
//     .select()
//     .single();
//   if (error) throw error;
//   return data;
// }

// export async function updateVideo(id: string, updates: TablesUpdate<"video">) {
//   const { data, error } = await supabase
//     .from("video")
//     .update(updates)
//     .eq("id", id)
//     .select()
//     .single();
//   if (error) throw error;
//   return data;
// }

// chatgpt code below:-
// import { supabase } from "../components/utils/supabase";
// import { Video, VideoWithProfile, LoadVideosResponse, LoadVideoResponse } from "../types/VideoLoadTypes";

// export const loadVideoById = {
//   // Fetch multiple videos with profiles
//   async fetchVideos(orderBy: keyof Video = "created_at", ascending = false): Promise<LoadVideosResponse> {
//     const { data, error } = await supabase
//       .from("video")
//       .select(`
//         *,
//         profiles:profiles!video_user_id_fkey (*)
//       `)
//       .order(orderBy, { ascending });

//     return {
//       video: data as (Video & { profiles: VideoWithProfile["profiles"] })[] | null,
//       error,
//       loading: false,
//     };
//   },

//   // Fetch single video with profile and comments (and their profiles)
//   async fetchVideoById(id: string): Promise<LoadVideoResponse> {
//     const { data, error } = await supabase
//       .from("video")
//       .select(`
//         *,
//         profiles:profiles!video_user_id_fkey (*),
//         comment:comment (
//           *,
//           profiles:profiles!comment_user_id_fkey (*)
//         )
//       `)
//       .eq("id", id)
//       .single();

//     return {
//       VideoWithProfile: data as VideoWithProfile | null,
//       error,
//       loading: false,
//     };
//   },
// };
//src/modules/videoService.ts
// import { supabase } from "../components/utils/supabase";
// import { Video, LoadVideoResponse, VideoWithProfile } from "../types/VideoLoadTypes";

// export const videoService = {
//   async fetchVideos(orderBy: keyof Video = "created_at", ascending = false): Promise<LoadVideoResponse> {
//     const { data, error } = await supabase
//       .from("video")
//       .select("*, profiles(*)")
//       .order(orderBy, { ascending });
//     return {
//      data as (Video & { profiles: any })[] | null,
//       error,
//       loading: false,
//     };
//   },

//   async fetchVideoById(id: string): Promise<LoadVideoResponse> {
//     const { data, error } = await supabase
//       .from("video")
//       .select("*, profiles(*), comment(*, profiles(*))")
//       .eq("id", id)
//       .single();

//     return {
//       VideoWithProfile: data as VideoWithProfile | null,
//       error,
//       loading: false,
//     };
//   },
// };

// src/modules/video.ts
import { supabase } from "../components/utils/supabase";
import { TablesInsert, TablesUpdate } from "../../lib/database.types";
import { VideoWithProfile, LoadVideoResponse } from "../types/VideoLoadTypes";
import { PostgrestError } from "@supabase/supabase-js";

export async function loadVideoById(video_id: string): Promise<LoadVideoResponse> {
  try {
    const { data, error } = await supabase
      .from("video")
      .select(`
        id,
        created_at,
        description,
        dislikes,
        likes,
        thumbnailUrl,
        title,
        videoStatus,
        videoUrl,
        viewCount,
        user_id,
        profiles (id, username, avatar_url, full_name, updated_at),
        comment (
          *,
          profiles (id, username, avatar_url, full_name, updated_at),
          likedComments (*)
        )
      `)
      .eq("id", video_id)
      .single();

    if (error || !data) {
      return { VideoWithProfile: null, loading: false, error: error ?? { message: "Error fetching video" } as PostgrestError };
    }

    return { VideoWithProfile: data as VideoWithProfile, loading: false, error: null };
  } catch (error: any) {
    return { VideoWithProfile: null, loading: false, error: { message: error.message } as PostgrestError };
  }
}

export async function incrementVideoViewCount(video_id: string, currentViewCount: number) {
  const { error } = await supabase
    .from("video")
    .update({ viewCount: currentViewCount + 1 })
    .eq("id", video_id);

  if (error) throw error;
}

export async function addVideo(video: TablesInsert<"video">) {
  const { data, error } = await supabase
    .from("video")
    .insert([video])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateVideo(id: string, updates: TablesUpdate<"video">) {
  const { data, error } = await supabase
    .from("video")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

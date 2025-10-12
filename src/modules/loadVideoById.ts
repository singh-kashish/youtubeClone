// src/modules/loadVideoById.ts

import { supabase } from "../components/utils/supabase";
import { VideoWithProfile } from "../types/VideoLoadTypes";
import { PostgrestError } from "@supabase/supabase-js";
import { LoadVideoResponse } from "../types/VideoLoadTypes";
import {
  LoadVideoByIdResponse,
  VideoWithProfileAndComments,
} from "../types/models";
/**
 * Fetch single video by id with nested profile and comments (including likedComments)
 */
// src/modules/loadVideoById.ts


export async function loadVideoById(video_id: string): Promise<LoadVideoByIdResponse> {
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
        profiles (
          id,
          username,
          avatar_url,
          full_name,
          updated_at
        ),
        comment (
          id,
          text,
          created_at,
          user_id,
          video_id,
          likeCount,
          dislikeCount,
          profiles (
            id,
            username,
            avatar_url,
            full_name,
            updated_at
          )
        )
      `)
      .eq("id", video_id)
      .single();

    if (error || !data) {
      return {
        VideoWithProfile: null,
        loading: false,
        error: error ?? ({ message: "Error fetching video" } as PostgrestError),
      };
    }

    return {
      VideoWithProfile: data as VideoWithProfileAndComments,
      loading: false,
      error: null,
    };
  } catch (e: any) {
    return {
      VideoWithProfile: null,
      loading: false,
      error: { message: e?.message ?? "Unknown error" } as PostgrestError,
    };
  }
}


export async function incrementVideoViewCount(
  video_id: string,
  currentViewCount: number
) {
  const { error } = await supabase
    .from("video")
    .update({ viewCount: (currentViewCount ?? 0) + 1 })
    .eq("id", video_id);

  if (error) throw error;
}

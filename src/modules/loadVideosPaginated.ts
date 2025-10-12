// src/modules/loadVideosPaginated.ts

import { supabase } from "../components/utils/supabase";
import {
  LoadVideosResponse,
  typeOfList,
  VideoWithProfileAndCommentsWithProfiles,
} from "../types/models";
import { PostgrestError } from "@supabase/supabase-js";

/**
 * Paginated video loader
 * Uses PostgREST select syntax and returns properly typed arrays.
 */
export async function loadVideosPaginated({
  index,
  offset,
  order,
  displayListType,
}: {
  index: number;
  offset: number;
  order: boolean;
  displayListType: typeOfList;
}): Promise<LoadVideosResponse> {
  try {
    // Build select with nested joins using PostgREST column syntax
    const { data, error, status } = await supabase
      .from("video")
      .select(
        `
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
          full_name,
          avatar_url,
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
            full_name,
            avatar_url,
            updated_at
          )
        )
      `
      )
      .order(displayListType, { nullsFirst: false, ascending: order })
      .range(index, offset);

    if (error || status !== 200) {
      return {
        video: null,
        loading: false,
        error: error ?? ({ message: "Error fetching videos" } as PostgrestError),
      };
    }

    // Supabase returns data as any[] matching our shape; assert the type safely
    const video = (data ?? []) as VideoWithProfileAndCommentsWithProfiles[];

    // Optional: console for debugging
    // console.log("Paginated videos:", video);

    return { video, loading: false, error: null };
  } catch (e: any) {
    return {
      video: null,
      loading: false,
      error: { message: e?.message ?? "Unknown error" } as PostgrestError,
    };
  }
}

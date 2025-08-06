import { supabase } from "../components/utils/supabase";
import { LoadVideoResponse, VideoWithProfile } from "../types/VideoLoadTypes";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export async function loadVideoById(video_id: string): Promise<LoadVideoResponse> {
  try {
    console.log("Loading video with ID:", video_id);
    const { error, data, status } = await supabase
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
          avatar_url,
          full_name
        ),
        comment (
          id,
          text,
          created_at,
          user_id,
          likeCount,
          dislikeCount,
          profiles (
            id,
            username,
            avatar_url
          ),
          likedComments (
            id,
            user_id,
            like
          )
        ),
        likedVideos (
          id,
          user_id,
          liked
        )
        `
      )
      .eq("id", video_id)
      .single();

    if (error || status !== 200) {
      console.error("Error loading video:", error);
      return { VideoWithProfile: null, loading: false, error };
    }

    console.log("Fetched video:", data);
    return { VideoWithProfile: data as VideoWithProfile, loading: false, error: null };
  } catch (error: unknown) {
    console.error("Unexpected error loading video:", error);
    return { VideoWithProfile: null, loading: false, error: { message: (error as Error).message } as any };
  }
}


// Get the current user's ID from Supabase Auth
// const {
//   data: { user },
//   error: authError
// } = await supabase.auth.getUser();

// if (authError) throw authError;
// const currentUserId = user.id;

// // 1️⃣ Primary query: fetch video + all nested data
// const { data: videoData, error: videoError } = await supabase
//   .from("video")
//   .select(`
    
//   `)
//   .eq("id", video_id)
//   .single();

// if (videoError) throw videoError;

// 2️⃣ Separate query: check if current user subscribed to uploader
// const { data: subscriptionData, error: subscriptionError } = await supabase
//   .from("subscribers")
//   .select("id")
//   .eq("user_id", currentUserId)
//   .eq("subscribed_to_id", videoData.user_id)
//   .maybeSingle();

// if (subscriptionError) throw subscriptionError;

// // 🔍 Add `isSubscribed` field to final result
// videoData.isSubscribed = Boolean(subscriptionData);

// // 🔄 Optional post-processing: flatten likes on frontend
// videoData.userHasLiked = videoData.likedVideos?.some(
//   lv => lv.user_id === currentUserId && lv.liked === true
// );
// videoData.userHasDisliked = videoData.likedV

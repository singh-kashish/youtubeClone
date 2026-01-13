import { supabase } from "../utils/supabase";
import { VideoInsert, VideoRow, VideoWithProfile } from "../types/db";
/* ---------------------------------- VIDEOS ---------------------------------- */

/* ---------------------------------- CREATE --------------------------------- */

export async function addVideo(payload: VideoInsert) {
  const { data, error } = await supabase
    .from("video")
    .insert(payload)
    .select("*")
    .single<VideoRow>();

  if (error) throw error;
  return data;
}

/* ---------------------------------- UPDATE --------------------------------- */

export async function updateVideo(
  id: string,
  payload: Partial<VideoInsert>
) {
  const { data, error } = await supabase
    .from("video")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single<VideoRow>();

  if (error) throw error;
  return data;
}

/* ----------------------------------- READ ---------------------------------- */

export async function getVideoByIdForUpload(videoId: string) {
  const { data, error } = await supabase
    .from("video")
    .select(
      `
      *,
      profiles (
        id,
        username,
        avatar_url
      )
    `
    )
    .eq("id", videoId)
    .single<VideoWithProfile>();

  if (error) throw error;
  return data;
}


export async function getVideos() {
  return supabase
    .from("video")
    .select(`
      id,
      title,
      description,
      videoUrl,
      thumbnailUrl,
      viewCount,
      likes,
      dislikes,
      videoStatus,
      created_at,
      user_id,
      profiles:profiles!video_user_id_fkey (
        id,
        username,
        full_name,
        avatar_url
        )
    `)
    .eq("videoStatus", true);
}

export async function getVideoById(videoId: string) {
  return supabase
    .from("video")
    .select(`
      id,
      title,
      description,
      videoUrl,
      thumbnailUrl,
      viewCount,
      likes,
      dislikes,
      videoStatus,
      created_at,
      user_id,
      profiles (
        id,
        username,
        full_name,
        avatar_url
      ),
      comment (
        *,
        profiles (
          id,
          username,
          avatar_url
        )
      )
    `)
    .eq("id", videoId)
    .single();
}

export async function getVideosByUserId(userId:string){
  return supabase.
      from("video")
      .select(`
          id,
          title,
          description,
          videoUrl,
          thumbnailUrl,
          viewCount,
          likes,
          dislikes,
          videoStatus,
          created_at,
          user_id,
          profiles:profiles!video_user_id_fkey (
            id,
            username,
            full_name,
            avatar_url
          )
        `).
        eq("user_id",userId);  
}

/* -------------------------------- COMMENTS -------------------------------- */

export async function getLikedCommentsByCommentId(commentId: string) {
  return supabase
    .from("likedComments")
    .select("id, like, user_id, comment_id")
    .eq("comment_id", commentId);
}

/* ---------------------------------- LIKES ---------------------------------- */

export async function getLikedVideosByVideoId(videoId: string) {
  return supabase
    .from("likedVideos")
    .select("id, liked, user_id, video_id")
    .eq("video_id", videoId);
}


export async function getLikedVideosByUserId(userId: string) {
  return supabase
    .from("likedVideos")
    .select(`
      liked,
      video_id,
      user_id,
      video (
        id,
        title,
        description,
        thumbnailUrl,
        videoUrl,
        viewCount,
        videoStatus,
        user_id,
        profiles (
          id,
          username,
          full_name,
          avatar_url
        )
      )
    `)
    .eq("user_id", userId);
}

/* -------------------------------- PROFILES -------------------------------- */
// Subscribers is array of profiles which have subscribed to profile userId
export async function getProfileById(userId: string) {
  return supabase
    .from("profiles")
    .select(`
      id,
      username,
      full_name,
      avatar_url,
      subscribers!subscribers_subscribed_to_id_fkey (
        id,
        user_id,
        subscribed_to_id
      ),
      video (
        id,
        title,
        description,
        videoUrl,
        thumbnailUrl,
        viewCount,
        videoStatus,
        created_at,
        profiles (
          id,
          username,
          avatar_url
        )
      )
    `)
    .eq("id", userId)
    .single();
}

export async function searchProfiles(text: string) {
  return supabase
    .from("profiles")
    .select(`
      id,
      username,
      full_name,
      avatar_url,
      subscribers (
        id,
        user_id,
        subscribed_to_id
      )
    `)
    .ilike("username", `%${text}%`);
}

export async function searchVideos(text: string) {
  return supabase
    .from("video")
    .select(`
      id,
      title,
      description,
      thumbnailUrl,
      videoUrl,
      viewCount,
      videoStatus,
      created_at,
      profiles (
        id,
        username,
        avatar_url,
        full_name
      )
    `)
    .ilike("title", `%${text}%`);
}

/* ------------------------------- SUBSCRIBERS ------------------------------- */

export async function getSubscribersByUserId(userId: string) {
  return supabase
    .from("subscribers")
    .select(`
      id,
      user_id,
      subscribed_to_id,
      profiles!subscribers_subscribed_to_id_fkey (
        id,
        username,
        avatar_url,
        full_name,
        video (
          id,
          title,
          thumbnailUrl,
          viewCount,
          videoUrl,
          videoStatus,
          profiles (
            id,
            username,
            avatar_url
          )
        )
      )
    `)
    .eq("user_id", userId);
}

export async function GetVideoBySubscriptions(userId:string) {
  return supabase.
          from("subscribers").
          select(`
            user_id,
            subscribed_to_id,
            video_user_id_fkey(
              id,
              title,
              description,
              videoUrl,
              thumbnailUrl,
              viewCount,
              likes,
              dislikes,
              videoStatus,
              created_at,
              user_id,
              profiles!subscribers_user_id_fkey (
                id,
                username,
                full_name,
                avatar_url
                )
          `)
          .eq("user_id",userId);
}

// ===== 

// src/types/interfaces.ts

export interface Profile_Icon {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
}

export interface Video_Icon {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string;
  thumbnailUrl: string | null;
  viewCount: number;
  likes: number;
  dislikes: number;
  videoStatus: boolean;
  created_at: string | null;
  user_id: string;
  profiles: Profile_Icon | null;
}


export interface Comment{
    id: string;
    created_at:string;
    text: string;
    video_id: string;
    likeCount: number;
    dislikeCount: number;
    user_id: string;
}
export interface OneVideo extends Video_Icon{
    comment: Array<Comment>;
}

// PROFILE LOAD
/* ===================== PROFILES ===================== */

export interface Profile {
  id: string;
  username: string;
  full_name?: string | null;
  avatar_url?: string | null;
}

/* ===================== SUBSCRIBERS ===================== */

export interface Subscriber {
  id: string;
  user_id: string;
  subscribed_to_id: string;
}

/* ===================== VIDEO ===================== */

export interface Video {
  id: string;
  title: string;
  description?: string | null;
  videoUrl: string;
  thumbnailUrl?: string | null;
  viewCount?: number | null;
  videoStatus: string;
  created_at: string; // ✅ NOT nullable (after your DB fix)

  profiles: Profile | null; // ✅ IMPORTANT: single object, not array
}

/* ===================== PROFILE PAGE PAYLOAD ===================== */

export interface ProfileWithVideos {
  id: string;
  username: string;
  full_name?: string | null;
  avatar_url?: string | null;

  subscribers: Subscriber[];
  video: Video[];
}

/* ===================== LikedVideos ===================== */
export interface likedVideo extends Video_Icon{
  liked: boolean;
} 
export interface likedVideos{[
    data:
]} 
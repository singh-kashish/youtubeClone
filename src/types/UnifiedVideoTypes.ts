// src/types/VideoUnifiedTypes.ts

import { PostgrestError } from "@supabase/supabase-js";

export interface Profile {
  id: string;
  username?: string | null;
  avatar_url?: string | null;
  full_name?: string | null;
  updated_at?: string | null;
  email?: string | null;
}

export interface Comment {
  id: string;
  text: string | null;
  created_at?: string | null;
  user_id: string | null;
  video_id: string | null;
  likeCount: number | null;
  dislikeCount: number | null;
  profiles: Profile | null;
}

export interface Video {
  id: string;
  created_at: string | null;
  description: string | null;
  dislikes: number | null;
  likes: number | null;
  thumbnailUrl: string | null;
  title: string | null;
  user_id: string | null;
  videoStatus: boolean | null;
  videoUrl: string | null;
  viewCount: number | null;
}

export interface VideoWithProfile extends Video {
  profiles?: Profile | null;
  comment?: Comment[] | null;
}

export interface LoadVideoResponse {
  VideoWithProfile: VideoWithProfile | null;
  error: PostgrestError | null;
  loading: boolean;
}

export interface LoadVideosResponse {
  video: (Video & { profiles: Profile | null })[] | null | undefined | [];
  error: PostgrestError | null;
  loading: boolean;
}

// Insert (Step 1) input
export interface VideoInsertInput {
  title: string;
  user_id: string;
  created_at?: string; 
  description?: string | null;
  videoUrl?: string | null;
  thumbnailUrl?: string | null;
  videoStatus: boolean;
  likes?: number | null;
  dislikes?: number | null;
  viewCount?: number | null;
  id?: string; // allow client-side id if you want to set it
}

// Update (Step 2) input
export interface VideoUpdateInput {
  id: string;
  title?: string;
  description?: string | null;
  videoUrl?: string | null;
  thumbnailUrl?: string | null;
  videoStatus?: boolean;
  likes?: number | null;
  dislikes?: number | null;
  viewCount?: number | null;
}

// Generic op result
export interface SupabaseOpResult<T> {
  data: T | null;
  error: PostgrestError | null;
}

// Hook result shape
export interface HookResult<T> {
  data: T | null;
  error: PostgrestError | null;
  loading: boolean;
}

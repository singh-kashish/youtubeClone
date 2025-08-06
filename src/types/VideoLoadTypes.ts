import { Database } from "../../lib/database.types";
import { PostgrestError } from "@supabase/supabase-js";

// Type for video data (base columns from the video table)
export type Video = Database['public']['Tables']['video']['Row'];

// Type for profile data
export type Profile = Database['public']['Tables']['profiles']['Row'] & {
  subscribersUsingSubscribers_subscribed_to_id_fkey?: Array<{
    id: string;
    user_id: string;
  }>;
};

// Type for comment data (adjusted to match actual schema)
export type Comment = {
  id: string;
  text: string | null;
  created_at: string | null;
  user_id: string | null;
};

// Type for video with related profile and comment data
export type VideoWithProfile = Video & {
  profiles: Profile | null;
  comment: Comment[] | null;
};

// Defining the types for listType
export type typeOfList =
  | "created_at"
  | "id"
  | "user_id"
  | "description"
  | "dislikes"
  | "likes"
  | "thumbnailUrl"
  | "title"
  | "videoStatus"
  | "videoUrl"
  | "viewCount";

// Defining the response type for video loading
export interface LoadVideosResponse {
  video: (Video & { profiles: Profile | null })[] | null | undefined | [];
  error: PostgrestError | null;
  loading: boolean;
}

export interface LoadVideoResponse {
  VideoWithProfile: VideoWithProfile | null;
  error: PostgrestError | null;
  loading: boolean;
}
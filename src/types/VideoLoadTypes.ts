import { Database } from "../../lib/database.types";
import { PostgrestError } from "@supabase/supabase-js";

// Type for video data
type Video = Database['public']['Tables']['video']['Row']; 

// Type for profile data
type Profile = Database['public']['Tables']['profiles']['Row']; 

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
  video: (Video & { profiles: Profile | null })[] | null | undefined | []; // List of videos or null
  error: PostgrestError | null;  // Possible error from Supabase
  loading: boolean;  // State indicating if videos are still being fetched
}

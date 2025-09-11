
import { Database } from "../../lib/database.types";
import { PostgrestError } from "@supabase/supabase-js";

export interface LoadProfilesResponse {
  profiles: Profile[] | null;
  error: PostgrestError | null;
  loading: boolean;
}

export interface LoadProfileResponse {
  profile: Profile | null;
  error: PostgrestError | null;
  loading: boolean;
}

export interface Profile {
    avatar_url: string | null;
    full_name: string | null;
    id: string;
    updated_at: string | null;
    username: string | null;
}
export interface ProfileWithVideos extends Profile {
    video?: Array<{
        id: string;
        title: string | null;
        description: string | null;
        videoUrl: string | null;
        thumbnailUrl: string | null;
        created_at: string | null;
        user_id: string | null;
    }>;
  };
export interface LoadProfilesResponse {
  profiles: Profile[] | null;
  error: PostgrestError | null;
  loading: boolean;
}

// src/types/models.ts
import { PostgrestError } from "@supabase/supabase-js";

export interface Profile {
    id: string;
    username: string|null;
    full_name?: string|null;
    avatar_url?: string|null;
    updated_at?: string|null;
  }
  
  export interface VideoWithProfileAndCommentsWithProfiles extends Video {
    profiles?: Profile;
    comment?: CommentWithProfile[];
  }
  
  export interface CommentWithProfile {
    id: string;
    content: string|null;
    created_at: string|null;
    user_id: string|null;
    video_id: string|null;
    profiles?: Profile|null;
  }
  
  export interface LikeRow {
    id: string;
    video_id: string;
    user_id: string;
    liked: boolean;
  }
  
  export interface Subscriber {
    id: string;
    user_id: string| null;
    subscribed_to_id: string| null;
    created_at?: string|null;
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

export type VideosWithProfile = VideoWithProfileAndCommentsWithProfiles[];

export interface Comment {
  id: string;
  text: string | null;
  created_at: string | null;
  user_id: string | null;
  video_id: string | null;
  likeCount: number | null;
  dislikeCount: number | null;
  profiles: Profile | null;
}



export interface LoadVideosResponse {
  video: (VideosWithProfile) | null | undefined;
  error: PostgrestError | null;
  loading: boolean;
}

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


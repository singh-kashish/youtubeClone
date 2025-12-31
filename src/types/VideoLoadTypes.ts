import { PostgrestError } from "@supabase/supabase-js";
import { Database } from "../../lib/database.types";
import { VideosWithProfileComments } from "./VideoRedux";
import { Video_Icon } from "./interaces";

 import AllPlaylistsType from "./AllPlaylistsType";

export type typeOfList =
  | "viewCount_desc"
  | "viewCount_asc"
  | "created_at_desc"
  | "created_at_asc"
  | "likes_desc"
  | "id";

export interface LoadVideosResponse {
  loading: boolean;
  video: Video_Icon; // always an array (can be empty)
  error: PostgrestError | null;
}

// types/VideoLoadTypes.ts

export interface LoadVideoResponse {
  VideoWithProfile: VideoWithProfile | null;
  error: PostgrestError | null;
  loading: boolean;
}

export interface LoadVideosResponse {
  video: Video_Icon;
  error: PostgrestError | null;
  loading: boolean;
}

export interface LoadCommentsResponse {
  commentsWithProfile: CommentWithProfile[] | null | undefined | [];
  error: PostgrestError | null;
  loading: boolean;
}
export interface LoadPlaylistsResponse {
  playlists: AllPlaylistsType[] | null;
  error: PostgrestError | null;
  loading: boolean;
}

export interface Video {
  id: string;
  created_at: string | null;
  description: string | null;
  dislikes: number | null;
  likes: number | null;
  thumbnailUrl: string | null;
  title: string | null; // Allowing title to be nullable
  user_id: string | null;
  videoStatus: boolean | null;
  videoUrl: string | null;
  viewCount: number | null;
}

export interface LoadProfilesResponse {
  profiles: Profile[] | null;
  error: PostgrestError | null;
  loading: boolean;
}

export interface LoadLikedCommentResponse {
  comment: LikedComment | null;
  error: PostgrestError | null;
  loading: boolean;
}

export interface LoadLikedVideoResponse {
  likedVideo: LikedVideo | null;
  error: PostgrestError | null;
  loading: boolean;
}

export interface LikedComment {
  id: string;
  comment_id: string;
  user_id: string;
  like: boolean;
 created_at?: string;
}

export interface LikedVideo {
  id: string;
  video_id: string | null;
  user_id: string | null;
  liked: boolean | null;
  created_at?: string | null;
}

export interface VideoWithProfile extends Video {
  profiles: Profile | null;
  comment: Comment[]; // Assuming 'comment' is an array
}

export interface VideoLoadTypes {
  // This can include all possible video-related fields
  id: string;
  title: string;
  description: string;
  viewCount: number;
  videoUrl: string;
  profiles: Profile;
}

// Define Comment type
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

// Define LikedComment type
export interface LikedComment {
  id: string;
  user_id: string;
  comment_id: string;
  like: boolean;
}

// Define CommentWithProfile type
export interface CommentWithProfile {
  id: string;
  text: string;
  created_at: string;
  user_id: string;
  video_id: string;
  likeCount: number;
  dislikeCount: number;

  profiles: {
    id: string;
    username: string;
    full_name: string;
    avatar_url: string;
    updated_at?: string;
  };

  likedComments: {
    id: string;
    user_id: string;
    like: boolean;
  }[];
}


// Profile type
export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  full_name: string | null;
  updated_at: string | null;
  email?: string | null; // Assuming email is required in the Profile
}

/* ---------- Profile ---------- */
export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  full_name: string | null;
  updated_at: string | null;
  email?: string | null;
}

/* ---------- Video ---------- */
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
  profiles: Profile | null;
  commentWithProfile: CommentWithProfile[];
}

export type VideosWithProfile = VideoWithProfile[];

/* ---------- Comments ---------- */
export interface LikedComment {
  id: string;
  comment_id: string;
  user_id: string;
  like: boolean;
  created_at?: string;
}

export interface CommentWithProfile {
  id: string;
  text: string;
  created_at: string;
  user_id: string;
  video_id: string;
  likeCount: number;
  dislikeCount: number;

  profiles: {
    id: string;
    username: string;
    full_name: string;
    avatar_url: string;
    updated_at?: string;
  };

  likedComment: LikedComment[];
}

/* ---------- Generic load responses ---------- */
export interface LoadCommentsResponse {
  commentsWithProfile: CommentWithProfile[] | [] | null | undefined;
  error: PostgrestError | null;
  loading: boolean;
}

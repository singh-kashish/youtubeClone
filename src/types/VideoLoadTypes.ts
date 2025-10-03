import { Database } from "../../lib/database.types";
import { PostgrestError } from "@supabase/supabase-js";
import { Profile, VideoWithProfileAndCommentsWithProfiles } from "./models";
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
export interface CommentWithProfile {
  id: string;
  text: string | null;
  created_at: string | null;
  user_id: string | null;
  video_id: string | null;
  likeCount: number | null;
  dislikeCount: number | null;
  profiles: Profile | null;
  likedComments: LikedComment[] | null;
};

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

export interface LikedVideoWithVideo extends LikedVideo {
  video: Video;
}

export interface VideoWithProfile extends Video {
  profiles: {
    id: string;
    avatar_url: string | null;
    full_name: string | null;
    username: string | null;
    updated_at: string | null;
  } | null;
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
export interface CommentWithProfile extends Comment {
  likedComments: LikedComment[] | null;
}




export interface LoadVideoResponse {
  VideoWithProfile: VideoWithProfile | null;
  error: PostgrestError | null;
  loading: boolean;
}
export interface CommentWithProfileForVideos extends Comment {
  profiles: Profile | null;
}

export interface LoadVideosResponse {
  video: (Video & { profiles: Profile | null } & {comment:CommentWithProfileForVideos[] | []}) | null | undefined | [];
  error: PostgrestError | null;
  loading: boolean;
}

export interface LoadCommentsResponse {
  commentsWithProfile: CommentWithProfile[] | null | undefined | [];
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
export interface CommentWithProfile {
  id: string;
  text: string | null;
  created_at: string | null;
  user_id: string | null;
  video_id: string | null;
  likeCount: number | null;
  dislikeCount: number | null;
  profiles: Profile | null;
  likedComments: LikedComment[] | null;
};

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
export interface CommentWithProfile extends Comment {
  likedComments: LikedComment[] | null;
}



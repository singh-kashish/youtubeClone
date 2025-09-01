// // src/types/VideoLoadTypes.ts
// import { Database } from "../../lib/database.types";
//import { PostgrestError } from "@supabase/supabase-js";

// export type Video = Database['public']['Tables']['video']['Row'];
// export type Profile = Database['public']['Tables']['profiles']['Row'] & {
//   subscribersUsingSubscribers_subscribed_to_id_fkey?: Array<{
//     id: string;
//     user_id: string;
//   }>;
// };
// export type Comment = Database['public']['Tables']['comment']['Row'];
// export type CommentWithProfile = Comment & {
//   profiles: Profile | null;
// }
// export type VideoWithProfile = Video & {
//   profiles: Profile | null;
//   comment: CommentWithProfile[] | null;
// };
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
// export interface LoadVideosResponse {
//   video: (Video & { profiles: Profile | null })[] | null | undefined | [];
//   error: PostgrestError | null;
//   loading: boolean;
// }
// export interface LoadVideoResponse {
//   VideoWithProfile: VideoWithProfile | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }
// export interface LoadCommentsResponse {
//   commentsWithProfile: (Comment & {profile : Profile | null })[] | null | undefined | [];
//   error: PostgrestError | null;
//   loading: boolean;
// }
// export interface LoadProfilesResponse {
//   profiles: Profile[] | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }
// export interface LoadPlaylistsResponse {
//   playlists: any[] | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }
// export interface LoadSubscribersResponse {
//   subscribers: any[] | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }

// src/types/VideoLoadTypes.ts
// import { Database } from "../../lib/database.types";
// import { PostgrestError } from "@supabase/supabase-js";
 import AllPlaylistsType from "./AllPlaylistsType";

// export type Video = Database['public']['Tables']['video']['Row'];
// export type Profile = Database['public']['Tables']['profiles']['Row'] & {
//   subscribersUsingSubscribers_subscribed_to_id_fkey?: Array<{
//     id: string;
//     user_id: string;
//   }>;
// };
// export type Comment = Database['public']['Tables']['comment']['Row'];
// export type CommentWithProfile = Comment & {
//   profiles: Profile | null;
//   likedComments?: LikedComment[];
// } | null;
// export type VideoWithProfile = Video & {
//   profiles: Profile | null;
//   comment: CommentWithProfile[] | null;
// } | null;

// export type typeOfList =
//   | "created_at"
//   | "id"
//   | "user_id"
//   | "description"
//   | "dislikes"
//   | "likes"
//   | "thumbnailUrl"
//   | "title"
//   | "videoStatus"
//   | "videoUrl"
//   | "viewCount";

// export interface LoadVideosResponse {
//   video: (Video & { profiles: Profile | null })[] | null | undefined | [];
//   error: PostgrestError | null;
//   loading: boolean;
// }
// export interface LoadVideoResponse {
//   VideoWithProfile: VideoWithProfile | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }
// export interface LoadCommentsResponse {
//   commentsWithProfile: CommentWithProfile[] | null | undefined | [];
//   error: PostgrestError | null;
//   loading: boolean;
// }
// export interface LoadProfilesResponse {
//   profiles: Profile[] | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }
// export interface LoadPlaylistsResponse {
//   playlists: AllPlaylistsType[] | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }
// export interface LoadSubscribersResponse {
//   subscribers: any[] | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }

// // For comment likes
// export type LikedComment = Database['public']['Tables']['likedComments']['Row'];
// export interface LoadLikedCommentResponse {
//   comment: LikedComment | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }

// chatgpt generated code below:-
// src/types/VideoRedux.ts
// import { Database } from "../../lib/database.types";

// export type Video = Database['public']['Tables']['video']['Row'];
// export type Profile = Database['public']['Tables']['profiles']['Row'];

// export type VideosWithProfile =
//   | Array<Video & { profiles: Profile | null }>
//   | [] 
//   | null;

// export type VideoWithProfile = Video & { profiles: Profile | null };

// export interface CacheData {
//   videos: VideosWithProfile;
//   timestamp: number;
// }

// export interface SuggestedVideoState {
//   videos: Record<typeOfList, VideosWithProfile | null>;
//   cache: Record<string, CacheData>;
//   displayList: typeOfList;
//   currentDisplayListIndex: number;
//   currentDisplayListOffset: number;
// }
// export type LikedComment = Database['public']['Tables']['likedComments']['Row'];
// export type CommentWithProfile = Database['public']['Tables']['comment']['Row'] & {
//   profiles: Profile | null;
//   likedComments: LikedComment[];
// };  
// src/types/VideoLoadTypes.ts
// import { Database } from "../../lib/database.types";
// import { PostgrestError } from "@supabase/supabase-js";
// import AllPlaylistsType from "./AllPlaylistsType";

// export type Video = Database['public']['Tables']['video']['Row'];
// export type Profile = Database['public']['Tables']['profiles']['Row'] & {
//   subscribersUsingSubscribers_subscribed_to_id_fkey?: Array<{
//     id: string;
//     user_id: string;
//   }>;
// };
// export type Comment = Database['public']['Tables']['comment']['Row'];
// export type LikedComment = Database['public']['Tables']['likedComments']['Row'];
// export type LikedVideo = Database['public']['Tables']['likedVideos']['Row'];

// export type CommentWithProfile = Comment & {
//   profiles: Profile | null;
//   likedComments?: LikedComment[];
// } | null;

// export type VideoWithProfile = Video & {
//   profiles: Profile | null;
//   comment: CommentWithProfile[] | null;
// } | null;

// export type typeOfList =
//   | "created_at"
//   | "id"
//   | "user_id"
//   | "description"
//   | "dislikes"
//   | "likes"
//   | "thumbnailUrl"
//   | "title"
//   | "videoStatus"
//   | "videoUrl"
//   | "viewCount";

// types/VideoLoadTypes.ts

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

export interface LoadCommentsResponse {
  commentsWithProfile: CommentWithProfile[] | null | undefined | [];
  error: PostgrestError | null;
  loading: boolean;
}
// export interface LoadProfilesResponse {
//   profiles: Profile[] | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }
export interface LoadPlaylistsResponse {
  playlists: AllPlaylistsType[] | null;
  error: PostgrestError | null;
  loading: boolean;
}
// export interface LoadSubscribersResponse {
//   subscribers: any[] | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }

// // For liked comments
// export interface LoadLikedCommentResponse {
//   comment: LikedComment | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }
// // For liked videos
// export interface LoadLikedVideoResponse {
//   video: LikedVideo | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }

// import { Database } from "../../lib/database.types";
// import { PostgrestError } from "@supabase/supabase-js";

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
// export type Profile = Database['public']['Tables']['profiles']['Row'] & {
//   subscribersUsingSubscribers_subscribed_to_id_fkey?: Array<{
//     id: string;
//     user_id: string;
//   }>;
// };
// export type Comment = Database['public']['Tables']['comment']['Row'];
// export type LikedComment = Database['public']['Tables']['likedComments']['Row'];
// export type LikedVideo = Database['public']['Tables']['likedVideos']['Row'];

// export type CommentWithProfile = Comment & {
//   profiles: Profile | null;
//   likedComments?: LikedComment[];
// } | null;

// export type VideoWithProfile = Video & {
//   profiles: Profile | null;
//   comment: CommentWithProfile[] | null;
// } | null;

// export interface LoadProfilesResponse {
//   profiles: Profile[] | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }

// export interface LoadLikedCommentResponse {
//   comment: LikedComment | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }

// export interface LoadLikedVideoResponse {
//   likedVideo: LikedVideo | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }

import { Database } from "../../lib/database.types";
import { PostgrestError } from "@supabase/supabase-js";

 //export type Video = Database['public']['Tables']['video']['Row'];
// export type Profile = Database['public']['Tables']['profiles']['Row'] & {
//   subscribersUsingSubscribers_subscribed_to_id_fkey?: Array<{
//     id: string;
//     user_id: string;
//   }>;
// };
//export type Comment = Database['public']['Tables']['comment']['Row'];
//export type LikedComment = Database['public']['Tables']['likedComments']['Row'];
//export type LikedVideo = Database['public']['Tables']['likedVideos']['Row'];



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
export interface CommentWithProfile extends Comment {
  likedComments: LikedComment[] | null;
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


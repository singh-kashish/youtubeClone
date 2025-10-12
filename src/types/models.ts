// src/types/models.ts
export * from "./AppTypes";

// import { PostgrestError } from "@supabase/supabase-js";
// export interface Profile {
//   id: string;
//   username: string | null;
//   full_name?: string | null;
//   avatar_url?: string | null;
//   updated_at?: string | null;
// }

// // Profile row
// export interface Profile {
//   id: string;
//   username: string | null;
//   full_name?: string | null;
//   avatar_url?: string | null;
//   updated_at?: string | null;
// }

// // Base Video row
// export interface Video {
//   id: string;
//   created_at: string | null;
//   description: string | null;
//   dislikes: number | null;
//   likes: number | null;
//   thumbnailUrl: string | null;
//   title: string | null;
//   user_id: string | null;
//   videoStatus: boolean | null;
//   videoUrl: string | null;
//   viewCount: number | null;
// }

// // Comment with profile (matches DB: uses `text`, not `content`)
// export interface CommentWithProfile {
//   id: string;
//   text: string | null;
//   created_at: string | null;
//   user_id: string | null;
//   video_id: string | null;
//   likeCount: number | null;
//   dislikeCount: number | null;
//   profiles: Profile | null;
// }

// // Video with joined profile and comments with profiles
// export interface VideoWithProfileAndCommentsWithProfiles extends Video {
//   profiles: Profile | null;
//   comment: CommentWithProfile[]; // Supabase returns [] when no comments
// }

// // Response for list
// export interface LoadVideosResponse {
//   video: VideoWithProfileAndCommentsWithProfiles[] | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }

// // Sorting keys
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

// export interface Video {
//   id: string;
//   created_at: string | null;
//   description: string | null;
//   dislikes: number | null;
//   likes: number | null;
//   thumbnailUrl: string | null;
//   title: string | null;
//   user_id: string | null;
//   videoStatus: boolean | null;
//   videoUrl: string | null;
//   viewCount: number | null;
// }

// export interface CommentWithProfile {
//   id: string;
//   text: string | null;
//   created_at: string | null;
//   user_id: string | null;
//   video_id: string | null;
//   likeCount: number | null;
//   dislikeCount: number | null;
//   profiles: Profile | null;
//   likedComments?: { id: string; user_id: string; like: boolean }[] | null;
// }

// export interface VideoWithProfile extends Video {
//   profiles: Profile | null;
// }

// export interface LoadCommentsResponse {
//   commentsWithProfile: CommentWithProfile[] | null;
//   error: PostgrestError | null;
//   loading: boolean;
// }
// // src/types/models.ts (or VideoLoadTypes.ts – keep a single source of truth)

// export interface Profile {
//   id: string;
//   username: string | null;
//   full_name?: string | null;
//   avatar_url?: string | null;
//   updated_at?: string | null;
// }

// export interface CommentWithProfile {
//   id: string;
//   text: string | null;
//   created_at: string | null;
//   user_id: string | null;
//   video_id: string | null;
//   likeCount: number | null;
//   dislikeCount: number | null;
//   profiles: Profile | null;
// }

// export interface Video {
//   id: string;
//   created_at: string | null;
//   description: string | null;
//   dislikes: number | null;
//   likes: number | null;
//   thumbnailUrl: string | null;
//   title: string | null;
//   user_id: string | null;
//   videoStatus: boolean | null;
//   videoUrl: string | null;
//   viewCount: number | null;
// }

// // For by-id fetch: include nested profile and comments
// export interface VideoWithProfileAndComments extends Video {
//   profiles: Profile | null;
//   comment: CommentWithProfile[];
// }

// export interface LoadVideoByIdResponse {
//   VideoWithProfile: VideoWithProfileAndComments | null;
//   error: import("@supabase/supabase-js").PostgrestError | null;
//   loading: boolean;
// }

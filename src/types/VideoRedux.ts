import { Database } from "../../lib/database.types";
import { typeOfList } from "./VideoLoadTypes";

// src/types/VideoRedux.ts
export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  full_name: string | null;
  updated_at?: string | null;
  email?: string | null;
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



/**
 * Video row from the `video` table.
 * Ensure your Supabase select includes all these columns.
 */
export interface Video {
  id: string;
  title: string | null;
  description: string | null;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  viewCount: number | null;
  likes: number | null;
  dislikes: number | null;
  created_at: string | null;
  user_id: string | null;
  videoStatus: boolean | null;
}

// src/types/VideoRedux.ts

export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  full_name: string | null;
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

export interface Video {
  id: string;
  title: string | null;
  description: string | null;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  viewCount: number | null;
  likes: number | null;
  dislikes: number | null;
  created_at: string | null;
  user_id: string | null;
  videoStatus: boolean | null;
}

// filename: src/types/VideoRedux.ts

export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  full_name: string | null;
}

/**
 * Video row from the `video` table.
 * Ensure your Supabase select includes all these columns.
 */
export interface Video {
  id: string;
  title: string | null;
  description: string | null;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  viewCount: number | null;
  likes: number | null;
  dislikes: number | null;
  created_at: string | null;
  user_id: string | null;
  videoStatus: boolean | null;
}


/**
 * Joined shape: a Video plus a single Profile or null.
 * We normalize Supabase responses to this in the fetch layer.
 */
import { Profile } from "./db";

export interface VideoWithProfile {
  id: string;
  created_at: string;
  title: string;
  description: string;
  likes: number;
  dislikes: number;
  viewCount: number;
  videoUrl: string;
  thumbnailUrl: string;
  videoStatus: boolean;
  user_id: string;

  // IMPORTANT: Supabase returns ARRAY
  profiles: Profile[];
}

export type VideosWithProfile = VideoWithProfile[];

export interface CacheData {
  videos: VideosWithProfile;
  timestamp: number;
}

export interface SuggestedVideoState {
  videos: Record<typeOfList, VideosWithProfile>;
  cache: Record<string, CacheData>;
  displayList: typeOfList;
  currentDisplayListIndex: number;
  currentDisplayListOffset: number;
}
// With comments included

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

export type VideoWithProfileComments = Video & {
  profiles: Profile | null;
  comment: Comment[] | null;
};

export type VideosWithProfileComments = VideoWithProfileComments[];

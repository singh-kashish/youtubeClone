// src/types/db.ts

export interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  viewCount: number;
  likes: number;
  dislikes: number;
  videoStatus: boolean;
  created_at: string;
  user_id: string;
  profiles: Profile; // ✅ OBJECT, not array
}


export interface Subscriber {
  id: string;
  user_id: string;
  subscribed_to_id: string;
  profiles?: Profile;
}

export interface LikedVideo {
  id: string;
  liked: boolean;
  video: Video;
}

// src/types/db.ts

export interface VideoRow {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  videoStatus: boolean;
  likes: number;
  dislikes: number;
  viewCount: number;
  created_at: string;
}


export type VideoInsert = Omit<
  VideoRow,
  "created_at"
>;
export interface VideoWithProfile extends VideoRow {
  profiles: Profile;
}

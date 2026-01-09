import { Profile } from "./db";

export interface VideoRow {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string;
  thumbnailUrl: string | null;
  viewCount: number;
  likes: number;
  dislikes: number;
  videoStatus: boolean;
  created_at: string;
  user_id: string;

  // 👇 Supabase reality
  profiles: Profile[];
}
